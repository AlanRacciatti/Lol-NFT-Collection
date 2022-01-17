import React from "react";

const NotConnectedContainer = (props) => (
    <button onClick={props.function} className="cta-button connect-wallet-button">
        Connect to Wallet
    </button>
);

export default NotConnectedContainer;