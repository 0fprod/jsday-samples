console.log('####################');
console.log('web3-with-contract.ts');
console.log('####################');
import Web3 from 'web3';
import { simpleStorageContractAddress } from '../../constants';
import { AbiItem } from 'web3-utils';
import { SimpleStorage } from '../types/web3-v1-contracts/SimpleStorage';
import simpleStorageAbi from '../../abi/SimpleStorage.json';

// const web3 = new Web3(Web3.givenProvider);
const web3 = new Web3(window.ethereum);

// storeNumber(55);
// retrieveNumber();
connect();

async function storeNumber(number: number) {
  const contract = new web3.eth.Contract(simpleStorageAbi as AbiItem[], simpleStorageContractAddress);
  const signer = await web3.eth.getAccounts();
  const txReceipt = await contract.methods.store(number).send({ from: signer[0] });
  console.log('🚀 ~ txReceipt:', txReceipt);
}

async function retrieveNumber() {
  const contract = new web3.eth.Contract(
    simpleStorageAbi as AbiItem[],
    simpleStorageContractAddress
  ) as any as SimpleStorage;

  const storedNumber = await contract.methods.retrieve().call();
  console.log('The stored number is: ', storedNumber);
}

async function connect() {
  const connectedAccount = await web3.eth.requestAccounts();
  console.log('🚀 ~ connectedAccount:', connectedAccount);
}
