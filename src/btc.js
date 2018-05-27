const assert = require('assert')
const btc = require('bitcoinjs-lib')

const getBtcXPrvBip49 = (seed) => {
  assert(seed.constructor.name === 'Buffer')
  return btc.HDNode.fromSeedBuffer(seed).derivePath("m/49'/0'/0'/0").toBase58()
}

const getBtcXPrvBip84 = (seed, derivationScheme = 'BIP49') => {
  assert(seed.constructor.name === 'Buffer')
  return btc.HDNode.fromSeedBuffer(seed).derivePath("m/84'/0'/0'/0").toBase58()
}

const getBtcXPub = (xprv) => {
  assert(typeof xprv === 'string' && xprv.startsWith('xprv'))
  return btc.HDNode.fromBase58(xprv).neutered().toBase58()
}

const getBtcPrv = (xprv, index) => {
  assert(typeof xprv === 'string' && xprv.startsWith('xprv'))
  assert(typeof index === 'number' && index >= 0)
  return btc.HDNode.fromBase58(xprv).derive(index).keyPair.toWIF()
}

const getBtcAddBip49 = (xpub, index) => {
  assert(typeof xpub === 'string' && xpub.startsWith('xpub'))
  assert(typeof index === 'number' && index >= 0)
  const pub = btc.HDNode.fromBase58(xpub).derive(index)
  return btc.address.fromOutputScript(btc.script.scriptHash.output.encode(btc.crypto.hash160(btc.script.witnessPubKeyHash.output.encode(btc.crypto.hash160(pub.getPublicKeyBuffer())))))
}

const getBtcAddBip84 = (xpub, index) => {
  assert(typeof xpub === 'string' && xpub.startsWith('xpub'))
  assert(typeof index === 'number' && index >= 0)
  const pub = btc.HDNode.fromBase58(xpub).derive(index)
  return btc.address.fromOutputScript(btc.script.witnessPubKeyHash.output.encode(btc.crypto.hash160(pub.getPublicKeyBuffer())))
}

module.exports = { getBtcXPrvBip49, getBtcXPrvBip84, getBtcXPub, getBtcPrv, getBtcAddBip49, getBtcAddBip84 }
