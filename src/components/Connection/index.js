import React, { useEffect, useState } from 'react';
import MetaMaskOnboarding from '@metamask/onboarding';
import './index.css'; // Ensure this file contains styles for the loader, up arrow, and confetti
import Toss from "../Toss"

const MetaMaskComponent = () => {
    const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
    const [connected, setConnected] = useState(false);
    const [account, setAccount] = useState('');
    const onboarding = new MetaMaskOnboarding();

    useEffect(() => {
        const checkMetaMask = async () => {
            const { ethereum } = window;
            if (ethereum && ethereum.isMetaMask) {
                setIsMetaMaskInstalled(true);
                const accounts = await ethereum.request({ method: 'eth_accounts' });
                if (accounts.length > 0) {
                    setAccount(accounts[0]);
                    setConnected(true);
                }
            } else {
                setIsMetaMaskInstalled(false);
            }
        };

        checkMetaMask();
    }, []);

    const connectWallet = async () => {
        const { ethereum } = window;
        try {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            setAccount(accounts[0]);
            setConnected(true);
        } catch (error) {
            console.error(error);
        }
    };

    const handleInstallMetaMask = () => {
        onboarding.startOnboarding();
    };

    return (
        <div className="onboard-container">
            {connected ? (
                <Toss />
            ) : (
                <>
                    <div className="loader" style={{ display: connected ? 'none' : 'block' }}>
                        <div></div> {/* Loader style should be defined in CSS */}
                    </div>
                    <div className="up" style={{ display: connected ? 'none' : 'block' }}>
                        {/* Add your up arrow or leave it empty */}
                    </div>
                    <div className="confetti" style={{ display: connected ? 'block' : 'none' }}>
                        {/* Add your confetti or leave it empty */}
                    </div>
                    <h1>{isMetaMaskInstalled ? 'Connect your wallet' : 'You need to Install a Wallet'}</h1>
                    <p className="desc">
                        {isMetaMaskInstalled 
                            ? 'To begin, please connect your MetaMask wallet.' 
                            : 'We recommend the MetaMask wallet.'}
                    </p>
                    <button 
                        className="onboard" 
                        onClick={isMetaMaskInstalled ? connectWallet : handleInstallMetaMask}
                        style={{ backgroundColor: connected ? '#cccccc' : undefined }}
                    >
                        {isMetaMaskInstalled ? 'Connect MetaMask' : 'Install MetaMask'}
                    </button>
                </>
            )}
        </div>
    );
};

export default MetaMaskComponent;
