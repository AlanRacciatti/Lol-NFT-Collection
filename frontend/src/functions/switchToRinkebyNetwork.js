const switchToRinkebyNetwork = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get Metamask!");
      } else {
        ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: '0x4' }]
        });
      };

    } catch (error) {
      console.error(error);
    };

}

export default switchToRinkebyNetwork;