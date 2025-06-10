import React, { useState, useContext, useEffect } from "react";
import Image from "next/image";

//INTERNAL IMPORT
import { NFTContext } from "../context/NFTContext";
import { shortenAddress } from "../utils/shortenAddress";
import {
  Banner,
  Button,
  OwnedNFTs,
  ListedNFTs,
  Friends,
  Auction,
  TransferFunds,
  FeedBack,
  ImageNFT,
  Audio,
  Video,
  WithdrawBid,
  SideBar,
  VideoIco,
  ImageIco,
  AudioIco,
  Dashboard,
  Document,
  Setting,
  Message,
  Folder,
  Student,
  MyDashboard,
  SingleBitNFTModal,
} from "../components/index";
import images from "../assets";

const myAccount = () => {
  const { currentAccount, checkIfWalletConnected } = useContext(NFTContext);
  const [openTab, setOpenTab] = useState("My NFTs");
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [confirmBid, setConfirmBid] = useState();

  const activeTab = (e) => {
    const value = e.target.innerText;
    setOpenTab(value);
    console.log(value);
  };

  useEffect(() => {
    checkIfWalletConnected();
  }, [currentAccount]);

  const categoryMenu = [
    {
      name: "Dashboard",
      icon: <Dashboard />,
      slug: "Dashboard",
    },
    {
      name: "My NFTs",
      icon: <ImageIco />,
      slug: "My NFTs",
    },
    {
      name: "Listed NFTs",
      icon: <AudioIco />,
      slug: "Listed NFTs",
    },
    {
      name: "Listed Auction",
      icon: <AudioIco />,
      slug: "Listed Auction",
    },
    {
      name: "Image",
      icon: <ImageIco />,
      slug: "Image",
    },
    {
      name: "Audio",
      icon: <AudioIco />,
      slug: "Audio",
    },
    {
      name: "Transfered Funds",
      icon: <Document />,
      slug: "Transfered Funds",
    },
    {
      name: "Friends",
      icon: <Student />,
      slug: "Friends",
    },
    {
      name: "FeedBack",
      icon: <Message />,
      slug: "FeedBack",
    },
    {
      name: "Withdraw Bid",
      icon: <Setting />,
      slug: "Withdraw Bid",
    },
  ];

  return (
    <div className="w-full flex justify-start items-center flex-col min-h-screen">
      <div className="w-full flexCenter flex-col">
        <Banner
          name={"Your Mintify NFTs"}
          childStyles={"text-center mb-4"}
          parentStyle={"h-80 justify-center"}
        />

        {/* <div className="flexCenter flex-col -mt-20 z-0">
          <div className="flexCenter w-40 h-40 sm:h-36 p-1 bg-nft-black-2 rounded-full">
            <Image
              src={images.creator1}
              className="rounded-full object-cover"
              objectFit="cover"
            />
          </div>
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl mt-6">
            {shortenAddress(currentAccount)}
          </p>
        </div> */}
      </div>

      <div
        className="hidden sm:block sm:px-4 p-12 w-4/5 sm:w-full minmd:w-4/5 pl-16 overflow-x-auto whitespace-nowrap"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          overflow: "auto",
        }}
      >
        <Button
          btnName={"My NFTs"}
          btnType={"primary"}
          classStyle={"mr-5 sm:mr-4 sm:mb-5  rounded"}
          handleClick={(e) => activeTab(e)}
        />
        <Button
          btnName={"Listed NFTs"}
          btnType={"primary"}
          classStyle={"mr-5 sm:mr-4 sm:mb-5  rounded"}
          handleClick={(e) => activeTab(e)}
        />
        <Button
          btnName={"Listed Auction"}
          btnType={"primary"}
          classStyle={"mr-5 sm:mr-4 sm:mb-5  rounded"}
          handleClick={(e) => activeTab(e)}
        />
        <Button
          btnName={"Image"}
          btnType={"primary"}
          classStyle={"mr-5 sm:mr-4 sm:mb-5  rounded"}
          handleClick={(e) => activeTab(e)}
        />
        <Button
          btnName={"Audio"}
          btnType={"primary"}
          classStyle={"mr-5 sm:mr-4 sm:mb-5  rounded"}
          handleClick={(e) => activeTab(e)}
        />
        <Button
          btnName={"Video"}
          btnType={"primary"}
          classStyle={"mr-5 sm:mr-4 sm:mb-5  rounded"}
          handleClick={(e) => activeTab(e)}
        />
        <Button
          btnName={"Transfered Funds"}
          btnType={"primary"}
          classStyle={"mr-5 sm:mr-4 sm:mb-5 rounded"}
          handleClick={(e) => activeTab(e)}
        />
        <Button
          btnName={"Friends"}
          btnType={"primary"}
          classStyle={"mt-5 sm:mt-0 mr-5 sm:mr-4  sm:mb:5 rounded"}
          handleClick={(e) => activeTab(e)}
        />
        <Button
          btnName={"FeedBack"}
          btnType={"primary"}
          classStyle={"mt-5 sm:mt-0 mr-5 sm:mr-4  sm:mb:5 rounded"}
          handleClick={(e) => activeTab(e)}
        />
        <Button
          btnName={"Withdraw Bid"}
          btnType={"primary"}
          classStyle={"mt-5 sm:mt-0 mr-5 sm:mr-4  sm:mb:5 rounded"}
          handleClick={(e) => activeTab(e)}
        />
      </div>

      <div className="w-full minmd:w-4/5 p-10 sm:p-0">
        <div className="flex dark:bg-[#1a1a1a] min-h-screen">
          <SideBar
            categoryMenu={categoryMenu}
            setActiveMenu={setActiveMenu}
            activeMenu={activeMenu}
          />

          <div className="mt-4">
            {/* //COMPONENTS */}
            {activeMenu == "My NFTs" ? (
              <OwnedNFTs />
            ) : activeMenu == "Listed NFTs" ? (
              <ListedNFTs />
            ) : activeMenu == "Listed Auction" ? (
              <Auction />
            ) : activeMenu == "Image" ? (
              <ImageNFT />
            ) : activeMenu == "Audio" ? (
              <Audio />
            ) : activeMenu == "Video" ? (
              <Video />
            ) : activeMenu == "Transfered Funds" ? (
              <TransferFunds />
            ) : activeMenu == "Friends" ? (
              <Friends />
            ) : activeMenu == "FeedBack" ? (
              <FeedBack />
            ) : activeMenu == "Dashboard" ? (
              <MyDashboard />
            ) : (
              <WithdrawBid setConfirmBid={setConfirmBid} />
            )}
          </div>
        </div>
      </div>
      {confirmBid && (
        <SingleBitNFTModal
          confirmBid={confirmBid}
          setConfirmBid={setConfirmBid}
        />
      )}
    </div>
  );
};

export default myAccount;
