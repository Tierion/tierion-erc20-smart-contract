pragma solidity ^0.4.13;


import "../zeppelin-solidity/contracts/token/StandardToken.sol";


/**
 * @title Tierion Network Token
 * @dev ERC20 Tierion Network Token (TNT)
 * All initial tokens are pre-assigned to the creator.
 */
contract TierionNetworkToken is StandardToken {

  string public name = 'TierionNetworkToken';
  string public symbol = 'TNT';
  uint256 public decimals = 8;
  uint256 public INITIAL_SUPPLY = 1000000000 * 10**decimals;

  /**
   * @dev Constructor that pre-assigns all new tokens to the creator.
   */
  function TierionNetworkToken() {
    totalSupply = INITIAL_SUPPLY;
    balances[msg.sender] = INITIAL_SUPPLY;
  }

}
