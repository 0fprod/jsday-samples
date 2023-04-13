import { simpleStorageContractAddress } from '../../../constants';
import abi from '../../../abi/simpleStorage.json';
import { useState } from 'react';
import { useMoralis, useWeb3Contract } from 'react-moralis';
import { BigNumber, Transaction } from 'ethers';

function Web3ReactApp() {
  const { chainId, enableWeb3, isWeb3Enabled, account, deactivateWeb3 } = useMoralis();
  const [storedNumber, setStoredNumber] = useState<string>('');
  const [txHash, setTxHash] = useState<string>('');
  const { runContractFunction: retrieve } = useWeb3Contract({
    abi,
    contractAddress: simpleStorageContractAddress,
    functionName: 'retrieve',
  });
  const { runContractFunction: store, isLoading } = useWeb3Contract({
    abi,
    contractAddress: simpleStorageContractAddress,
    functionName: 'store',
    params: { _favouriteNumber: 50 },
  });

  function connect() {
    enableWeb3();
  }

  function disconnect() {
    deactivateWeb3();
  }

  function storeNumber() {
    store({
      // params: { params: { _favouriteNumber: 42 } },
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
        <button onClick={storeNumber}> Save number 42 </button>
        <button onClick={getStoredNumber}> Retrieve number! </button>
      </div>
      <p>Stored Number: {storedNumber}</p>
      <p>{isLoading ? 'Loading...' : ''}</p>
      <p>
        {txHash ? (
          <a href={`https://goerli.etherscan.io/tx/${txHash}`} target="_blank">
            TxHash
          </a>
        ) : (
          ''
        )}
      </p>
    </>
  );
}

export default Web3ReactApp;
