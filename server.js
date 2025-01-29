const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { Web3 } = require('web3');
const HttpProvider = require('web3-providers-http').HttpProvider;

const web3 = new Web3(new HttpProvider('https://sepolia.infura.io/v3/INFURA_APIKEY')); // Use Sepolia testnet

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html for the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Web3 Configuration
const fundingAccount = '0xACCOUNT_ADDESS'; // Replace with your funding account address
const privateKey = 'PRIVATE_KEY'; // Replace with your private key

// Replacer function to handle BigInt serialization
const replacer = (key, value) =>
  typeof value === 'bigint' ? value.toString() : value;

// Endpoint to perform blockchain transaction
app.post('/api/transfer', async (req, res) => {
  const { amount, walletAddress } = req.body;

  try {
    // Get the current gas price
    const gasPrice = await web3.eth.getGasPrice();

    // Get the nonce for the funding account
    const nonce = await web3.eth.getTransactionCount(fundingAccount, 'pending');

    // Create Ethereum transaction
    const tx = {
      from: fundingAccount,
      to: walletAddress,
      value: web3.utils.toWei(amount, 'ether').toString(), // Convert to string
      gas: 21000,  // Default gas limit for sending Ether
      gasPrice: gasPrice.toString(), // Convert to string
      nonce: nonce.toString(), // Convert to string
    };

    // Sign the transaction using private key
    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    res.json({ message: 'Transaction successful', receipt });
  } catch (err) {
    if (err.message.includes('insufficient funds')) {
      res.status(500).json({ error: 'Insufficient funds for the transaction' });
    } else if (err.message.includes('gas required exceeds allowance')) {
      res.status(500).json({ error: 'Gas limit too low' });
    } else if (err.message.includes('Transaction has been reverted by the EVM')) {
      res.status(500).json({ error: 'Transaction has been reverted by the EVM. Please check the transaction parameters and try again.' });
    } else if (err.message.includes('Do not know how to serialize a BigInt')) {
      res.status(500).json({ error: 'Serialization error: BigInt values must be converted to strings.' });
    } else {
      res.status(500).json({ error: `Transaction failed: ${err.message}` });
    }
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});