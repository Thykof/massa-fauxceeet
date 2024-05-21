import { Args, fromMAS } from '@massalabs/massa-web3';
import { getClient, waitOp } from './lib';
import { config } from 'dotenv';
config();

const fee = fromMAS('0');
const contractAddress = '';

const { client } = await getClient(process.env.WALLET_SECRET_KEY!);

const opId = await client.smartContracts().callSmartContract({
  fee,
  targetAddress: contractAddress,
  parameter: new Args(),
  targetFunction: 'selfDestruct',
});
console.log(opId);
await waitOp(client, opId, false);
