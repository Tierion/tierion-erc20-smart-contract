var TierionNetworkToken = artifacts.require('./TierionNetworkToken.sol')

module.exports = function (deployer) {
  deployer.deploy(TierionNetworkToken)
}
