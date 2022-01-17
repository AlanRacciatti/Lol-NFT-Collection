
import twitterLogo from '../assets/twitter-logo.svg'
import etherLogo from '../assets/ethereum.svg'
const TWITTER_HANDLE = 'alan_racciatti1';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const FooterContainer = () => {
    return (
        <div className="footer-container">
          <div className='twitter-container'>
            <img alt="ETH Logo" className="eth-logo" src={etherLogo} />
            <a className="footer-text fake-eth" href='https://faucets.chain.link/rinkeby' target="_blank" rel="noreferrer">Need some fake ETH?</a>
          </div>
          <div className='twitter-container'>
            <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
            <a className="footer-text" href={TWITTER_LINK} target="_blank" rel="noreferrer">{`Built by @${TWITTER_HANDLE}`}</a>
          </div>
        </div>
    )
}

export default FooterContainer;