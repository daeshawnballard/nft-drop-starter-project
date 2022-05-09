import { set } from '@project-serum/anchor/dist/cjs/utils/features';
import React, { useEffect, useState } from 'react';
import './App.css';
import twitterLogo from './assets/twitter-logo.svg';
import CandyMachine from './CandyMachine';

// Constants
const TWITTER_HANDLE = 'daeshawnballard';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  // State
const [walletAddress, setWalletAddress] = useState(null);

  // Actions
const checkIfWalletIsConnected = async () => {
  try {
    const { solana } = window;

    
    if (solana) { 
      if (solana.isPhantom) { 
        console.log('Phantom wallet found!');
        //the solana object gives us a function that will allow us to connect directly with the users wallet!
        const response = await solana.connect({ onlyIfTrusted: true });
        console.log( 
          'Connected with Public Key:',
          response.publicKey.toString()
       );

       //set users publicKey in state to be used later on
          setWalletAddress(response.publicKey.toString());
        }
      } else { 
      alert('Solana object not found! Get a Phantom wallet 👻');
    }
  } catch (error) { 
    console.error(error);
  }
};

//When our componenet first mounts, let's check to see if we have a connected phantom wallet
const connectWallet = async () => {
  const { solana } = window;

  if (solana) { 
    const response = await solana.connect();
    console.log('Connected with Public Key:', response.publicKey.toString());
    setWalletAddress(response.publicKey.toString());
  }
};

//render the ui when the user hasn't connected their wallet to our app yet
const renderNotConnectedContainer = () => (
<button 
  className="cta-button connect-wallet-button"
  onClick={connectWallet}
>
  Connect to Wallet
</button>
);

useEffect(() => {
  const onLoad = async () => {
    await checkIfWalletIsConnected();
  };
  window.addEventListener('load', onLoad);
  return () => window.removeEventListener('load', onLoad);
}, []);


  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">📄 Daeshawn.sol NFT Resume</p>
          <p className="sub-text">NFT drop machine with fair mint</p>
          {/* add the condition to show this only if we don't have a wallet address*/}
          {!walletAddress && renderNotConnectedContainer()}
        </div>
        {/* Check for walletAddress and then pass in walletAddress */}
        {walletAddress && <CandyMachine walletAddress={window.solana} />}
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built by @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
