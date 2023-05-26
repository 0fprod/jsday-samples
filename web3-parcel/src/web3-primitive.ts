console.log('####################');
console.log('web3-primitive.ts');
console.log('####################');
import Web3 from 'web3';
import { randomGoerliWallet, infuraGoerliUrl } from '../../constants';

const provider = new Web3.providers.HttpProvider(infuraGoerliUrl);
const web3 = new Web3(provider);

web3.eth.getBalance(randomGoerliWallet, getBalanceHandler);

function getBalanceHandler(err: Error, balance: string) {
  if (err) return;
  console.log('Balance: ', web3.utils.fromWei(balance, 'ether'));
}
