import { readFileSync } from 'fs';
import path from 'path';
import { fromMAS } from '@massalabs/massa-web3';
import { getClient, waitOp } from './lib';
import { config } from 'dotenv';
config();

const fee = fromMAS('0');
const coins = fromMAS('0');
const contractAddress = 'AS12paJ7LXfyttRvsy1EVHEVHvBRg42zf2KYZgFvZNUR19gKmc8Bx';
const { client } = await getClient(process.env.WALLET_SECRET_KEY!);

const contractDataBinary = readFileSync(path.join('build', '/main.wasm'));
let opId: string;

opId = await client.smartContracts().callSmartContract({
  fee,
  coins,
  targetAddress: contractAddress,
  targetFunction: 'setBytecode',
  parameter: Array.from(contractDataBinary),
});
console.log(opId);
await waitOp(client, opId, false);
