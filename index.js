const Mnemonic = require('bip39');
const btc = require('bitcoinjs-lib');
const eth_hdkey = require('ethereumjs-wallet/hdkey');
const eth_util = require('ethereumjs-util');
const btc_rpc = require('bitcoind-rpc');

const seed = Mnemonic.mnemonicToSeed('念 疾 暴 或 熊 行 黑 垄 长 亮 绕 植 漂 伤 投');

// Bitcoin BIP49
{
  const btc_prv = btc.HDNode.fromSeedBuffer(seed).derivePath("m/49'/0'/0'/0");
  const btc_pub = btc_prv.neutered();
  console.log("BITCOIN BIP49");
  for (let i = 0; i < 8; i++) {
    const btc_prv0 = btc_prv.derive(i);
    const btc_pub0 = btc_pub.derive(i);
    const btc_add0 = btc.address.fromOutputScript(btc.script.scriptHash.output.encode(btc.crypto.hash160(btc.script.witnessPubKeyHash.output.encode(btc.crypto.hash160(btc_pub0.getPublicKeyBuffer())))));
    console.log("private key "+i+": "+btc_prv0.keyPair.toWIF());
    console.log(" public key "+i+": "+btc_pub0.getPublicKeyBuffer().toString('hex'));
    console.log("    address "+i+": "+btc_add0);
  }
  console.log();
}

// Bitcoin BIP84
{
  const btc_prv = btc.HDNode.fromSeedBuffer(seed).derivePath("m/84'/0'/0'/0");
  const btc_pub = btc_prv.neutered();
  console.log("BITCOIN BIP84");
  for (let i = 0; i < 8; i++) {
    const btc_prv0 = btc_prv.derive(i);
    const btc_pub0 = btc_pub.derive(i);
    const btc_add0 = btc.address.fromOutputScript(btc.script.witnessPubKeyHash.output.encode(btc.crypto.hash160(btc_pub0.getPublicKeyBuffer())))
    console.log("private key "+i+": "+btc_prv0.keyPair.toWIF());
    console.log(" public key "+i+": "+btc_pub0.getPublicKeyBuffer().toString('hex'));
    console.log("    address "+i+": "+btc_add0);
  }
  console.log();
}

// Ethereum BIP44
{
  const eth_prv = eth_hdkey.fromMasterSeed(seed).derivePath("m/44'/60'/0'/0");
  const eth_pub = eth_hdkey.fromExtendedKey(eth_prv.publicExtendedKey());
  console.log("ETHEREUM BIP44");
  for (let i = 0; i < 8; i++) {
    const eth_prv0 = eth_prv.deriveChild(i)._hdkey;
    const eth_pub0 = eth_pub.deriveChild(i)._hdkey;
    const eth_add0 = eth_util.pubToAddress(eth_pub0._publicKey, true);
    console.log("private key "+i+": 0x"+eth_prv0._privateKey.toString('hex'));
    console.log(" public key "+i+": 0x"+eth_pub0._publicKey.toString('hex'));
    console.log("    address "+i+": 0x"+eth_add0.toString('hex'));
  }
  console.log();
}

const rpc = new btc_rpc({
  protocol: 'http',
  user: 'Ulysseys',
  pass: '8WcG3aNq5ApB37dH93KFDzts4jp9h5Cp',
  host: '35.189.162.231',
  port: '8332',
});
