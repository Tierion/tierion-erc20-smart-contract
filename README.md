# Tierion Network Token (TNT) Ethereum Smart Contract

An `ERC20` standard token. Built on the [OpenZeppelin](https://openzeppelin.org/) framework.

## Development

The production build was compiled with the following Truffle version:

```
➜  tierion-erc20-smart-contract git:(master) ./node_modules/.bin/truffle version
Truffle v3.4.9 (core: 3.4.8)
Solidity v0.4.15 (solc-js)
```

### Setup

You'll need the [yarn tool installed](https://yarnpkg.com/lang/en/docs/install/).

Install dev dependencies:

```
cd tierion-erc20-smart-contract
yarn
```

### Test

Running `yarn test` will also take care of starting/stopping `testrpc`.

```
yarn test
```
