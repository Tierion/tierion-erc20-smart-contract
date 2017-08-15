pragma solidity ^0.4.13;


import "./zeppelin-solidity/contracts/token/StandardToken.sol";
import "./zeppelin-solidity/contracts/lifecycle/Pausable.sol";


/**
 * @title Tierion Network Token
 * @dev ERC20 Tierion Network Token (TNT)
 *
 * TNT Tokens are divisible by 1e8 (100,000,000) base
 * units referred to as 'Grains'.
 *
 * TNT are displayed using 8 decimal places of precision.
 *
 * 1 TNT is equivalent to:
 *   100000000 == 1 * 10**8 == 1e8 == One Hundred Million Grains
 *
 * 1 Billion TNT (total supply) is equivalent to:
 *   100000000000000000 == 1000000000 * 10**8 == 1e17 == One Hundred Quadrillion Grains
 *
 * All initial TNT Grains are assigned to the creator of
 * this contract.
 *
 */
contract TierionNetworkToken is StandardToken, Pausable {

  string public constant name = 'Tierion Network Token';                 // Set the token name for display
  string public constant symbol = 'TNT';                                 // Set the token symbol for display
  uint256 public constant decimals = 8;                                  // Set the number of decimals for display
  uint256 public constant INITIAL_SUPPLY = 1000000000 * 10**decimals;    // 1 Billion TNT specified in Grains

  /**
   * @dev TierionNetworkToken Constructor
   * Runs only on initial contract creation.
   */
  function TierionNetworkToken() {
    totalSupply = INITIAL_SUPPLY;                               // Set the total supply
    balances[msg.sender] = INITIAL_SUPPLY;                      // Creator address is assigned all
  }

  /**
   * @dev Transfer token for a specified address when not paused
   * @param _to The address to transfer to.
   * @param _value The amount to be transferred.
   */
  function transfer(address _to, uint256 _value) whenNotPaused returns (bool) {
    require(_to != address(0));
    return super.transfer(_to, _value);
  }

  /**
   * @dev Transfer tokens from one address to another when not paused
   * @param _from address The address which you want to send tokens from
   * @param _to address The address which you want to transfer to
   * @param _value uint256 the amount of tokens to be transferred
   */
  function transferFrom(address _from, address _to, uint256 _value) whenNotPaused returns (bool) {
    require(_to != address(0));
    return super.transferFrom(_from, _to, _value);
  }

  /**
   * @dev Aprove the passed address to spend the specified amount of tokens on behalf of msg.sender when not paused.
   * @param _spender The address which will spend the funds.
   * @param _value The amount of tokens to be spent.
   */
  function approve(address _spender, uint256 _value) whenNotPaused returns (bool) {
    return super.approve(_spender, _value);
  }

}
