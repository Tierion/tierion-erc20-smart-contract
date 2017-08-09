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

  it('should set totalSupply to 1e17 Grains', function () {
    return TierionNetworkToken.deployed().then(function (instance) {
      return instance.totalSupply.call()
    }).then(function (supply) {
      assert.equal(supply, 1e17, "1e17 wasn't the value of totalSupply Grains")
    })
  })

  it('should put 1e17 Grains in the first account', function () {
    return TierionNetworkToken.deployed().then(function (instance) {
      return instance.balanceOf.call(accounts[0])
    }).then(function (balance) {
      assert.equal(balance.valueOf(), 1e17, '1e17 Grains were not assigned to the first account')
    })
  })

  it('should set contact information on contract creation when Contactable', function () {
    return TierionNetworkToken.deployed().then(function (instance) {
      return instance.contactInformation.call()
    }).then(function (contact) {
      assert.equal(contact, 'Tierion <tokensale@tierion.com>', 'Contact info not properly assigned')
    })
  })

  it('should allow update of contact information by owner when Contactable', function () {
    var meta

    return TierionNetworkToken.deployed().then(function (instance) {
      meta = instance
      return meta.setContactInformation('New Owner <newbie@example.com>', { from: accounts[0] })
    }).then(function (result) {
      // console.log(result)
      return meta.contactInformation.call()
    }).then(function (contact) {
      assert.equal(contact, 'New Owner <newbie@example.com>', 'Contact info not properly modified')
    })
  })

  it('should not allow update of contact information by non-owner when Contactable', function () {
    var meta

    return TierionNetworkToken.deployed().then(function (instance) {
      meta = instance
      return meta.setContactInformation('Malicious Mel <mel@malware.com>', { from: accounts[1] })
    })
    .then(assert.fail)
    .catch(function (error) {
      assert(
        error.message.indexOf('invalid opcode') >= 0,
        'non-owner accounts trying to setContactInformation() should throw an invalid opcode exception.'
      )
    })
  })

  it('should set owner information on contract creation when Ownable', function () {
    return TierionNetworkToken.deployed().then(function (instance) {
      return instance.owner.call()
    }).then(function (owner) {
      assert.equal(owner, accounts[0], 'Owner info not properly assigned')
    })
  })

  it('should allow transfer of ownership by owner when Ownable', function () {
    var meta

    return TierionNetworkToken.deployed().then(function (instance) {
      meta = instance
      // from 0 to 1
      return meta.transferOwnership(accounts[1], { from: accounts[0] })
    }).then(function (result) {
      // console.log(result)
      return meta.owner.call()
    }).then(function (owner) {
      assert.equal(owner, accounts[1], 'Owner info not properly assigned')
      // reset ownership back to 0
      meta.transferOwnership(accounts[0], { from: accounts[1] })
    })
  })

  it('should not allow transfer of ownership by non-owner when Ownable', function () {
    var meta

    return TierionNetworkToken.deployed().then(function (instance) {
      meta = instance
      return meta.transferOwnership(accounts[3], { from: accounts[2] })
    })
    .then(assert.fail)
    .catch(function (error) {
      assert(
        error.message.indexOf('invalid opcode') >= 0,
        'non-owner accounts trying to transferOwnership() should throw an invalid opcode exception.'
      )
    })
  })

  it('should not be paused on contract creation when Pausable', function () {
    return TierionNetworkToken.deployed().then(function (instance) {
      return instance.paused.call()
    }).then(function (paused) {
      assert.equal(paused, false, 'Contract should not be paused when created')
    })
  })

  it('should be able to be paused and unpaused by owner when Pausable', function () {
    var meta

    return TierionNetworkToken.deployed().then(function (instance) {
      meta = instance
      return meta.pause({ from: accounts[0] })
    }).then(function (result) {
      return meta.paused.call()
    }).then(function (paused) {
      assert.equal(paused, true, 'Contract should be paused after pause()')
    }).then(function () {
      return meta.unpause({ from: accounts[0] })
    }).then(function (result) {
      return meta.paused.call()
    }).then(function (paused) {
      assert.equal(paused, false, 'Contract should not be paused after unpause()')
    })
  })

  it('should not allow pause by non-owner when Pausable', function () {
    var meta

    return TierionNetworkToken.deployed().then(function (instance) {
      meta = instance
      return meta.pause({ from: accounts[1] })
    })
    .then(assert.fail)
    .catch(function (error) {
      assert(
        error.message.indexOf('invalid opcode') >= 0,
        'non-owner accounts trying to pause() should throw an invalid opcode exception.'
      )
    })
  })

  it('should not allow unpause by non-owner if paused when Pausable', function () {
    var meta

    return TierionNetworkToken.deployed().then(function (instance) {
      meta = instance
      return meta.pause({ from: accounts[0] })
    }).then(function (result) {
      return meta.unpause({ from: accounts[1] })
    })
    .then(assert.fail)
    .catch(function (error) {
      assert(
        error.message.indexOf('invalid opcode') >= 0,
        'non-owner accounts trying to unpause() should throw an invalid opcode exception.'
      )
      // reset
      meta.unpause({ from: accounts[0] })
    })
  })
})
