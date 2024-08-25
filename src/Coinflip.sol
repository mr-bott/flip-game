pragma solidity ^0.8.0;

contract CoinFlip {
    // Address of the contract owner (or the one who deployed the contract)
    address public owner;
    // Minimum amount
    uint256 public minimumBet = 0.01 ether;
    
    mapping(address => uint256) public balances;
    
    event BetResult(address indexed user, bool won, uint256 betAmount, uint256 newBalance);

    constructor() {
        owner = msg.sender;
    }
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    function deposit() external payable onlyOwner {}

    function checkBalance() external view returns (uint256) {
        return balances[msg.sender];
    }
    function bet(bool _heads) external payable {
        require(msg.value >= minimumBet, "Bet amount is below the minimum limit");
        require(balances[msg.sender] + msg.value >= minimumBet, "Insufficient balance to cover bet");

        balances[msg.sender] -= msg.value;
        bool outcome = (block.timestamp % 2 == 0); 
        if (outcome == _heads) {
            uint256 winnings = msg.value * 2;
            balances[msg.sender] += winnings;
            emit BetResult(msg.sender, true, msg.value, balances[msg.sender]);
        } else {
            emit BetResult(msg.sender, false, msg.value, balances[msg.sender]);
        }
    }

    receive() external payable {
        balances[msg.sender] += msg.value;
    }
}