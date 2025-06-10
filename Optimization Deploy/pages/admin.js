import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";

//INTERNAL IMPORT
import {
  AdminSideBar,
  AdminDashbord,
  AdminNFTs,
  AdminCharity,
  AdminCreator,
  AdminToken,
  AdminCommunity,
  AdminAuction,
  AdminTransfer,
  AdminFeedback,
  AdminFunction,
  OnlyAdmin,
  setNftListingFees,
  GlobalLoader,
} from "../components/index";
import { NFTContext } from "../context/NFTContext";
import { getCreators } from "../utils/getTopCreators";

const ADMIN = process.env.NEXT_PUBLIC_ADMIN_ADDRESS;

const admin = () => {
  const {
    fetchNFTs,
    communityAllUser,
    loadTransferHistory,
    loadSupportData,
    allDonorList,
    tokenHolders,
    fetchAuctionNFTs,
    widthdraw,
    nftContractBalance,
    nftWithdraw,
    donationBalance,
    nftListingFees,
    currentAccount,
    updateNFTListingFee,
    INITAIL_NFTMARKETPLACE,
    INITIAL_DONATION,
    INITIAL_TOKENSALE,
    checkIfWalletConnected,
  } = useContext(NFTContext);

  //STATE VARIABLE
  const [nfts, setNfts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userLists, setUserLists] = useState([]);
  const [activeMenu, setActiveMenu] = useState("Dashbord");
  const [auctionNFTs, setAuctionNFTs] = useState([]);
  const [allTransferHistory, setAllTransferHistory] = useState([]);
  const [allSupportMsg, setAllSupportMsg] = useState([]);

  // const adminAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
  // const adminAddress = "0xb309098bcB51E5C687a16FA41bD6055f47c9eBb0";
  // const adminAddress = "0x574360D21c14eB65e892C81aEE59F06f0171A792";

  //CALLING FUNCTION
  useEffect(() => {
    const loadNFTs = async () => {
      checkIfWalletConnected();
      setIsLoading(true);
      fetchNFTs().then((item) => {
        setNfts(item?.reverse());
        console.log(item?.reverse());
      });

      fetchAuctionNFTs().then((items) => {
        setAuctionNFTs(items);
      });

      loadTransferHistory().then((items) => {
        setAllTransferHistory(items);
      });

      loadSupportData().then((items) => {
        setAllSupportMsg(items);
      });
      INITIAL_TOKENSALE();
      INITIAL_DONATION();
      communityAllUser().then((items) => {
        setUserLists(items);
        setIsLoading(false);
      });
    };
    loadNFTs();
  }, [currentAccount]);

  //CREATE DATA
  const creators = nfts == undefined ? [] : getCreators(nfts);

  //FILTER BASED ON CATEGORY
  const nftImage = [];
  const nftAudio = [];
  const nftVideo = [];

  if (nfts?.length) {
    nfts?.map((el) => {
      if (el.category == "Image") {
        nftImage.push(el);
      } else if (el.category == "Audio") {
        nftAudio.push(el);
      } else {
        nftVideo.push(el);
      }
    });
  }

  return (
    <div className="flex dark:bg-[#1a1a1a] min-h-screen">
      {ADMIN.toLowerCase() == currentAccount?.toLowerCase() ? (
        <>
          <AdminSideBar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

          {activeMenu == "Dashbord" ? (
            <AdminDashbord
              nftImage={nftImage}
              nftAudio={nftAudio}
              nftVideo={nftVideo}
              creators={creators}
              nftLength={nfts}
              userListsLength={userLists}
              allTransferHistoryLength={allTransferHistory}
              allSupportMsgLength={allSupportMsg}
              allDonorListLength={allDonorList}
              tokenHoldersLength={tokenHolders}
              auctionNFTInfoLength={auctionNFTs}
            />
          ) : activeMenu == "NFTs" ? (
            <AdminNFTs
              nftImage={nftImage}
              nftAudio={nftAudio}
              nftVideo={nftVideo}
              currentAccount={currentAccount}
            />
          ) : activeMenu == "Community" ? (
            <AdminCommunity creators={userLists} />
          ) : activeMenu == "Charity" ? (
            <AdminCharity allDonorList={allDonorList} />
          ) : activeMenu == "Creator" ? (
            <AdminCreator creators={creators} />
          ) : activeMenu == "Token" ? (
            <AdminToken />
          ) : activeMenu == "Auction" ? (
            <AdminAuction />
          ) : activeMenu == "Transfer" ? (
            <AdminTransfer />
          ) : activeMenu == "Function" ? (
            <AdminFunction
              widthdraw={widthdraw}
              nftContractBalance={nftContractBalance}
              nftWithdraw={nftWithdraw}
              donationBalance={donationBalance}
              nftListingFees={nftListingFees}
              setNftListingFees={setNftListingFees}
              updateNFTListingFee={updateNFTListingFee}
              setIsLoading={setIsLoading}
              INITAIL_NFTMARKETPLACE={INITAIL_NFTMARKETPLACE}
              INITIAL_DONATION={INITIAL_DONATION}
              currentAccount={currentAccount}
            />
          ) : (
            <AdminFeedback />
          )}

          {isLoading && <GlobalLoader />}
        </>
      ) : (
        <OnlyAdmin />
      )}
    </div>
  );
};

export default admin;
