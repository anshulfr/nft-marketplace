require("@nomiclabs/hardhat-waffle");

const NEXT_PUBLIC_RPC_URL = "https://rpc.ankr.com/eth_holesky";
const NEXT_PUBLIC_PRIVATE_KEY =
  "f2211d726b37710b750fa80da41f73172853fa2ac82181aca2ff4233e3c6ce9f";

module.exports = {
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  networks: {
    hardhat: {
      chainId: 31337,
    },
  },
};

// module.exports = {
//   solidity: {
//     version: "0.8.4",
//     settings: {
//       optimizer: {
//         enabled: true,
//         runs: 1000,
//       },
//     },
//   },
//   defaultNetwork: "eth",
//   networks: {
//     hardhat: {},
//     holesky: {
//       url: NEXT_PUBLIC_RPC_URL,
//       accounts: [`0x${NEXT_PUBLIC_PRIVATE_KEY}`],
//       gas: 12000000,
//     },
//   },
// };
