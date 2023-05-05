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
  const [randomNumber] = useState<number>(Math.floor(Math.random() * 100));

  useEffect(() => {
    if (active && provider && account && !contract) {
      insantiateContract(provider, account);
    }
  }, [active, provider, account, contract]);

  async function insantiateContract(provider: Web3, signer: string) {
    const contract = new provider.eth.Contract(abi as AbiItem[], simpleStorageContractAddress, {
      from: signer,
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
      .store(randomNumber)
      .send()
      .on('receipt', (receipt: TransactionReceipt) => {
        setTxHash(receipt.transactionHash);
      })
      .finally(() => {
        setLoading(false);
        retrieveNumber();
      });
  }

  function retrieveNumber() {
    if (contract) {
      setLoading(true);
      contract.methods
        .retrieve()
        .call()
        .then((res: any) => {
          setStoredNumber(res);
          setLoading(false);
        });
    }
  }

  return (
    <>
      <p>{active ? <button onClick={disconnect}> Disconnect</button> : <button onClick={connect}> Connect</button>}</p>
      <p>Chain ID: {chainId}</p>
      <p>Account: {account}</p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <button onClick={storeNumber} disabled={!active}>
          Save number {randomNumber}{' '}
        </button>
        <button onClick={retrieveNumber} disabled={!active}>
          Retrieve number!{' '}
        </button>
      </div>
      <div>
        {loading ? 'Loading...' : <>{storedNumber && <p>Stored Number: {storedNumber}</p>}</>}
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
