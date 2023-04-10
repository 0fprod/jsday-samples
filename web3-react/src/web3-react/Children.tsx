import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { simpleStorageContractAddress } from '../../../constants';
import { SimpleStorage } from '../../../web3-parcel/types/web3-v1-contracts/SimpleStorage';
import abi from '../../../abi/simpleStorage.json';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
const connector = new InjectedConnector({ supportedChainIds: [5] });

function Web3ReactApp() {
  const { active, activate, chainId, account, library } = useWeb3React<Web3>();
  const [contract, setContract] = useState<SimpleStorage>();
  const [storedNumber, setStoredNumber] = useState<string>('');

  useEffect(() => {
    activate(connector);
  }, [activate]);

  useEffect(() => {
    if (active && library) {
      insantiateContract(library);
    }
  }, [active, library]);

  async function insantiateContract(library: Web3) {
    const signer = await library.eth.getAccounts();
    const contract = new library.eth.Contract(abi as AbiItem[], simpleStorageContractAddress, {
      from: signer[0],
    }) as unknown as SimpleStorage;
    setContract(contract);
  }

  function storeNumber() {
    contract?.methods
      .store(32)
      .send()
      .on('receipt', (receipt: any) => {
        console.log(receipt);
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
      {active && <p>Active: {active ? 'true' : 'false'}</p>}
      {chainId && <p>Chain ID: {chainId}</p>}
      {account && <p>Account: {account}</p>}
      <button onClick={storeNumber}> Save number 42 </button>
      <button onClick={getStoredNumber}> Retrieve number! </button>
      <p>Stored Number: {storedNumber}</p>
    </>
  );
}

export default Web3ReactApp;
