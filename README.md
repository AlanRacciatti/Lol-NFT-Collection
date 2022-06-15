# League of legends NFT collection

#### [Link to the project](https://chin-nft-project.web.app/)

### Welcome!
This is a project working with solidity and ethers.js to make a portal that allows user to mint an NFT. At first you'll can see two folders, the first one is the backend with the smart contract and the second one the react app, feel free to check them both :)

### Table of contents

- [The NFT](#the-nft)
- [Frontend](#frontend)
- [Backend](#backend)
- [About the project](#about-the-project)

### The NFT
I know this isn't the most visually attractive NFT but I had a good time making it hehe
#
<img src="https://cdn.discordapp.com/attachments/524431687413661699/986722073860800622/unknown.png" width="350" />

#

## Frontend

### Installation and usage

Use the package manager [npm](https://www.npmjs.com/) to install the frontend

```bash
npm install
```

Then you can just run the project

```bash
npm start
```
### Support

If you want to run your own contract in this app you need to do 2 things:

- Change the CONTRACT_ADDRESS in the app.js file:

```javascript
const App = () => {

  const CONTRACT_ADDRESS = "Here goes your contract address";

  const mintNftBtn = useRef(null);

  const [currentAccount, setCurrentAccount] = useState("");
  const [isMintingNft, setIsMintingNft] = useState(false);
  const [isMintedNft, setIsMintedNft] = useState(false);
  const [tokenId, setTokenId] = useState("")
  const [totalMinted, setTotalMinted] = useState(0);
  const [maxSupply, setMaxSupply] = useState(0);
```

- Update the JSON  in the **Utils** folder (you get this from your artifacts folder of the smart contract).

## Backend

### Installation and usage

As before use the package manager [npm](https://www.npmjs.com/) to install the frontend

```bash
npm install
```

First of all you have to make the **.env** file, as you can see in the hardhat.config.js file, there are some env variables:

```javascript
require('dotenv').config();

module.exports = {
  solidity: "0.8.0",
  networks: {
    rinkeby: {
      url: process.env.PROD_ALCHEMY_KEY,
      accounts: [process.env.PRIVATE_KEY]
    }
  },
};
```

To get the url I've used [Alchemy](https://www.alchemy.com/), it's basically an Ethereum API for interacting with the rinkeby (in this case) network. Then you can access to your private key in whatever wallet you're using, I use [Metamask](https://metamask.io/). Remember **NEVER** sharing your private key because you can get hacked. 

Your .env file should like this: 

```
PROD_ALCHEMY_KEY='Your alchemy key'
PRIVATE_KEY='Your private key'
```

Once you have done all this stuff you can start your project. In the **Scripts** folder you will see two files: run.js and deploy.js, with the first one I make the tests and with the deploy file I (you won't believe it) deploy it.

#### Run.js

```bash
npx hardhat run scripts/run.js
```

###### Expected output:

```
This is my NFT contract. Woah!
```
#### Deploy.js
Remember that you should change rinkeby for the network you're using **(e.g. goerli)**
```bash
npx hardhat run scripts/deploy.js --network rinkeby
```

###### Expected output:

```
This is my NFT contract. Woah!
Contract deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
```

### Support

You might want change some stuff of the smart contract, these are the main things:

#### Max supply

It is setted at 50 but you can change it to whatever you want in the MyEpicNFT.sol contract

```
uint256 constant MAX_SUPPLY = 50;
```

#### Random word

I've used League of Legends champions, however, you can change to whatever you want

```
  string[] firstWords = ["Lee sin", "Thresh", "Vayne", "Kayn", "Vi", "Blitzcrank"];
  string[] secondWords = ["Bardo", "Fiora", "Zac", "Yasuo", "Elise", "Nidalee"];
  string[] thirdWords = ["Fizz", "Nidalee", "Warwick", "Shen", "Kindred", "Taric"];
```

## About the project

### Project status
Right now I'm not actively working on this project, however, I might change some things anytime

### Contributing

Are you interested in adding new features to the client? Your ideas are always welcome, for any change you want to do just make a pull request or for major changes try making an issue, help is my best friend :)

### Authors and acknowledgement

This project couldn't have been possible without [Buildspace](https://buildspace.so/), in this site you can make some stuff in web3 guided by [Farza](https://twitter.com/farzatv?lang=ar-x-fm). What I've enjoyed the most about this projects is that they let you explore a lot about web3 and make your own things, not just **copy-paste** their code.

### License
[MIT](https://choosealicense.com/licenses/mit/)
