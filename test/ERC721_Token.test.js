const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("NFT_Token", () => {
    let owner;
    let buyer1;
    let buyer2;
    let buyer3;

    let NftToken;
    let nftToken;

    beforeEach(async () => {
        [owner, buyer1, buyer2, buyer3] = await ethers.getSigners();
        // Deploy the token.
        NFT_Token = await ethers.getContractFactory("NftToken");
        nftToken = await NFT_Token.deploy();
        await nftToken.deployed();
    });

    it("Owner can mint NFT", async () => {
        await nftToken.mintNFT();
        const ownerNftBalance = await nftToken.balanceOf(owner.address);
        expect(ownerNftBalance).to.equal(1);
        expect(await nftToken.ownerOf(1)).to.equal(owner.address);
    });

    it("Other buyers can mint NFTs with incrementing token ids", async () => {
        await nftToken.connect(buyer1).mintNFT();
        await nftToken.connect(buyer2).mintNFT();
        await nftToken.connect(buyer3).mintNFT();

        expect(await nftToken.balanceOf(buyer1.address)).to.equal(1);
        expect(await nftToken.ownerOf(1)).to.equal(buyer1.address);

        expect(await nftToken.balanceOf(buyer2.address)).to.equal(1);
        expect(await nftToken.ownerOf(2)).to.equal(buyer2.address);

        expect(await nftToken.balanceOf(buyer3.address)).to.equal(1);
        expect(await nftToken.ownerOf(3)).to.equal(buyer3.address);
    });

    it("A buyer can mint multiple NFTs", async () => {
        // Mint 1st NFT with id 1.
        await nftToken.mintNFT();
        expect(await nftToken.balanceOf(owner.address)).to.equal(1);
        expect(await nftToken.ownerOf(1)).to.equal(owner.address);

        // Mint 2nd NFT with id 2.
        await nftToken.mintNFT();
        expect(await nftToken.balanceOf(owner.address)).to.equal(2);
        expect(await nftToken.ownerOf(2)).to.equal(owner.address);
    });

});
