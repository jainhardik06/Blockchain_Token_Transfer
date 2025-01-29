async function transferAmount() {
    const amount = document.getElementById('amount').value;
    const walletAddress = document.getElementById('walletAddress').value;
    const statusDiv = document.getElementById('status');
    const estimatedTimeDiv = document.getElementById('estimated-time');
    const transferButton = document.querySelector('button');

    // Disable the button to prevent multiple clicks
    transferButton.disabled = true;

    try {
        const response = await fetch('/api/transfer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount, walletAddress })
        });

        const data = await response.json();
        statusDiv.style.display = 'block';
        statusDiv.style.color = 'green';
        if (response.ok) {
            if (data.receipt && data.receipt.transactionHash) {
                const estimatedTime = new Date(Date.now() + 2 * 60 * 1000).toLocaleTimeString(); // Estimate 2 minutes for transaction confirmation
                statusDiv.innerHTML = `Transaction successful: ${data.message}<br>Transaction Hash: ${data.receipt.transactionHash}`;
                estimatedTimeDiv.innerHTML = `Transaction Successfull!Estimated time to receive tokens: ${estimatedTime}`;
                estimatedTimeDiv.style.display = 'block';
            } else {
                statusDiv.innerHTML = `Transaction successful: ${data.message}`;
            }
        } else {
            statusDiv.style.color = 'red';
            statusDiv.innerHTML = `Error: ${data.error}`;
            estimatedTimeDiv.innerHTML = `Transaction Successfull!<br>Estimated time to receive tokens: ${new Date(Date.now() + 2 * 60 * 1000).toLocaleTimeString()}`;
            estimatedTimeDiv.style.display = 'block';
        }
    } catch (error) {
        if (error.message.includes('Serialization error: BigInt values must be converted to strings.')) {
            throw error; // Re-throw the specific serialization error
        }
        statusDiv.style.display = 'block';
        statusDiv.style.color = 'red';
        statusDiv.innerHTML = `Error: ${error.message}`;
        estimatedTimeDiv.innerHTML = `Transaction Successful!<br>The Tokens will be Received before: ${new Date(Date.now() + 2 * 60 * 1000).toLocaleTimeString()}`;
        estimatedTimeDiv.style.display = 'block';
    }
}