# Blockchain Funds Transfer Project

This project allows users to transfer Ethereum from a funding account to a specified wallet address using the Sepolia testnet. The project includes a simple frontend for inputting the amount and wallet address, and a backend that handles the transaction using Web3.js.

## Description

The project consists of a frontend and a backend:
- **Frontend**: A simple HTML page with input fields for the amount and wallet address, and a button to initiate the transfer. The frontend displays the transaction status after the transfer is attempted.
- **Backend**: An Express.js server that handles the transfer request. It uses Web3.js to interact with the Ethereum blockchain and perform the transaction.

## Prerequisites

- Node.js and npm installed on your machine.
- An Infura project ID for connecting to the Sepolia testnet.
- A funding account with some ETH on the Sepolia testnet.
- The private key of the funding account.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/blockchain-transfer.git
   cd blockchain-transfer
   ```

2. Install the dependencies:
   ```sh
   npm install
   npm install express body-parser cors web3 web3-providers-http
   ```

3. Update the configuration:
   - Open 

server.js

 and replace the placeholders with your actual Infura project ID, funding account address, and private key.

## Running the Project

1. Start the server:
   ```sh
   node server.js
   ```

2. Open your web browser and navigate to `http://localhost:3000`.

3. Enter the amount and wallet address, then click "Transfer Amount" to perform the transaction.

## Project Structure

```
blockchain-transfer/
├── public/
│   ├── index.html
│   └── script.js
└── server.js
```

- **public/index.html**: The frontend HTML file.
- **public/script.js**: The frontend JavaScript file.
- **server.js**: The backend server file.

