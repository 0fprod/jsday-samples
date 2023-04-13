import { MoralisProvider } from 'react-moralis';
import Children from './Children';

function Web3Moralis() {
  return (
    <div className="App">
      <MoralisProvider initializeOnMount={false}>
        <h1>
          Using <code>react-moralis</code>
        </h1>
        <Children />
      </MoralisProvider>
    </div>
  );
}

export default Web3Moralis;
