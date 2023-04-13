import { simpleStorageContractAddress } from '../../../constants';
import abi from '../../../abi/simpleStorage.json';
import { useState } from 'react';
import { useMoralis, useWeb3Contract } from 'react-moralis';
import { BigNumber, Transaction } from 'ethers';

function Web3ReactApp() {
  const { chainId, enableWeb3, isWeb3Enabled, account, deactivateWeb3 } = useMoralis();
  const [storedNumber, setStoredNumber] = useState<string>('');
  const [txHash, setTxHash] = useState<string>('');
  const [randomNumber] = useState<number>(Math.floor(Math.random() * 100));

  const { runContractFunction: retrieve } = useWeb3Contract({
    abi,
    contractAddress: simpleStorageContractAddress,
    functionName: 'retrieve',
  });
  const { runContractFunction: store, isLoading } = useWeb3Contract({
    abi,
    contractAddress: simpleStorageContractAddress,
    functionName: 'store',
    params: { _favouriteNumber: randomNumber },
  });

  function connect() {
    enableWeb3();
  }

  function disconnect() {
    deactivateWeb3();
  }

  function storeNumber() {
    store({
      // params: { params: { _favouriteNumber: randomNumber } },
      onSuccess: (res: any) => {
        setTxHash((res as Transaction).hash ?? '');
      },
      onError(error) {
        console.log(error);
      },
    });
  }

  function getStoredNumber() {
    retrieve({
      onSuccess: (res: any) => {
        setStoredNumber((res as BigNumber).toString());
      },
    });
  }

  return (
    <>
      <p>
        {isWeb3Enabled ? (
          <button onClick={disconnect}> Disconnect</button>
        ) : (
          <button onClick={connect}> Connect</button>
        )}
      </p>
      <p>Chain ID: {chainId}</p>
      <p>Account: {account}</p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <button onClick={storeNumber} disabled={!isWeb3Enabled}>
          {' '}
          Save number {randomNumber}{' '}
        </button>
        <button onClick={getStoredNumber} disabled={!isWeb3Enabled}>
          {' '}
          Retrieve number!{' '}
        </button>
      </div>
      <div>
        {isLoading ? 'Loading...' : <>{storedNumber && <p>Stored Number: {storedNumber}</p>}</>}
        {txHash && (
          <p>
            TxHash:{' '}
            <a href={`https://goerli.etherscan.io/tx/${txHash}`} target="_blank">
              {txHash}
            </a>
          </p>
        )}
      </div>
    </>
  );
}

export default Web3ReactApp;
