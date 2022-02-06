/* eslint-disable no-loss-of-precision */
/* eslint-disable no-sync */
/* eslint-disable max-statements-per-line */
const Web3 = require('web3');
const web3 = new Web3(' RINKEBY RPC ');

let { accounts } = require('./wallet.json');
let [address, privKey] = ['', '']

const main = async () => {
    for (let index = 0; index < accounts.length; index++) {
        const account = accounts[index];
        console.log(`${index}. Attempting to make transaction from ${address} to ${account.address}`);
        const nonce = await web3.eth.getTransactionCount(address, 'latest');
        const createTransaction = await web3.eth.accounts.signTransaction(
            {
                from: address,
                to: account.address,
                value: web3.utils.toWei('0.18', 'ether'),
                nonce,
                gas: '210000'
                
            },
            privKey
         );


        web3.eth.sendSignedTransaction(createTransaction.rawTransaction, (error, hash) => {
            if (!error) {
                console.log(`🎉 The hash of your transaction is: ${hash}`);
            } else {
                console.log('❗Something went wrong while submitting your transaction:', error)
            }
        })
        
    }
    
}

main();