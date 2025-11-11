const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("SEIZNFTContract", async function () {
    let SEIZNFTContractFactory; 
    let SEIZNFTContract;
    let args = {
        mint_price: "200000000000000", //0.02 ETH
        max_tokens: 3,
        base_uri:
        "https://ipfs.io/ipfs/bafkreidr5a7hvyiilxfug2yqpbkdowcahpbsw4jszstz6iur5ae5dx7b54",
        royaltyArtist: "0x8A1b6FfD5E6E2b1c3c3b3F4D5E6E7F8G9H0I1J2K", //example address
        royaltyBasis:500,

    };

    this.beforeEach(async function () {
        SEIZNFTContractFactory = await ethers.getContractFactory(
            "SEIZNFTContract"
        );

        SEIZNFTContract = await SEIZNFTContractFactory.deploy(
            args.mint_price,
            args.max_tokens,
            args.base_uri,
            args.royaltyArtist,
            args.royaltyBasis
        );

        await SEIZNFTContract.waitForDeployment(
            args.mint_price,
            args.max_tokens,
            args.base_uri,
            args.royaltyArtist,
            args.royaltyBasis
        );
    });
    describe("construction and initialization", async function () {
        this.beforeEach(async function () {
            SEIZNFTContractFactory = await ethers.getContractFactory("SEIZNFTContract");
            SEIZNFTContract = await SEIZNFTContractFactory.deploy(
            args.mint_price,
            args.max_tokens,
            args.base_uri,
            args.royaltyArtist,
            args.royaltyBasis
            );
            await SEIZNFTContract.waitForDeployment();
            args.mint_price,
            args.max_tokens,
            args.base_uri,
            args.royaltyArtist,
            args.royaltyBasis
            );
        });
    });
    it("should be named SEIZNFTContract", async function () {
        const expectedValue = "SEIZNFTContract";
        const currentValue = await SEIZNFTContract.name();
        assert.equal(currentValue.toString(), expectedValue);
    });
    it("should have symbol SEIZ", async function () {
        const expectedValue = "SEIZ";
        const currentValue = await SEIZNFTContract.symbol();
        assert.equal(currentValue.toString(), expectedValue);
    });
    it("should have a mint price set when constructed", async function () {
        const expectedValue = args.mint_price;
        const currentValue = await SEIZNFTContract.getMintPrice();
        assert.equal(currentValue.toString(), expectedValue);
    });
    it("should have a max tokens set when constructed", async function () {
        const expectedValue = args.max_tokens;
        const currentValue = await SEIZNFTContract.getMaxSupply();
        assert.equal(currentValue.toString(), expectedValue);
    });
    it("should have a base URI set when constructed", async function () {
        const expectedValue = args.base_uri;
        const currentValue = await SEIZNFTContract.getBaseURI();
        assert.equal(currentValue.toString(), expectedValue);
    });
    it("should h royalty artist  when constructed", async function () {
        lettokenId = 1; //first token
        const expectedValue = args.royaltyArtist;
        const currentValue = await SEIZNFTContract.royaltyInfo(
            1,
            ethers.parseUnits("0.02", "ether")
        );
        assert.equal(currentValue[0].toString(), expectedValue);
    });

    it("should set royalty share when constructed", async function () {
        let tokenId = 1; //first token
        const expectedValue = args.royaltyBasis;
        const currentValue = await SEIZNFTContract.royaltyInfo(
            1,
            ethers.parseUnits("0.02", "ether")
        );
        assert.equal(currentValue[0].toString(), expectedValue);
    });
    it("should set owner to the deployer's address when constructed", async function () {
        const expectedValue = "0x8A1b6FfD5E6E2b1c3c3b3F4D5E6E7F8G9H0I1J2K"; //example address
        const currentValue = await SEIZNFTContract.owner();
        assert.equal(currentValue.toString(), expectedValue);
});
describe("receive function", async function () {
    this.beforeEach(async function () {
        SEIZNFTContractFactory = await ethers.getContractFactory(
            "SEIZNFTContract"
        );
        
        SEIZNFTContract = await SEIZNFTContractFactory.deploy(
            args.mint_price,
            args.max_tokens,
            args.base_uri,
            args.royaltyArtist,
            args.royaltyBasis
        );
        await SEIZNFTContract.waitForDeployment();
            args.mint_price,
            args.max_tokens,
            args.base_uri,
            args.royaltyArtist,
            args.royaltyBasis
        );
    });
    it("should be called and revert if called from low-level transaction", async function () {
        let contractAddress = await SEIZNFTContract.getAddress();
        const[owner, artist, buyer] = await ethers.getSigners();
        expect(
            buyer.sendTransaction({
                to: contractAddress,
                value: ethers.parseUnits("2.0", "ether"),
            }
        )
    ).to.be.revertedWithCustomError(SEIZNFTContract, "ReceiveFunctionDisabled");
    });

    describe("fallback function", async function () {
        this.beforeEach(async function () {
            SEIZNFTContractFactory = await ethers.getContractFactory(
                "SEIZNFTContract"
            );
            
            SEIZNFTContract = await SEIZNFTContractFactory.deploy(
                args.mint_price,
                args.max_tokens,
                args.base_uri,
                args.royaltyArtist,
                args.royaltyBasis
            );
            await SEIZNFTContract.waitForDeployment();
                args.mint_price,
                args.max_tokens,
                args.base_uri,
                args.royaltyArtist,
                args.royaltyBasis
});