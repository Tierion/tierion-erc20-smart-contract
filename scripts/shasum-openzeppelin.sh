#!/bin/bash

# Run a quick test to ensure that all OpenZeppelin contract
# files we are using match what is distributed through NPM.
echo "npm release"

sha256sum contracts/zeppelin-solidity/contracts/lifecycle/Pausable.sol node_modules/zeppelin-solidity/contracts/lifecycle/Pausable.sol
sha256sum contracts/zeppelin-solidity/contracts/math/SafeMath.sol node_modules/zeppelin-solidity/contracts/math/SafeMath.sol
sha256sum contracts/zeppelin-solidity/contracts/ownership/Ownable.sol node_modules/zeppelin-solidity/contracts/ownership/Ownable.sol
sha256sum contracts/zeppelin-solidity/contracts/token/BasicToken.sol node_modules/zeppelin-solidity/contracts/token/BasicToken.sol
sha256sum contracts/zeppelin-solidity/contracts/token/ERC20.sol node_modules/zeppelin-solidity/contracts/token/ERC20.sol
sha256sum contracts/zeppelin-solidity/contracts/token/ERC20Basic.sol node_modules/zeppelin-solidity/contracts/token/ERC20Basic.sol
sha256sum contracts/zeppelin-solidity/contracts/token/StandardToken.sol node_modules/zeppelin-solidity/contracts/token/StandardToken.sol





# /Users/glenn/src/zeppelin-solidity/contracts

echo ""
echo "diff npm v 1.2.0 against zeppelin-solidity git head"
echo ""
echo "Pausable.sol"
diff contracts/zeppelin-solidity/contracts/lifecycle/Pausable.sol /Users/glenn/src/zeppelin-solidity/contracts/lifecycle/Pausable.sol
echo ""
echo "SafeMath.sol"
diff node_modules/zeppelin-solidity/contracts/math/SafeMath.sol /Users/glenn/src/zeppelin-solidity/contracts/math/SafeMath.sol
echo ""
echo "Ownable.sol"
diff node_modules/zeppelin-solidity/contracts/ownership/Ownable.sol /Users/glenn/src/zeppelin-solidity/contracts/ownership/Ownable.sol
echo ""
echo "BasicToken.sol"
diff node_modules/zeppelin-solidity/contracts/token/BasicToken.sol /Users/glenn/src/zeppelin-solidity/contracts/token/BasicToken.sol
echo ""
echo "ERC20.sol"
diff node_modules/zeppelin-solidity/contracts/token/ERC20.sol /Users/glenn/src/zeppelin-solidity/contracts/token/ERC20.sol
echo ""
echo "ERC20Basic.sol"
diff node_modules/zeppelin-solidity/contracts/token/ERC20Basic.sol /Users/glenn/src/zeppelin-solidity/contracts/token/ERC20Basic.sol
echo ""
echo "StandardToken.sol"
diff node_modules/zeppelin-solidity/contracts/token/StandardToken.sol /Users/glenn/src/zeppelin-solidity/contracts/token/StandardToken.sol
