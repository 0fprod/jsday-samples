console.log('####################');
console.log('vanilla-with-contract.ts');
console.log('####################');
import { infuraGoerliUrl, simpleStorageContractAddress } from '../../constants';

function retrieveStoredNumber(transaction) {
  fetch(infuraGoerliUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: 'eth_call',
      params: [transaction, 'latest'],
      id: 1,
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
}

// 🤔
const tx = {
  to: simpleStorageContractAddress,
  data: '0x2e64cec1a5de1977f20d76662d93c30a14fb1bd1434893ae548f07fa344eee7d',
};

retrieveStoredNumber(tx);
