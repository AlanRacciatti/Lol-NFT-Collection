import './styles/App.css';
import React, { useEffect, useState, useRef } from "react";
import { ethers } from 'ethers';
import myEpicNft from './utils/MyEpicNFT.json'

import switchToRinkebyNetwork from './functions/switchToRinkebyNetwork';
import {redirectToOpensea} from './functions/redirectToOpensea';
import {alertMetamask, alertCantMint} from './functions/swals';

import NotConnectedContainer from './components/NotConnectedContainer';
import MintingContainer from './components/MintingContainer';
import MintedContainer from './components/MintedContainer';
import ConnectedContainer from './components/ConnectedContainer';
import WarningContainer from './components/WarningContainer';
import FooterContainer from './components/FooterContainer';
import Header from './components/Header';

const App = () => {

  const CONTRACT_ADDRESS = "0x90a850917D186f6ccCeBa8fdE29Ce1E32AD28aB0";

  const mintNftBtn = useRef(null);

  const [currentAccount, setCurrentAccount] = useState("");
  const [isMintingNft, setIsMintingNft] = useState(false);
  const [isMintedNft, setIsMintedNft] = useState(false);
  const [tokenId, setTokenId] = useState("")
  const [totalMinted, setTotalMinted] = useState(0);
  const [maxSupply, setMaxSupply] = useState(0);

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;
      const accounts = await ethereum.request({ method: "eth_accounts" });
      
      if (accounts.length !== 0) {
        setCurrentAccount(accounts[0]);
        switchToRinkebyNetwork();
        setupEventListener();
      }

    } catch (error) {
      console.error(error);
    };

  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      
      if (!ethereum) {
        alertMetamask();
        return;
      };

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      setCurrentAccount(accounts[0]);
      setupEventListener();
    } catch (error) {
      console.error(error);
    };
  };

  const setupEventListener = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, myEpicNft.abi, signer);

        connectedContract.on("NewEpicNFTMinted", (from, tokenId) => {
          setTokenId(tokenId);
          updateTotalMinted();
        });
      }
    } catch (error) {
      console.error(error);
    };
  };
  
  const askContractToMintNft = async () => {
    if (!isMintedNft) {
      try {
        const { ethereum } = window;
        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, myEpicNft.abi, signer);

          const accounts = await ethereum.request({ method: "eth_requestAccounts" });
  
          let cantMint = await connectedContract.contains(accounts[0]);
          if (cantMint) {
            alertCantMint();
            return
          }
          let nftTxn = await connectedContract.makeAnEpicNFT();

          setIsMintingNft(true);
          mintNftBtn.current.innerText = "Mining...";
          mintNftBtn.current.disabled = true; 
          mintNftBtn.current.className += " disabled-button";
          
          await nftTxn.wait();

          mintNftBtn.current.disabled = false;
          mintNftBtn.current.className = "cta-button connect-wallet-button";
          mintNftBtn.current.innerText = "View NFT";

          setIsMintedNft(true);
          setIsMintingNft(false);
  
        } 
  
      } catch (error) {
        console.error(error)
      };
    } else {
      redirectToOpensea(CONTRACT_ADDRESS, tokenId);
    };
    
  };

  const renderNftLeft = () => (
    <p className="nft-counter">{totalMinted}/{maxSupply} NFT minted</p>
  )

  const updateTotalMinted = async () => {
    try {
      const { ethereum } = window;
      
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, myEpicNft.abi, signer);

        let totalMinted = await connectedContract.getTotalMinted();
        setTotalMinted(totalMinted.toNumber());

      }

    } catch (error) {
      console.error(error)
    };
  }

  const updateMaxSupply = async () => {
    try {
      const { ethereum } = window;
      
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, myEpicNft.abi, signer);

        let maxSupply = await connectedContract.getMaxSupply();
        setMaxSupply(maxSupply.toNumber());

      } 
    } catch (error) {
      console.error(error)
    };
  }
  
  useEffect(() => {
    checkIfWalletIsConnected();
    updateTotalMinted();
    updateMaxSupply();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <Header />
          {!currentAccount && <NotConnectedContainer function={connectWallet} />}
          {isMintingNft && <MintingContainer />}
          {isMintedNft && <MintedContainer />}
          {currentAccount && <ConnectedContainer function={askContractToMintNft} reference={mintNftBtn} />}
          {renderNftLeft()}
          {isMintedNft && <WarningContainer />}
        </div>
        <FooterContainer />
      </div>
    </div>
  );
};

export default App;
