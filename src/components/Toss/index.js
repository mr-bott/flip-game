import { Component } from 'react';
import './index.css';
import Header from '../Header';

class Toss extends Component {
  state = {
    result: 0,
    bal: 500,
    betAmount:"",
    betSide: '', 
    know:false,
  };

  handleBetAmountChange = (event) => {
    this.setState({ betAmount: parseFloat(event.target.value) || 0 });
  };

  handleBetSideChange = (side) => {
    this.setState({ betSide: side });
  };

  placeBet = () => {
    const { betAmount, bal, betSide } = this.state;
    if (betAmount <= 0) {
      alert('Bet amount should be greater than 0');
      return;
    }
    if (betAmount > bal) {
      alert('Insufficient balance');
      return;
    }

    const tossResult = Math.floor(Math.random() * 2);
    const resultSide = tossResult === 0 ? 'heads' : 'tails';

    if (betSide === resultSide) {
      
      this.setState((prevState) => ({
        bal: prevState.bal + betAmount * 2,
        result: tossResult,
        betAmount:" "
      }));
      alert('You won!');
    } else {
      this.setState((prevState) => ({
        bal: prevState.bal - betAmount,
        result: tossResult,
        betAmount:" "
      }));
      alert('You lost!');
    }
  };

  moneyadd=()=>{
    this.setState(prevState=>({bal:prevState.bal+100}))
  }
knoww=()=>{
  this.setState(prevState=>({know:!prevState.know}))
}
  render() {
    const {  result, bal, betAmount, betSide,know } = this.state;

    return (
      <>
        <Header details={{bal}} moneyadd={this.moneyadd}/>
        <div className="main">
          {know?(<diV className="card1">
            <p>I have tried extensively to connect to MetaMask, but encountered difficulties due to the requirement of having a balance in the wallet for successful connection. While MetaMask offers test networks for developers, these demo wallets often lack sufficient funds, making it challenging to test the connection.

Despite my efforts, I was unable to add funds to the demo wallet to complete the project. However, I appreciate the opportunity to work on this assignment. Through this experience, I have gained valuable knowledge about blockchain technology, decentralized applications (dApps), and NFTs.

Thank you for providing this opportunity and for the support throughout this process. </p>
<button onClick={this.knoww} className='btn1'>Go back </button>
          </diV>):(
          <div className="card">
             <button onClick={this.knoww} className='btn1'>Why i used local wallet</button>
            <h1 className="heading">Coin Toss Game</h1>
            <p>Heads (or) Tails</p>
            {result ? (
              <img
                src="https://assets.ccbp.in/frontend/react-js/tails-img.png"
                className="img"
                alt="toss result"
              />
            ) : (
              <img
                src="https://assets.ccbp.in/frontend/react-js/heads-img.png"
                className="img"
                alt="toss result"
              />
            )}
            <input
              type="text"
              value={betAmount}
              onChange={this.handleBetAmountChange}
              placeholder="Enter bet amount"
              className="bet-input"
            />
            <div className="bet-buttons">
              <button
                onClick={() => this.handleBetSideChange('heads')}
                className={betSide === 'heads' ? 'active-btn' : 'btn'}
              >
                Bet on Heads
              </button>
              <button
                onClick={() => this.handleBetSideChange('tails')}
                className={betSide === 'tails' ? 'active-btn' : 'btn'}
              >
                Bet on Tails
              </button>
            </div>
            <button onClick={this.placeBet} className="btn">
              Place Bet
            </button>
          
          </div>)}

        </div>
      </>
    );
  }
}

export default Toss;
