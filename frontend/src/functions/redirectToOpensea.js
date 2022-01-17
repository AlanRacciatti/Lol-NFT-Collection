const redirectToOpensea = (contractAddress, tokenId) => {
    window.location.href = `https://testnets.opensea.io/assets/${contractAddress}/${tokenId}`
}

export {redirectToOpensea}