import { useState } from 'react';
import './App.css';
import Web3ReactApp from './web3-react/Web3ReactApp';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Web3ReactApp />
    </div>
  );
}

export default App;
