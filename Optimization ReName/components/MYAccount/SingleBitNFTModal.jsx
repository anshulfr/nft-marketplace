import React, { useState, useEffect, useContext } from "react";

//INTERNAL IMPORT
import { Input, Button } from "../index";
import { NFTContext } from "../../context/NFTContext";

const CURRENCY = process.env.NEXT_PUBLIC_CURRENCY;

const SingleBidNFTModal = ({ confirmBid, setConfirmBid }) => {
  const { withdrawBid, currentAccount, connectWallet } = useContext(NFTContext);

  return (
    <div className="flexCenter fixed inset-0 z-10 bg-overlay-black animated fadeIn">
      <div className="relative flex flex-col items-center max-w-lg gap-4 p-6 rounded-md shadow-md sm:py-12 sm:px-12 bg-[#1a1a1a] first:text-gray-100">
        <button
          onClick={() => setConfirmBid("")}
          className="absolute top-2 right-2"
        >
          X
        </button>
        <h2 className="text-2xl font-semibold leadi tracki">
          {confirmBid?.nft.name}
        </h2>

        <img
          src={confirmBid?.nft.image}
          alt="nft"
          className="w-full h-72 object-cover cursor-pointer"
        />

        <p className="flex-1 text-center dark:text-gray-400">
          {confirmBid?.nft.description}
        </p>

        {Date.now() >= new Date(confirmBid?.timestamp) ? (
          <Button
            btnName={"Withdraw Bid"}
            btnType={"primary"}
            classStyle={"mr-5 sm:mr-0 sm:mb-5  rounded py-2 mt-2"}
            handleClick={() =>
              withdrawBid(confirmBid?.tokenId, confirmBid?.bidId)
            }
          />
        ) : (
          <Button
            btnName={`Bid End: ${confirmBid?.endDate}`}
            btnType={"primary"}
            classStyle={"mr-5 sm:mr-0 sm:mb-5  rounded py-2 mt-2"}
          />
        )}
      </div>
    </div>
  );
};

export default SingleBidNFTModal;
