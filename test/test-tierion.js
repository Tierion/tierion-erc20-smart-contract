var TierionNetworkToken = artifacts.require('./TierionNetworkToken.sol')

contract('TierionNetworkToken', function (accounts) {
  it('should have the name Tierion Network Token', function () {
    return TierionNetworkToken.deployed().then(function (instance) {
      return instance.name.call()
    }).then(function (name) {
      assert.equal(name, 'Tierion Network Token', "Tierion Network Token wasn't the name")
    })
  })

  it('should have the symbol TNT', function () {
    return TierionNetworkToken.deployed().then(function (instance) {
      return instance.symbol.call()
    }).then(function (symbol) {
      assert.equal(symbol, 'TNT', "TNT wasn't the symbol")
    })
  })

  it('should have decimals set to 8', function () {
    return TierionNetworkToken.deployed().then(function (instance) {
      return instance.decimals.call()
    }).then(function (decimals) {
      assert.equal(decimals, 8, "8 wasn't the value of decimals")
    })
  })

  it('should have INITIAL_SUPPLY set to 1e17 Grains', function () {
    return TierionNetworkToken.deployed().then(function (instance) {
      return instance.INITIAL_SUPPLY.call()
    }).then(function (supply) {
      assert.equal(supply, 1e17, "1e17 wasn't the value of INITIAL_SUPPLY Grains")
    })
  })

  it('should set totalSupply to 1e17 units', function () {
    return TierionNetworkToken.deployed().then(function (instance) {
      return instance.totalSupply.call()
    }).then(function (supply) {
      assert.equal(supply, 1e17, "1e17 wasn't the value of totalSupply Grains")
    })
  })

  it('should put 1e17 units in the first account', function () {
    return TierionNetworkToken.deployed().then(function (instance) {
      return instance.balanceOf.call(accounts[0])
    }).then(function (balance) {
      assert.equal(balance.valueOf(), 1e17, '1e17 Grains were not assigned to the first account')
    })
  })
})
