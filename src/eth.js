const assert = require('assert')
const ethHdkey = require('ethereumjs-wallet/hdkey')
const ethUtil = require('ethereumjs-util')

const getEthXPrv = (seed) => {
  assert(seed.constructor.name === 'Buffer')
  return ethHdkey.fromMasterSeed(seed).derivePath("m/44'/60'/0'/0").privateExtendedKey()
}

const getEthXPub = (xprv) => {
  assert(typeof xprv === 'string' && xprv.startsWith('xprv'))
  return ethHdkey.fromExtendedKey(xprv).publicExtendedKey()
}

const getEthPrv = (xprv, index) => {
  assert(typeof xprv === 'string' && xprv.startsWith('xprv'))
  assert(typeof index === 'number' && index >= 0)
  return ethHdkey.fromExtendedKey(xprv).deriveChild(index).getWallet().getPrivateKeyString()
}

const getEthAdd = (xpub, index) => {
  assert(typeof xpub === 'string' && xpub.startsWith('xpub'))
  assert(typeof index === 'number' && index >= 0)
  let add = ethHdkey.fromExtendedKey(xpub).deriveChild(index).getWallet().getAddressString()
  return ethUtil.toChecksumAddress(add)
}

module.exports = { getEthXPrv, getEthXPub, getEthPrv, getEthAdd }
