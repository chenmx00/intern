const Btc = require('bitcoin-core')
const Pg = require('pg').Client

const btc = new Btc({ username: 'Ulysseys', password: 'e46Crf3H9r3mQQXcd9Dky6t8x9ARf8Grf3H9r3mQQXcd9Dky6t8x9ARf8GL' })
const pg = new Pg({
  host: '35.229.170.11',
  database: 'coinfair',
  user: 'postgres',
  password: 'F4eNPF1iunlJNzt4'
})
pg.connect()

const main = async () => {
  //let blockIndex = await pg.query('select val from kv_pairs where key=\'btc_block\'')
  //blockIndex = blockIndex.rows[0]
  const txs = await btc.listTransactions('coinfair49', 10, 0)
  console.log(txs)
  for (let recipient of txs) {
    if (recipient in pg) {
      console.log(recipient)
    }
  }
  // //console.log(lastBlock)
  // //console.log(blockIndex)
  // let blockIndex
  // blockIndex = 471600
  // if (height < blockIndex)
  //   return
  // const blockHash = await btc.getBlockHash(blockIndex)
  // const block = await btc.getBlock(blockHash)
  // for (let txid of block.tx) {
  //   console.log(txid)
  //   const tx = await btc.getTransaction(txid)
  //   console.log(tx)
  // }
}

main()
