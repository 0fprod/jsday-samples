console.log('####################');
console.log('vanilla-primitive.ts');
console.log('####################');
import { infuraGoerliUrl, randomGoerliWallet } from '../../constants';

function requestBalanceFor(walletAddress: string) {
  fetch(infuraGoerliUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: 'eth_getBalance',
      params: [walletAddress, 'latest'],
      id: 1,
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
}

requestBalanceFor(randomGoerliWallet);
