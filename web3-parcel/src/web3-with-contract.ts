console.log('####################');
console.log('web3-with-contract.ts');
console.log('####################');
import Web3 from 'web3';
import { simpleStorageContractAddress } from '../../constants';
import simpleStorageAbi from '../../abi/SimpleStorage.json';
import { SimpleStorage } from '../types/web3-v1-contracts/SimpleStorage';
import { AbiItem } from 'web3-utils';

const web3 = new Web3(window.ethereum);

// connect();
// retrieveNumber();
// storeNumber(55);

async function connect() {
  const connectedAccount = await web3.eth.requestAccounts();
  console.log('🚀 ~ connectedAccount:', connectedAccount);
}

async function retrieveNumber() {
  const { Contract } = web3.eth;

  const contract = new Contract(simpleStorageAbi as AbiItem[], simpleStorageContractAddress) as any as SimpleStorage;
  const storedNumber = await contract.methods.retrieve().call();
  console.log('The stored number is: ', storedNumber);
}

async function storeNumber(number: number) {
  const { Contract, getAccounts } = web3.eth;

  const contract = new Contract(simpleStorageAbi as AbiItem[], simpleStorageContractAddress) as any as SimpleStorage;
  const signer = await getAccounts();

  contract.methods
    .store(number)
    .send({ from: signer[0] })
    .on('sending', (payload) => console.log('sending', payload))
    .on('sent', (payload) => console.log('sent', payload))
    .on('transactionHash', (payload) => console.log('transactionHash', payload))
    .on('receipt', (payload) => console.log('receipt', payload))
    .on('confirmation', (payload) => console.log('confirmation', payload))
    .on('error', (error) => console.log('error', error))
    .then((receipt) => console.log('receipt', receipt));
}
