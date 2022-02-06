/* eslint-disable no-loss-of-precision */
/* eslint-disable no-sync */
/* eslint-disable max-statements-per-line */
const Web3 = require('web3');
const web3 = new Web3(' RINKEBY RPC ');

let { accounts } = require('./wallet.json');
let myAddress = ' MAIN ADDRESS ';

(async () => {
    for (let index = 0; index < accounts.length; index++) {
        const account = accounts[index];
        const balance = await web3.eth.getBalance(account.address)
        
        const gasPrice = web3.utils.toWei('1.3', 'gwei');
        const cost = 21000 * gasPrice;

        if (balance < cost) {
            console.log(`${index}. ${account.address} skiped has ${web3.utils.fromWei(balance.toString(), 'ether')} rETH`);
            continue
        }

        const sendAmount = balance - cost;
        
        console.log(`${index}. ${account.address} gonna send ${web3.utils.fromWei(sendAmount.toString(), 'ether')} rETH`);
        const createTransaction = await web3.eth.accounts.signTransaction(
            {
                from: account.address,
                to: myAddress,
                value: sendAmount,
                gas: '21000',
                gasPrice: web3.utils.toWei('1.2', 'gwei')
            },
            account.privateKey
         );

        web3.eth.sendSignedTransaction(createTransaction.rawTransaction, (error, hash) => {
            if (!error) {
                console.log(`🎉 The hash of your transaction is: ${hash}`);
            } else {
                console.log('❗Something went wrong while submitting your transaction:', error)
            }
        })
        
    }
    // batch.execute();
    

})()