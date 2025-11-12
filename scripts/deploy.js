// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.

const {hre, ethers, run, network} = require("hardhat");

async function main() {
    const args = {
        // define aruguments for deployment here
        mint_price: "10000000000000", // 0.00001 POL (very low for testing)
        max_tokens: 3,
        base_uri: "https://ipfs.io/ipfs/bafkreidr5a7hvyiilxfug2yqpbkdowcahpbsw4jszstz6iur5ae5dx7b54",
        royaltyArtist: process.env.STUNT_WALLET_ADDRESS,
        royaltyBasis: 500,
    };
    const SEIZNFTContractFactory = await ethers.getContractFactory(
        "SEIZNFTContract"
    );
    //Deploy the contract
    const SEIZNFTContract = await SEIZNFTContractFactory.deploy(
        args.mint_price,
        args.max_tokens,
        args.base_uri,
        args.royaltyArtist,
        args.royaltyBasis
    );
    console.log("Deploying...");
    await SEIZNFTContract.waitForDeployment();
    console.log("Waiting for block verification...");
    await SEIZNFTContract.deploymentTransaction().wait(15);
    let contractAddress = await SEIZNFTContract.getAddress();
    console.log(`Contract deployed to: ${contractAddress} `);
    // Verify the contract after deployment
    if (
        //we are on a live testenet and have the correct api key
        (network.config.chainId === 80002 && process.env.POLYSCAN_API_KEY) ||
       network.config.chainId === 137 && process.env.POLYSCAN_API_KEY ||
       network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY ||
       network.config.chainId === 1 && process.env.ETHERSCAN_API_KEY
    ) {
        console.log("Verifying...");
       await run("verify:verify", {
            address: contractAddress,
            constructorArguments: [
        args.mint_price,
        args.max_tokens,
        args.base_uri,
        args.royaltyArtist,
        args.royaltyBasis
            ],
        });
        console.log("Completed.");
    } else {
        console.log(
            "No verification available for hardhat network."
        );
         }
         //mint 3

         const ipfs = [
            "https://ipfs.io/ipfs/bafkreib7f5g3zv2K6j3x3p7y5uoz6h5g4u3jz4l5qz4uoz6h5g4u3jz4l5qz4",
            "https://ipfs.io/ipfs/bafkreihdwdcef7z5r6h6x3p7y5uoz6h5g4u3jz4l5qz4uoz6h5g4u3jz4l5qz4",
            "https://ipfs.io/ipfs/bafkreif2b3g3zv2k6j3x3p7y5uoz6h5g4u3jz4l5qz4uoz6h5g4u3jz4l5qz4"

         ];
         console.log("Minting 3 tokens...");
            for (let i = 0; i < 3; i++) {
                const transactionResponse = await SEIZNFTContract.mintTo(ipfs[i], { 
                    value: args.mint_price,
                });
                await transactionResponse.wait(3);
                console.log(`Token ${i + 1} completed`);
            }
}
    async function verify(contractAddress, args) {
        console.log("Verifying contract...");
        try {
            await run("verify:verify", {
                address: contractAddress,
                constructorArguments: args,
            });
        } catch (err) {
            if (err.message.toLowerCase().includes("already verified")) {
                console.log("Already verified!");
            } else {
                console.log(err);
            }
        }
    }

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});