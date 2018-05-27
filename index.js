const Mnemonic = require('bip39')

const {
  getBtcXPrvBip49, getBtcXPrvBip84, getBtcXPub,
  getEthXPrv, getEthXPub
} = require('./src')

const seed = Mnemonic.mnemonicToSeed('念 疾 暴 或 熊 行 黑 垄 长 亮 绕 植 漂 伤 投')

const btcXPrvBip49 = getBtcXPrvBip49(seed)
const btcXPubBip49 = getBtcXPub(btcXPrvBip49)
console.log('BTC BIP49 xprv : ' + btcXPrvBip49)
console.log('BTC BIP49 xpub : ' + btcXPubBip49)

const btcXPrvBip84 = getBtcXPrvBip84(seed)
const btcXPubBip84 = getBtcXPub(btcXPrvBip84)
console.log('BTC BIP84 xprv : ' + btcXPrvBip84)
console.log('BTC BIP84 xpub : ' + btcXPubBip84)

const ethXPrv = getEthXPrv(seed)
const ethXPub = getEthXPub(ethXPrv)
console.log('ETH BIP44 xprv : ' + ethXPrv)
console.log('ETH BIP44 xpub : ' + ethXPub)
