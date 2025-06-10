import marketAbi from "./NFTMarketplace.json";
import theBlockchainCodersAbi from "./TheBlockchainCoders.json";
import tokenSaleAbi from "./TokenSale.json";
import communityAbi from "./Community.json";
import transferFundAbi from "./TransferFunds.json";
import supportAbi from "./Support.json";
import donationAbi from "./Donation.json";

//THE BLOCKCHAINCODERS
export const THE_BLOCKCHAIN_CODER_ADDRESS =
  process.env.NEXT_PUBLIC_THEBLOCKCHAINCODERS;
export const THE_BLOCKCHAIN_CODER_ABI = theBlockchainCodersAbi.abi;

//NFT MARKETPLACE
export const NFTMARKETPLACE_ADDRESS = process.env.NEXT_PUBLIC_NFTMARKETPLACE;
export const NFTMARKETPLACE_ABI = marketAbi.abi;

//TOKEN SALE
export const TOKEN_SALE_ADDRESS = process.env.NEXT_PUBLIC_TOKENSALE;
export const TOKEN_SALE_ABI = tokenSaleAbi.abi;

//COMMUNITY
export const COMMUNITY_ADDRESS = process.env.NEXT_PUBLIC_COMMUNITY;
export const COMMUNITY_ABI = communityAbi.abi;

//TRANSFER FUND
export const TRANSFER_FUND_ADDRESS = process.env.NEXT_PUBLIC_TRANSFERFUNDS;
export const TRANSFER_FUND_ABI = transferFundAbi.abi;

//SUPPORT
export const SUPPORT_ADDRESS = process.env.NEXT_PUBLIC_SUPPORT;
export const SUPPORT_ABI = supportAbi.abi;

//DONATION
export const DONATION_ADDRESS = process.env.NEXT_PUBLIC_DONATION;
export const DONATION_ABI = donationAbi.abi;
