const assert = require('assert');
const Mnemonic = require('bip39');
const eth_hdkey = require('ethereumjs-wallet/hdkey');
const eth_util = require('ethereumjs-util');

const getEthXPrv = (seed) => {
  assert(seed.constructor.name === 'Buffer');
  return eth_hdkey.fromMasterSeed(seed).derivePath("m/44'/60'/0'/0").privateExtendedKey();
}

const getEthXPub = (xprv) => {
  assert(typeof(xprv) === 'string' && xprv.startsWith('xprv'));
  return eth_hdkey.fromExtendedKey(xprv).publicExtendedKey();
};

const getEthPrv = (xprv, index) => {
  assert(typeof(xprv) === 'string' && xprv.startsWith('xprv'));
  assert(typeof(index) == 'number' && index >= 0);
  return eth_hdkey.fromExtendedKey(xprv).deriveChild(index).getWallet().getPrivateKeyString();
};

const getEthAdd = (xpub, index) => {
  assert(typeof(xpub) === 'string' && xpub.startsWith('xpub'));
  assert(typeof(index) == 'number' && index >= 0);
  let add = eth_hdkey.fromExtendedKey(xpub).deriveChild(index).getWallet().getAddressString();
  return eth_util.toChecksumAddress(add);
};

module.exports = { getEthXPrv, getEthXPub, getEthPrv, getEthAdd };
