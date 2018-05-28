const assert = require('assert')

const getQtumXPrv = (seed) => {
  assert(seed.constructor.name === 'Buffer')
  console.log("m/44'/2301'/0'/0")
}

const getQtumXPub = (xprv) => {
  assert(typeof xprv === 'string' && xprv.startsWith('xprv'))
}

const getQtumPrv = (xprv, index) => {
  assert(typeof xprv === 'string' && xprv.startsWith('xprv'))
  assert(typeof index === 'number' && index >= 0)
}

const getQtumAdd = (xpub, index) => {
  assert(typeof xpub === 'string' && xpub.startsWith('xpub'))
  assert(typeof index === 'number' && index >= 0)
}

module.exports = { getQtumXPrv, getQtumXPub, getQtumPrv, getQtumAdd }
