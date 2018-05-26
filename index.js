const Mnemonic = require('bip39');
const btc = require('bitcoinjs-lib');
const eth_hdkey = require('ethereumjs-wallet/hdkey');
const eth_util = require('ethereumjs-util');
const BtcClient = require('bitcoin-core');

const { getBtcXPrv, getBtcXPub, getBtcPrv, getBtcAdd } = require('./src/btc');
const { getEthXPrv, getEthXPub, getEthPrv, getEthAdd } = require('./src/eth');

const seed = Mnemonic.mnemonicToSeed('念 疾 暴 或 熊 行 黑 垄 长 亮 绕 植 漂 伤 投');

const btcXPrv = getBtcXPrv(seed, 'BIP49');
const btcXPub = getBtcXPub(btcXPrv);
const btcPrv = getBtcPrv(btcXPrv, 0);
const btcAdd = getBtcAdd(btcXPub, 0, 'BIP49');
console.log("BTC xprv : "+btcXPrv);
console.log("BTC xpub : "+btcXPub);

const ethXPrv = getEthXPrv(seed);
const ethXPub = getEthXPub(ethXPrv);
const ethPrv = getEthPrv(ethXPrv, 0);
const ethAdd = getEthAdd(ethXPub, 0);
console.log("ETH xprv : "+ethXPrv);
console.log("ETH xpub : "+ethXPub);

const btcClient = new BtcClient({
  protocol: 'http',
  user: 'Ulysseys',
  pass: '8WcG3aNq5ApB37dH93KFDzts4jp9h5Cp',
  host: '35.189.162.231',
  port: '8332',
});
