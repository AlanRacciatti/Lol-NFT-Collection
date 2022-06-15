// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

import { Base64 } from "./libraries/Base64.sol";

contract MyEpicNFT is ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  Counters.Counter public totalMinted;

  uint256 constant MAX_SUPPLY = 50;

  string baseSvg = "<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMin meet' viewBox='0 0 350 350'><rect width='100%' height='100%'/>";

  string[] firstWords = ["Lee sin", "Thresh", "Vayne", "Kayn", "Vi", "Blitzcrank"];
  string[] secondWords = ["Bardo", "Fiora", "Zac", "Yasuo", "Elise", "Nidalee"];
  string[] thirdWords = ["Fizz", "Nidalee", "Warwick", "Shen", "Kindred", "Taric"];
  string[] yChampWordLocation = ["25", "50", "75"];

  mapping (address => bool) public Wallets;

  function setWallet(address _wallet) public {
    Wallets[_wallet] = true;
  }

  function contains(address _wallet) public view returns (bool) {
    return Wallets[_wallet];
  }

  event NewEpicNFTMinted(address sender, uint256 tokenId);

  constructor() ERC721 ("LolNFT", "LOL") {
    console.log("This is my NFT contract. Woah!");
  }

  function pickRandomFirstWord(uint256 tokenId) public view returns (string memory) {
    uint256 rand = random(string(abi.encodePacked("FIRST_WORD", Strings.toString(tokenId))));
    rand = rand % firstWords.length;
    return firstWords[rand];
  }

  function pickRandomSecondWord(uint256 tokenId) public view returns (string memory) {
    uint256 rand = random(string(abi.encodePacked("SECOND_WORD", Strings.toString(tokenId))));
    rand = rand % secondWords.length;
    return secondWords[rand];
  }

  function pickRandomThirdWord(uint256 tokenId) public view returns (string memory) {
    uint256 rand = random(string(abi.encodePacked("THIRD_WORD", Strings.toString(tokenId))));
    rand = rand % thirdWords.length;
    return thirdWords[rand];
  }

  function random(string memory input) internal pure returns (uint256) {
    return uint256(keccak256(abi.encodePacked(input)));
  }

  function getTotalMinted() public view returns (uint256) {
    return totalMinted.current();
  }

  function getMaxSupply() public pure returns (uint256) {
    return MAX_SUPPLY;
  }

  function champToSvg(string[3] memory champs) public view returns (string memory) {

    string memory champsSvg = "";

    for (uint256 i = 0; i < champs.length; i++) {
      champsSvg = string(abi.encodePacked(champsSvg, "<text x='50%' y='",yChampWordLocation[i],"%' dominant-baseline='middle' text-anchor='middle' style='fill:#fff;font-family:monospace;font-size:24px'>",champs[i],"</text>"));
    }

    return champsSvg;

  }

  function makeAnEpicNFT() public {
    require(totalMinted.current() < MAX_SUPPLY, "The whole NFT collection has been minted!");
    require(!contains(msg.sender), "You can't make more than an NFT!");

    _tokenIds.increment();
    uint256 newItemId = _tokenIds.current();

    string memory nftNumber = Strings.toString(_tokenIds.current());
    setWallet(msg.sender);

    string memory first = pickRandomFirstWord(newItemId);
    string memory second = pickRandomSecondWord(newItemId);
    string memory third = pickRandomThirdWord(newItemId);

    string memory nftName = string(abi.encodePacked(first, " ", second, " ", third));
    string memory combinedWord = champToSvg([first, second, third]);
    string memory svgNumber = string(abi.encodePacked("<text x='10%' y='10%' dominant-baseline='middle' text-anchor='middle' style='fill:#fff;font-family:monospace;font-size:24px'>#", nftNumber,"</text>"));
    

    string memory finalSvg = string(abi.encodePacked(baseSvg, svgNumber, combinedWord, "</svg>"));
    string memory encodedFinalSvg = Base64.encode(bytes(finalSvg));

    string memory json = Base64.encode(
      bytes(
        string(
          abi.encodePacked(
            '{"name": "',nftName,'", "description": "Three funny lol champs.", "image": "data:image/svg+xml;base64,', encodedFinalSvg,'"}'
          )
        )
      )
    );

    string memory finalTokenUri = string(
      abi.encodePacked("data:application/json;base64,", json)
    );

    console.log("\n--------------------");
    console.log(finalSvg);
    console.log("--------------------\n");

    _safeMint(msg.sender, newItemId);

    _setTokenURI(newItemId, finalTokenUri);
  
    totalMinted.increment();
    console.log("An NFT w/ ID %s has been minted to %s", newItemId, msg.sender);
    emit NewEpicNFTMinted(msg.sender, newItemId);
  }
}