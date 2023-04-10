console.log('####################');
console.log('ethers-primitive.ts');
console.log('####################');
import { ethers } from 'ethers';
import { randomGoerliWallet, goerliId } from '../../constants';

const provider = new ethers.providers.InfuraProvider(goerliId);

provider.getBalance(randomGoerliWallet).then(handleBalance);

function handleBalance(balance: ethers.BigNumberish) {
  console.log('Balance: ', ethers.utils.formatEther(balance));
}
