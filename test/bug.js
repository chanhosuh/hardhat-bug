const { expect } = require("chai");
const hre = require("hardhat");
const { ethers } = hre;

// Account used on Mainnet to deploy contracts
const MAINNET_DEPLOYER =
  "0x720edBE8Bb4C3EA38F370bFEB429D715b48801e3";
// Address of the contract created on the first
// transaction from above account
const DEPLOYED_MAINNET_ADDRESS =
  "0xFbF6c940c1811C3ebc135A9c4e39E042d02435d1";


describe("MWE for hardhat bug", () => {

  it("Deployed address should depend only on impersonated account and its nonce", async () => {
    // impersonate an address which we know from Mainnet deployed
    // a contract as its first transaction so we know the correct
    // address
    await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [MAINNET_DEPLOYER],
    });
    const impersonatedSigner = await ethers.getSigner(MAINNET_DEPLOYER);

    // fund the impersonated account so it can deploy
    const deployer = await ethers.getSigner()
    await deployer.sendTransaction({
        to: impersonatedSigner.address,
        value: ethers.utils.parseEther("1")
    });

    // check nonce is zero
    expect(await ethers.provider.getTransactionCount(impersonatedSigner.address)).to.equal(0);

    // deploy
    const DummyFactory = await ethers.getContractFactory("Dummy");
    const dummy = await DummyFactory.connect(impersonatedSigner).deploy();

    // check nonce is 1
    expect(await ethers.provider.getTransactionCount(impersonatedSigner.address)).to.equal(1);

    // check the deployed address against correct address
    // this works on Hardhat 2.5.0 (and before) but not on 2.6.x
    expect(dummy.address).to.equal(DEPLOYED_MAINNET_ADDRESS);
  });

})
