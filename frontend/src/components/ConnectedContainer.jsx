const ConnectedContainer = (props) => (
    <div>
      <button onClick={props.function} ref={props.reference} className="cta-button connect-wallet-button">
        Mint NFT
      </button>
      <a href='https://testnets.opensea.io/collection/lolnft-hxyvhrmy5h' target='_blank' rel='noreferrer'><button className="cta-button connect-wallet-button mint-button">
        Explore collection
      </button></a>
    </div>
);

export default ConnectedContainer