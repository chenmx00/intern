const assert = require('assert');
const Mnemonic = require('bip39');
const btc = require('bitcoinjs-lib');

const getBtcXPrv = (seed, derivationScheme = 'BIP49') => {
  assert(seed.constructor.name === 'Buffer');
  let xprv;
  if (derivationScheme === 'BIP49')
    xprv = btc.HDNode.fromSeedBuffer(seed).derivePath("m/49'/0'/0'/0");
  else if (derivationScheme === 'BIP84')
    xprv = btc.HDNode.fromSeedBuffer(seed).derivePath("m/84'/0'/0'/0");
  else
    assert(false);
  return xprv.toBase58();
};

const getBtcXPub = (xprv) => {
  assert(typeof(xprv) === 'string' && xprv.startsWith('xprv'));
  return btc.HDNode.fromBase58(xprv).neutered().toBase58();
};

const getBtcPrv = (xprv, index) => {
  assert(typeof(xprv) === 'string' && xprv.startsWith('xprv'));
  assert(typeof(index) == 'number' && index >= 0);
  return btc.HDNode.fromBase58(xprv).derive(index).keyPair.toWIF();
};

const getBtcAdd = (xpub, index, derivationScheme = 'BIP49') => {
  assert(typeof(xpub) === 'string' && xpub.startsWith('xpub'));
  assert(typeof(index) == 'number' && index >= 0);
  const pub = btc.HDNode.fromBase58(xpub).derive(index);
  let address;
  if (derivationScheme === 'BIP49')
    address = btc.address.fromOutputScript(btc.script.scriptHash.output.encode(btc.crypto.hash160(btc.script.witnessPubKeyHash.output.encode(btc.crypto.hash160(pub.getPublicKeyBuffer())))));
  else if (derivationScheme === 'BIP84')
    address = btc.address.fromOutputScript(btc.script.witnessPubKeyHash.output.encode(btc.crypto.hash160(pub.getPublicKeyBuffer())));
  else
    assert(false);
  return address;
};

module.exports = { getBtcXPrv, getBtcXPub, getBtcPrv, getBtcAdd };
