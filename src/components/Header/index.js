import React from 'react';
import './index.css';  
import {Component}from "react"
class Header extends Component {
addmoney=()=>{
    const{details,moneyadd}=this.props
    moneyadd()
}
    render(){
        const{details}=this.props
        console.log(details.bal)
    return (
        <header className="header">
            <h1>MetaMask Wallet</h1>
            <div className='header1'>
            <button onClick={this.addmoney}>ADD Money</button>
            <p className="balance">Wallet Balance:{details.bal}</p>
            </div>
        </header>
    );
};
}
export default Header;
