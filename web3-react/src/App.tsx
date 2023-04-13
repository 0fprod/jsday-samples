import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Web3ReactApp from './web3-react/Web3ReactApp';
import Web3Moralis from './web3-moralis/Web3Moralis';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <>
        <nav className="navigation">
          <ul>
            <li>
              <Link to="/">Web3 React</Link>
            </li>
            <li>
              <Link to="/moralis">Web3 Moralis</Link>
            </li>
          </ul>
        </nav>
        <hr />
        <Routes>
          <Route path="/" element={<Web3ReactApp />} />
          <Route path="/moralis" element={<Web3Moralis />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
