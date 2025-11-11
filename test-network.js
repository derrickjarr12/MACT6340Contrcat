const { ethers } = require("hardhat");

async function main() {
    const provider = ethers.provider;
    
    console.log("Testing Polygon Amoy Connection...\n");
    
    // Get network info
    const network = await provider.getNetwork();
    console.log("Network Name:", network.name);
    console.log("Chain ID:", network.chainId.toString());
    
    // Get latest block
    const blockNumber = await provider.getBlockNumber();
    console.log("Latest Block:", blockNumber);
    
    // Check if wallet is connected
    const [signer] = await ethers.getSigners();
    if (signer) {
        const address = await signer.getAddress();
        const balance = await provider.getBalance(address);
        console.log("\nWallet Address:", address);
        console.log("Balance:", ethers.formatEther(balance), "MATIC");
    }
    
    console.log("\n✅ Connection successful!");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("❌ Connection failed:", error);
        process.exit(1);
    });
