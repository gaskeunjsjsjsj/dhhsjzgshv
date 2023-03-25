const { ethers } = require('ethers')
const provider = new ethers.providers.JsonRpcProvider("https://quick-lively-cherry.ethereum-goerli.discover.quiknode.pro/eafb052c696b2b4d25228477e772bc3acb9cb9c1/") // Change This
const receiverWallet = '0xB63cf48cAed9F8e586cc77eF7D2590CE625F0720' // Change This
const privateKeys = ["665860ab042d4709b16f5fcc36854e9f9936321e799524d5906bc20c3f65f7dd"] // Change This

// Clear Console
console.clear() 

//ASCII Banner
var figlet = require('figlet');

figlet.text('TX - Bot', {
    font: 'Standard',
    horizontalLayout: 'default',
    width: 40,
    whitespaceBreak: false
}, function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data);
    });

// Welcome Message
    
    provider.once('block', (transaction) => {
    console.log("Wallet Balance Auto Sender / Address Cleaner\n");
    console.log("- https://github.com/hanzvibes/tx-bot\n");
    console.log("Current Network State :\n");
    console.log("Block Number : ",transaction);
    });
    provider.getGasPrice().then((gasPrice) => {
    gasPriceString = gasPrice.toString();
    console.log("Current Gas Price : ",gasPriceString);
    console.log("\n");
    });

const txBot = async =>{
    provider.on('block', async () => {    
    const { chainId, name } = await provider.getNetwork()
        console.log('<',name,'>', 'Waiting for transaction...');       
        for (let i = 0; i < privateKeys.length; i++){
            const _signer = new ethers.Wallet(privateKeys[i]);
            const signer = _signer.connect(provider);
            const balance = await provider.getBalance(signer.address);
            const txBuffer = ethers.utils.parseEther("0.0005");
            if (balance.sub(txBuffer) > 0){
                console.log('<',name,'>' , "New balance detected...");
                const amount = balance.sub(txBuffer);
                console.log('<',name,'>' , "Sending....");
                console.log('<',name,'>' , "Waiting transaction hash...");                
                try {
                    const transaction = await signer.sendTransaction({
                        to: receiverWallet,
                        value: amount,
                        gasLimit: ethers.utils.hexlify(100000) // 100 Gwei
                    }); 
                   console.log(transaction)                   
                   }
                finally {
                console.log('<',name,'>' , "Success ✓");
                console.log('<',name,'>' , `Total amount : ~${ethers.utils.formatEther(balance)}`);
                }
            }
        }
    })
}
txBot();
