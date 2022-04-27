const { ethers } = require("hardhat");

async function main() {
    const [owner] = await ethers.getSigners();

    const NFT_Token = await ethers.getContractFactory("NftToken");
    const nftToken = await NFT_Token.deploy();
    await nftToken.deployed();

    console.log("NFT_Token deployed at: ", nftToken.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.log(error);
        process.exit(1);
    });
