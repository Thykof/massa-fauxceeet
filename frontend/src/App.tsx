import { MAINNET_CHAIN_ID } from '@massalabs/massa-web3';
import './App.css';
import { useWriteSmartContract } from './lib/ConnectMassaWallets/hooks/write-sc';
import { useAccountStore } from './lib/ConnectMassaWallets/store';
import { ConnectMassaWallet } from './lib/ConnectMassaWallets/components/ConnectMassaWallet';
import { Toast } from '@massalabs/react-ui-kit';

const mainnetAddress = 'AS12UfF7hTKrkzUy9JmeVt92wWLny7i9qQrwenyASKu2GaEaHc97f';
const buildnetAddress = 'AS12a8ZcPQKZT8c5v9a9cJjzkPzwh6ZsDswhsQcNNwiMZ7YowxYFi';

function App() {
  const { massaClient, chainId } = useAccountStore();
  const isMainnet = chainId === MAINNET_CHAIN_ID;

  const { callSmartContract } = useWriteSmartContract(massaClient, isMainnet);

  const targetAddress = isMainnet ? mainnetAddress : buildnetAddress;

  const handleFauxceeet = () => {
    callSmartContract('fauxceeet', targetAddress, [], {
      pending: 'Fauxceeet is pending...',
      success: 'Fauxceeet is successful!',
      error: 'Fauxceeet failed!',
    });
  };

  return (
    <div className="w-full bg-black text-white">
      <div className="p-10  md:max-w-4xl m-auto">
        <div className="flex justify-center items-center mb-4">
          <img src="massa-fauxceeet.png" alt="fauxceeet logo" />
        </div>
        <div className="text-center">
          <h1 className="mas-title mb-2">Fauxceeet</h1>
          <h2 className="mas-body">
            <i>Massa mainnet faucet </i>🤣
          </h2>
        </div>
        <div className="theme-light p-10">
          <ConnectMassaWallet />
        </div>
        <div className="text-center">
          <p>👇 Click on the image bellow to use fauxceeet👇</p>
        </div>
        <div className="flex justify-center items-center cursor-pointer mb-24">
          <img
            onClick={handleFauxceeet}
            src="https://media.giphy.com/media/QX83GCT8BXrjAQIwFJ/giphy.gif?cid=790b761179ibljzfykv24p1w29gd00e269nbsto5qnz6193q&ep=v1_stickers_search&rid=giphy.gif&ct=s"
            alt="faucet"
          />
        </div>
        <div>
          Github:{' '}
          <a href="https://github.com/Thykof/massa-fauxceeet">
            https://github.com/Thykof/massa-fauxceeet
          </a>
          <br />
          Join Dusa:{' '}
          <a href="https://app.dusa.io/trade?ref=qmf57z">
            https://app.dusa.io/trade?ref=qmf57z
          </a>
          <br />
          Delegated stacking:{' '}
          <a href="https://massa-blast.net">https://massa-blast.net/</a>
        </div>
      </div>
      <div className="theme-dark">
        <Toast />
      </div>
    </div>
  );
}

export default App;
