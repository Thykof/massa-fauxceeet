// The entry file of your WebAssembly module.
import {
  Address,
  balance,
  Context,
  getKeys,
  setBytecode as _setBytecode,
  Storage,
  transferCoins,
  generateEvent,
  createEvent,
} from '@massalabs/massa-as-sdk';
import { Args, bytesToString, u8toByte } from '@massalabs/as-types';
import {
  onlyOwner,
  ownerAddress,
  setOwner,
} from '@massalabs/sc-standards/assembly/contracts/utils/ownership';

const historyKey = u8toByte(0);

/**
 * This function is meant to be called only one time: when the contract is deployed.
 *
 * @param binaryArgs - Arguments serialized with Args
 */
export function constructor(_: StaticArray<u8>): StaticArray<u8> {
  // This line is important. It ensures that this function can't be called in the future.
  // If you remove this check, someone could call your constructor function and reset your smart contract.
  if (!Context.isDeployingContract()) {
    return [];
  }
  setOwner(new Args().add(Context.caller()).serialize());
  return [];
}

export function fauxceeet(_: StaticArray<u8>): void {
  const caller = Context.caller().toString();
  if (!Storage.has(historyKey)) {
    Storage.set(historyKey, new Args().add([caller]).serialize());
  } else {
    const list = new Args(Storage.get(historyKey))
      .nextStringArray()
      .expect('list is invalid');
    assert(!list.includes(caller), 'You already called this function');
    list.push(caller);
    Storage.set(historyKey, new Args().add(list).serialize());
  }

  transferCoins(new Address(caller), 500_000);
}

export function deposit(): void {
  const amount = Context.transferredCoins();
  generateEvent(createEvent('DepositEvent', [amount.toString()]));
}

// Admin

export function resetHistory(_: StaticArray<u8>): void {
  onlyOwner();
  Storage.del(historyKey);
}

export function resetStorage(): void {
  onlyOwner();
  const keys = getKeys();
  for (let i = 0; i < keys.length; i++) {
    Storage.del(keys[i]);
  }
}

export function selfDestruct(_: StaticArray<u8>): void {
  onlyOwner();
  // 1- empty the SC
  let emptySc = new StaticArray<u8>(0);
  _setBytecode(emptySc);

  // 2- delete everything in Storage
  resetStorage();

  // 3- transfer back coins if any
  let scBalance = balance();
  // Balance will most likely be > 0 as we deleted some keys from the Storage
  // but if there is nothing in the Storage, no need to call transferCoins
  if (scBalance > 0) {
    // don't take from owner because we just reset the storage
    transferCoins(Context.caller(), scBalance);
  }
}

export function setBytecode(bytecode: StaticArray<u8>): void {
  onlyOwner();
  _setBytecode(bytecode);
}
