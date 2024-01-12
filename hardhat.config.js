require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
const privateKey = "10ec8097f71a32b2e9be59497310333f016258117a97eb6cd175689def1ac81d";

module.exports = {
  networks: {
    bsc: {  // Đặt tên mạng là bscTestnet hoặc bất kỳ tên nào bạn muốn
      url: "https://data-seed-prebsc-1-s1.binance.org:8545/",  // URL của BSC testnet
      accounts: [privateKey],
    },
  },
  solidity: "0.8.19",
};