import { Web3ReactProvider } from '@web3-react/core';
import Children from './Children';
import Web3 from 'web3';
const getLibrary = () => {
  return new Web3(window.ethereum);
};

function Web3ReactApp() {
  return (
    <div className="App">
      <Web3ReactProvider getLibrary={getLibrary}>
        <h1>Using @web3-react/core</h1>
        <Children />
      </Web3ReactProvider>
    </div>
  );
}

export default Web3ReactApp;
