import { SimpleStorage } from '../../../web3-parcel/types/web3-v1-contracts/SimpleStorage';
import { simpleStorageContractAddress } from '../../../constants';
import abi from '../../../abi/simpleStorage.json';
import { useWeb3React } from '@web3-react/core';
import { TransactionReceipt } from 'web3-core';
import { useEffect, useState } from 'react';
import { connector } from './web3.config';
import { AbiItem } from 'web3-utils';
import Web3 from 'web3';

function Web3ReactApp() {
  const { active, activate, chainId, account, library: provider, deactivate } = useWeb3React<Web3>();
  const [contract, setContract] = useState<SimpleStorage>();
  const [storedNumber, setStoredNumber] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [txHash, setTxHash] = useState<string>('');

  useEffect(() => {
    if (active && provider && !contract) {
      insantiateContract(provider);
    }
  }, [active, provider, contract]);

  async function insantiateContract(provider: Web3) {
    const signer = await provider.eth.getAccounts();
    const contract = new provider.eth.Contract(abi as AbiItem[], simpleStorageContractAddress, {
      from: signer[0],
    }) as unknown as SimpleStorage;
    setContract(contract);
  }

  function connect() {
    activate(connector);
  }

  function disconnect() {
    deactivate();
  }

  function storeNumber() {
    setLoading(true);
    contract?.methods
      .store(32)
      .send()
      .on('receipt', (receipt: TransactionReceipt) => {
        setLoading(false);
        setTxHash(receipt.transactionHash);
        getStoredNumber();
      });
  }

  function getStoredNumber() {
    contract?.methods
      .retrieve()
      .call()
      .then((res: any) => {
        setStoredNumber(res);
      });
  }

  return (
    <>
      <p>{active ? <button onClick={disconnect}> Disconnect</button> : <button onClick={connect}> Connect</button>}</p>
      <p>Chain ID: {chainId}</p>
      <p>Account: {account}</p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <button onClick={storeNumber}> Save number 42 </button>
        <button onClick={getStoredNumber}> Retrieve number! </button>
      </div>
      <p>Stored Number: {storedNumber}</p>
      <p>{loading ? 'Loading...' : ''}</p>
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
