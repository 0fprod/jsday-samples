console.log('####################');
console.log('ethers-with-contract.ts');
console.log('####################');
import { ethers, Contract } from 'ethers';
import { goerliId, simpleStorageContractAddress } from '../../constants';
import simpleStorageAbi from '../../abi/SimpleStorage.json';
import { SimpleStorage } from '../types/ethers-contracts';

const provider = new ethers.providers.Web3Provider(window.ethereum, goerliId);

// connect();
// retrieveNumber();
// storeNumber(15);

async function connect() {
  const connectedAccount = await provider.send('eth_requestAccounts', []);
  console.log('🚀 ~ connect:', connectedAccount);
}

async function retrieveNumber() {
  const contract = new Contract(simpleStorageContractAddress, simpleStorageAbi, provider) as SimpleStorage;
  const number = await contract.retrieve();
  console.log('The stored number is: ', number.toString());
}

async function storeNumber(number: number) {
  const signer = provider.getSigner();
  const contract = new Contract(simpleStorageContractAddress, simpleStorageAbi, signer) as SimpleStorage;
  const txReceipt = await contract.store(number);
  console.log('TxReceipt', txReceipt);
}
