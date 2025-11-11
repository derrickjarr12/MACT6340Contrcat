require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const POLYSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY;
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;

// change these for different networks
const ALCHEMY_URL_MAINNET = `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`;
const ALCHEMY_URL_SEPOLIA = `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`;
const ALCHEMY_URL_POLYGON = `https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`;
const ALCHEMY_URL_POLYGON_AMOY = `https://polygon-amoy.g.alchemy.com/v2/${ALCHEMY_API_KEY}`;

const STUNT_WALLET_PRIVATE_KEY = process.env.STUNT_WALLET_PRIVATE_KEY;


module.exports = {
    etherscan: {
        apiKey: {
           mainnet: ETHERSCAN_API_KEY,
           sepolia: ETHERSCAN_API_KEY,
           polygon: POLYSCAN_API_KEY,
           polygonAmoy: POLYSCAN_API_KEY,
          },
     },
     gasReporter: {
        enabled:process.env.REPORT_GAS ? true : false,
        currency: 'USD',

        token: "MATIC",
        outputFile: 'gas-report.txt',
        noColors: true,     
        

     },
     defaultNetwork: "hardhat",  //hardhat for testing, change this for different networks
        networks: {
            hardhat: {
                chainId: 31337,
            },
            polygonAmoy: {
                url: ALCHEMY_URL_POLYGON_AMOY,
                accounts: [STUNT_WALLET_PRIVATE_KEY],
                gasPrice: 35000000000,
                chainId: 80002,  // Amoy chainId is 80002 

            },
            polygon: {
                url: ALCHEMY_URL_POLYGON,
                accounts: [STUNT_WALLET_PRIVATE_KEY],
                gasPrice: 35000000000,
                chainId: 137,
            },

            sepolia: {
                url: ALCHEMY_URL_SEPOLIA,
                accounts: [STUNT_WALLET_PRIVATE_KEY],
                gasPrice: 35000000000,
                chainId: 11155111,
            },
        },
     solidity: "0.8.27", //use this exact version here and in contract to avoid certification problems
        versions: {
        settings: {
            optimizer: {
                enabled: false,  //may cause verification issues if true
            },
        },
    },
    paths: {
        sources: "./contracts",
        tests: "./test",
        cache: "./cache",
        artifacts: "./artifacts"
    },
};