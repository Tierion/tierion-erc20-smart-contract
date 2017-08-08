pragma solidity ^0.4.11;


import "../zeppelin-solidity/contracts/token/StandardToken.sol";


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
contract TierionNetworkToken is StandardToken {

  string public name = 'Tierion Network Token';                 // Set the token name for display
  string public symbol = 'TNT';                                 // Set the token symbol for display
  uint256 public decimals = 8;                                  // Set the number of decimals for display
  uint256 public INITIAL_SUPPLY = 1000000000 * 10**decimals;    // 1 Billion TNT specified in Grains

  /**
   * @dev TierionNetworkToken Constructor
   * Runs only on initial contract creation.
   */
  function TierionNetworkToken() {
    totalSupply = INITIAL_SUPPLY;                               // Set the total supply
    balances[msg.sender] = INITIAL_SUPPLY;                      // Creator address is assigned all
  }

}
