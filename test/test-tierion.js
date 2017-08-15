var utils = require('./utils.js')
var TierionNetworkToken = artifacts.require('./TierionNetworkToken.sol')

contract('TierionNetworkToken', (accounts) => {
  it('should have the name Tierion Network Token', () => {
    return TierionNetworkToken.deployed().then((instance) => {
      return instance.name.call()
    })
    .then((name) => {
      assert.equal(name, 'Tierion Network Token', "Tierion Network Token wasn't the name")
    })
  })

  it('should have the symbol TNT', () => {
    return TierionNetworkToken.deployed().then((instance) => {
      return instance.symbol.call()
    })
    .then((symbol) => {
      assert.equal(symbol, 'TNT', "TNT wasn't the symbol")
    })
  })

  it('should have decimals set to 8', () => {
    return TierionNetworkToken.deployed().then((instance) => {
      return instance.decimals.call()
    })
    .then((decimals) => {
      assert.equal(decimals, 8, "8 wasn't the value of decimals")
    })
  })

  it('should have INITIAL_SUPPLY set to 1e17 Grains', () => {
    return TierionNetworkToken.deployed().then((instance) => {
      return instance.INITIAL_SUPPLY.call()
    })
    .then((supply) => {
      assert.equal(supply, 1e17, "1e17 wasn't the value of INITIAL_SUPPLY Grains")
    })
  })

  it('should set totalSupply to 1e17 Grains', () => {
    return TierionNetworkToken.deployed().then((instance) => {
      return instance.totalSupply.call()
    })
    .then((supply) => {
      assert.equal(supply, 1e17, "1e17 wasn't the value of totalSupply Grains")
    })
  })

  it('should put 1e17 Grains in the first account', () => {
    return TierionNetworkToken.deployed().then((instance) => {
      return instance.balanceOf.call(accounts[0])
    })
    .then((balance) => {
      assert.equal(balance.valueOf(), 1e17, '1e17 Grains were not assigned to the first account')
    })
  })

  it('should set owner information on contract creation when Ownable', () => {
    return TierionNetworkToken.deployed().then((instance) => {
      return instance.owner.call()
    })
    .then((owner) => {
      assert.equal(owner, accounts[0], 'Owner info not properly assigned')
    })
  })

  it('should allow transfer of ownership by owner when Ownable', () => {
    var meta

    return TierionNetworkToken.deployed().then((instance) => {
      meta = instance
      // from 0 to 1
      return meta.transferOwnership(accounts[1], { from: accounts[0] })
    })
    .then(() => {
      return meta.owner.call()
    })
    .then((owner) => {
      assert.equal(owner, accounts[1], 'Owner info not properly assigned')
      // reset ownership back to 0
      meta.transferOwnership(accounts[0], { from: accounts[1] })
    })
  })

  it('should not allow transfer of ownership by non-owner when Ownable', () => {
    var meta

    return TierionNetworkToken.deployed().then((instance) => {
      meta = instance
      return meta.transferOwnership(accounts[3], { from: accounts[2] })
    })
    .then(assert.fail)
    .catch((error) => {
      assert(
        error.message.indexOf('invalid opcode') >= 0,
        'non-owner accounts trying to transferOwnership() should throw an invalid opcode exception.'
      )
    })
  })

  it('should not be paused on contract creation when Pausable', () => {
    return TierionNetworkToken.deployed().then((instance) => {
      return instance.paused.call()
    })
    .then((paused) => {
      assert.equal(paused, false, 'Contract should not be paused when created')
    })
  })

  it('should be able to be paused and unpaused by owner when Pausable', () => {
    var meta

    return TierionNetworkToken.deployed().then((instance) => {
      meta = instance
      return meta.pause({ from: accounts[0] })
    })
    .then((response) => {
      utils.assertEvent(meta, { event: 'Pause' })
    })
    .then((result) => {
      return meta.paused.call()
    })
    .then((paused) => {
      assert.equal(paused, true, 'Contract should be paused after pause()')
    })
    .then(() => {
      return meta.unpause({ from: accounts[0] })
    })
    .then(() => {
      utils.assertEvent(meta, { event: 'Unpause' })
    })
    .then((result) => {
      return meta.paused.call()
    })
    .then((paused) => {
      assert.equal(paused, false, 'Contract should not be paused after unpause()')
    })
  })

  it('should not allow pause by non-owner when Pausable', () => {
    var meta

    return TierionNetworkToken.deployed().then((instance) => {
      meta = instance
      return meta.pause({ from: accounts[1] })
    })
    .then(assert.fail)
    .catch((error) => {
      assert(
        error.message.indexOf('invalid opcode') >= 0,
        'non-owner accounts trying to pause() should throw an invalid opcode exception.'
      )
    })
  })

  it('should not allow unpause by non-owner if paused when Pausable', () => {
    var meta

    return TierionNetworkToken.deployed().then((instance) => {
      meta = instance
      return meta.pause({ from: accounts[0] })
    })
    .then((response) => {
      utils.assertEvent(meta, { event: 'Pause' })
    })
    .then((result) => {
      return meta.unpause({ from: accounts[1] })
    })
    .then(assert.fail)
    .catch((error) => {
      assert(
        error.message.indexOf('invalid opcode') >= 0,
        'non-owner accounts trying to unpause() should throw an invalid opcode exception.'
      )
    })
    .then(() => {
      // reset
      meta.unpause({ from: accounts[0] })
    })
  })

  it('should allow transfer() of Grains by address owner when unpaused', () => {
    var meta
    var xferAmt = 100000000
    var account0StartingBalance
    var account1StartingBalance
    var account0EndingBalance
    var account1EndingBalance

    return TierionNetworkToken.deployed().then((instance) => {
      meta = instance
      return meta.balanceOf(accounts[0])
    })
    .then((balance) => {
      account0StartingBalance = balance.toNumber()
      return meta.balanceOf(accounts[1])
    })
    .then((balance) => {
      account1StartingBalance = balance.toNumber()
      return meta.transfer(accounts[1], xferAmt, { from: accounts[0] })
    })
    .then(() => {
      utils.assertEvent(meta, { event: 'Transfer' })
    })
    .then(() => {
      return meta.balanceOf(accounts[0])
    })
    .then((balance) => {
      account0EndingBalance = balance.toNumber()
    })
    .then((result) => {
      return meta.balanceOf(accounts[1])
    })
    .then((balance) => {
      account1EndingBalance = balance.toNumber()
    })
    .then(() => {
      assert.equal(account0EndingBalance, account0StartingBalance - xferAmt, 'Balance of account 0 incorrect')
      assert.equal(account1EndingBalance, account1StartingBalance + xferAmt, 'Balance of account 1 incorrect')
    })
  })

  it('should allow transferFrom(), when properly approved, when unpaused', () => {
    var meta
    var xferAmt = 100000000
    var account0StartingBalance
    var account1StartingBalance
    var account0EndingBalance
    var account1EndingBalance

    return TierionNetworkToken.deployed().then((instance) => {
      meta = instance
      return meta.balanceOf(accounts[0], { from: accounts[0] })
    })
    .then((balance) => {
      account0StartingBalance = balance.toNumber()
      return meta.balanceOf(accounts[1], { from: accounts[1] })
    })
    .then((balance) => {
      account1StartingBalance = balance.toNumber()
      // account 1 first needs approval to move Grains from account 0
      return meta.approve(accounts[1], xferAmt, { from: accounts[0] })
    })
    .then(() => {
      utils.assertEvent(meta, { event: 'Approval' })
    })
    .then((balance) => {
      // with prior approval, account 1 can transfer Grains from account 0
      return meta.transferFrom(accounts[0], accounts[1], xferAmt, { from: accounts[1] })
    })
    .then((result) => {
      return meta.balanceOf(accounts[0], { from: accounts[0] })
    })
    .then((balance) => {
      account0EndingBalance = balance.toNumber()
    })
    .then((result) => {
      return meta.balanceOf(accounts[1], { from: accounts[1] })
    })
    .then((balance) => {
      account1EndingBalance = balance.toNumber()
    })
    .then(() => {
      assert.equal(account0EndingBalance, account0StartingBalance - xferAmt, 'Balance of account 0 incorrect')
      assert.equal(account1EndingBalance, account1StartingBalance + xferAmt, 'Balance of account 1 incorrect')
    })
  })

  it('should allow approve(), and allowance() when unpaused', () => {
    var meta
    var xferAmt = 100000000

    return TierionNetworkToken.deployed().then((instance) => {
      meta = instance
      return meta.approve(accounts[1], xferAmt, { from: accounts[0] })
    })
    .then(() => {
      utils.assertEvent(meta, { event: 'Approval' })
    })
    .then(() => {
      return meta.allowance(accounts[0], accounts[1], { from: accounts[0] })
    })
    .then((allowance) => {
      return allowance.toNumber()
    })
    .then((allowance) => {
      assert.equal(allowance, xferAmt, 'Allowance amount is incorrect')
    })
    .then(() => {
      // reset
      meta.approve(accounts[1], 0, { from: accounts[0] })
    })
  })

  it('should not allow approve() when paused', () => {
    var meta
    var xferAmt = 100000000

    return TierionNetworkToken.deployed().then((instance) => {
      meta = instance
      return meta.pause({ from: accounts[0] })
    })
    .then((response) => {
      utils.assertEvent(meta, { event: 'Pause' })
    })
    .then((result) => {
      return meta.approve(accounts[1], xferAmt, { from: accounts[0] })
    })
    .then(assert.fail)
    .catch((error) => {
      assert(
        error.message.indexOf('invalid opcode') >= 0,
        'accounts trying to approve() when paused should throw an invalid opcode exception.'
      )
    })
    .then(() => {
      // reset
      meta.unpause({ from: accounts[0] })
    })
    .then(() => {
      // reset
      meta.approve(accounts[1], 0, { from: accounts[0] })
    })
  })

  it('should not allow transfer() when paused', () => {
    var meta
    var xferAmt = 100000000

    return TierionNetworkToken.deployed().then((instance) => {
      meta = instance
      return meta.pause({ from: accounts[0] })
    })
    .then((response) => {
      utils.assertEvent(meta, { event: 'Pause' })
    })
    .then((result) => {
      return meta.transfer(accounts[1], xferAmt, { from: accounts[0] })
    })
    .then(assert.fail)
    .catch((error) => {
      assert(
        error.message.indexOf('invalid opcode') >= 0,
        'accounts trying to transfer() when paused should throw an invalid opcode exception.'
      )
    })
    .then(() => {
      // reset
      meta.unpause({ from: accounts[0] })
    })
  })

  it('should not allow transferFrom() when paused', () => {
    var meta
    var xferAmt = 100000000

    return TierionNetworkToken.deployed().then((instance) => {
      meta = instance
      return meta.approve(accounts[1], xferAmt, { from: accounts[0] })
    })
    .then((response) => {
      utils.assertEvent(meta, { event: 'Approval' })
    })
    .then(() => {
      return meta.pause({ from: accounts[0] })
    })
    .then((response) => {
      utils.assertEvent(meta, { event: 'Pause' })
    })
    .then(() => {
      return meta.transferFrom(accounts[0], accounts[1], xferAmt, { from: accounts[1] })
    })
    .then(assert.fail)
    .catch((error) => {
      assert(
        error.message.indexOf('invalid opcode') >= 0,
        'accounts trying to transferFrom() when paused should throw an invalid opcode exception.'
      )
    })
    .then(() => {
      // reset
      meta.unpause({ from: accounts[0] })
    })
    .then(() => {
      // reset
      meta.approve(accounts[1], 0, { from: accounts[0] })
    })
  })

  it('should not allow transfer() when _to is null', () => {
    var meta
    var xferAmt = 100000000

    return TierionNetworkToken.deployed().then((instance) => {
      meta = instance
      return meta.transfer(null, xferAmt, { from: accounts[0] })
    })
    .then(assert.fail)
    .catch((error) => {
      assert(
        error.message.indexOf('invalid opcode') >= 0,
        'accounts trying to transfer() when _to is null should throw an invalid opcode exception.'
      )
    })
  })

  // We don't want TNT to join this club:
  // https://etherscan.io/address/0x0000000000000000000000000000000000000000
  it('should not allow transfer() when _to is 0x0000000000000000000000000000000000000000', () => {
    var meta
    var xferAmt = 100000000

    return TierionNetworkToken.deployed().then((instance) => {
      meta = instance
      return meta.transfer('0x0000000000000000000000000000000000000000', xferAmt, { from: accounts[0] })
    })
    .then(assert.fail)
    .catch((error) => {
      assert(
        error.message.indexOf('invalid opcode') >= 0,
        'accounts trying to transfer() when _to is 0x0000000000000000000000000000000000000000 should throw an invalid opcode exception.'
      )
    })
  })

  it('should not allow transferFrom() when _to is null', () => {
    var meta
    var xferAmt = 100000000

    return TierionNetworkToken.deployed().then((instance) => {
      meta = instance
      return meta.approve(accounts[1], xferAmt, { from: accounts[0] })
    })
    .then(() => {
      utils.assertEvent(meta, { event: 'Approval' })
    })
    .then(() => {
      return meta.transferFrom(accounts[0], null, xferAmt, { from: accounts[1] })
    })
    .then(assert.fail)
    .catch((error) => {
      assert(
        error.message.indexOf('invalid opcode') >= 0,
        'accounts trying to transferFrom() when _to is null should throw an invalid opcode exception.'
      )
    })
    .then(() => {
      // reset
      meta.approve(accounts[1], 0, { from: accounts[0] })
    })
  })

  it('should not allow transferFrom() when _to is 0x0000000000000000000000000000000000000000', () => {
    var meta
    var xferAmt = 100000000

    return TierionNetworkToken.deployed().then((instance) => {
      meta = instance
      return meta.approve(accounts[1], xferAmt, { from: accounts[0] })
    })
    .then(() => {
      utils.assertEvent(meta, { event: 'Approval' })
    })
    .then(() => {
      return meta.transferFrom(accounts[0], '0x0000000000000000000000000000000000000000', xferAmt, { from: accounts[1] })
    })
    .then(assert.fail)
    .catch((error) => {
      assert(
        error.message.indexOf('invalid opcode') >= 0,
        'accounts trying to transferFrom() when _to is 0x0000000000000000000000000000000000000000 should throw an invalid opcode exception.'
      )
    })
    .then(() => {
      // reset
      meta.approve(accounts[1], 0, { from: accounts[0] })
    })
  })
})
