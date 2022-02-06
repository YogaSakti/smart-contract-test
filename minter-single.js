/* eslint-disable no-loss-of-precision */
/* eslint-disable no-sync */
/* eslint-disable max-statements-per-line */
const Web3 = require('web3');
const web3 = new Web3(' RINKEBY RPC ');
const fetch = require('node-fetch')

let [address, privKey] = ['', '']

// eslint-disable-next-line quotes
const mint = [{ "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "mint", "outputs": [], "stateMutability": "payable", "type": "function" }];
const contractAddress = ' SMART CONTRACT '
const contract = new web3.eth.Contract(mint, contractAddress);

(async () => {
    console.log(`Attempting to make transaction from ${address}`);
    const getData = await fetch(`SIGNATURE URL ${address}`, { method: 'GET', headers: { accept: 'application/json' } })
    const { data } = await getData.json()
    console.log(`Address: ${address} | Eligible: ${data.amount}`);
    const nonce = await web3.eth.getTransactionCount(address, 'latest');
    const signedTx = await web3.eth.accounts.signTransaction({
        from: address,
        to: contractAddress,
        nonce,
        value: web3.utils.toWei((parseFloat('0.1') * data.amount).toString(), 'ether'),
        gas: '500000',
        data: contract.methods.mint(data.amount).encodeABI()
    }, privKey)

    await web3.eth.sendSignedTransaction(signedTx.rawTransaction, (error, hash) => {
        if (!error) {
            console.log('🎉 The hash of your transaction is: ', hash);
        } else {
            console.log('❗Something went wrong while submitting your transaction:', error)
        }
    })
})()