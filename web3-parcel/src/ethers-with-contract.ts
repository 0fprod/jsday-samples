console.log('####################');
console.log('ethers-with-contract.ts');
console.log('####################');
import { ethers } from 'ethers';
import { goerliId, simpleStorageContractAddress } from './constants';
import simpleStorageAbi from '../abi/SimpleStorage.json';
import { SimpleStorage } from '../types/ethers-contracts';

const provider = new ethers.providers.Web3Provider(window.ethereum, goerliId);

// storeNumber(42);
// retrieveNumber();
// connect();

async function storeNumber(number: number) {
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(simpleStorageContractAddress, simpleStorageAbi, signer);
  const txReceipt = await contract.store(number);
  console.log(txReceipt);
}

async function retrieveNumber() {
  const signer = await provider.getSigner();
  console.log('🚀 ~ signerAddress:', await signer.getAddress());
  const contract = new ethers.Contract(simpleStorageContractAddress, simpleStorageAbi, signer) as SimpleStorage;
  const number = await contract.retrieve();
  console.log('The stored number is: ', number.toString());
}

async function connect() {
  const connectedAccount = await provider.send('eth_requestAccounts', []);
  console.log('🚀 ~ connect:', connectedAccount);
}
