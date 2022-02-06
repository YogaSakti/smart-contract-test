/* eslint-disable no-loss-of-precision */
/* eslint-disable no-sync */
/* eslint-disable max-statements-per-line */
const Web3 = require('web3');
const web3 = new Web3(' RINKEBY RPC ');
const fetch = require('node-fetch')


// {
//     accounts : [
//         {
//             address,
//             privateKey
//         }
//     ]
// }

let { accounts } = require('./wallet.json');

// eslint-disable-next-line quotes
const mintB = [{ "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }, { "internalType": "bytes", "name": "_signature", "type": "bytes" }], "name": "mintGroupB", "outputs": [], "stateMutability": "payable", "type": "function" }];
// eslint-disable-next-line quotes
const mintA = [{ "inputs": [{ "internalType": "bytes", "name": "_signature", "type": "bytes" }], "name": "mintGroupA", "outputs": [], "stateMutability": "nonpayable", "type": "function" }];
const contractAddress = ' SMART CONTRACT ';
const contract = new web3.eth.Contract(mintA, contractAddress);

(async () => {
    for (let index = 0; index < accounts.length; index++) {
        const { address, privateKey } = accounts[index];
        console.log(`Attempting to make transaction from ${address}`);
        const getData = await fetch(`SIGNATURE URL ${address}`, { method: 'GET', headers: { accept: 'application/json' } })
        const { data } = await getData.json()
        console.log(`Address: ${address} | Eligible: ${data.amount}`);
        const nonce = await web3.eth.getTransactionCount(address, 'latest');

        const signedTx = await web3.eth.accounts.signTransaction({
            from: address,
            to: contractAddress,
            nonce,
            // value: web3.utils.toWei((parseFloat('0.06') * data.amount).toString(), 'ether'),
            gas: '125000',
            // data: contract.methods.mintGroupB(data.amount ,data.signature).encodeABI()
            data: contract.methods.mintGroupA(data.signature).encodeABI()
        }, privateKey)

        web3.eth.sendSignedTransaction(signedTx.rawTransaction, (error, hash) => {
            if (!error) {
                console.log('🎉 The hash of your transaction is: ', hash);
            } else {
                console.log('❗Something went wrong while submitting your transaction:', error)
            }
        })
    }
})()