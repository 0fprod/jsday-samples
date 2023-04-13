import { Web3ReactProvider } from '@web3-react/core';
import Children from './Children';
import { getLibrary } from './web3.config';

function Web3ReactApp() {
  return (
    <div className="App">
      <Web3ReactProvider getLibrary={getLibrary}>
        <h1>
          Using <code>@web3-react/core</code>
        </h1>
        <Children />
      </Web3ReactProvider>
    </div>
  );
}

export default Web3ReactApp;
