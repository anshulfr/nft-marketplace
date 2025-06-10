import React, { useState, useEffect, useContext } from "react";

//INTERNAL IMPORT
import { Input } from "../index";
import { NFTContext } from "../../context/NFTContext";

const Member = ({ setMembership }) => {
  const { donate, currentAccount, connectWallet } = useContext(NFTContext);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = () => {
    setIsPlaying(true);
  };

  return (
    <div className="flexCenter fixed inset-0 z-10 bg-overlay-black animated fadeIn">
      <div className="relative flex flex-col items-center max-w-lg gap-4 p-6 rounded-md shadow-md sm:py-12 sm:px-12 bg-[#1a1a1a] first:text-gray-100">
        <button
          onClick={() => setMembership(false)}
          className="absolute top-2 right-2"
        >
          X
        </button>
        <h2 className="text-2xl font-semibold leadi tracki">
          Crypto King Membership
        </h2>

        {!isPlaying && (
          <img
            onClick={handleClick}
            src={"/player.jpg"}
            alt="Video Thumbnail"
            className="w-full h-72 object-cover cursor-pointer"
          />
        )}

        {isPlaying && (
          <>
            <video className="w-full" controls autoPlay>
              <source
                src="https://movieapp.nyc3.digitaloceanspaces.com/Pro%20Blockchain%20Course.mp4"
                type="video/mp4"
              />
              Your browser dose not support the video tag
            </video>
          </>
        )}

        <p className="flex-1 text-center dark:text-gray-400">
          Joinour community today and unlock exclusive benefits! Click here to
          become Crypto King member
        </p>

        {currentAccount ? (
          <button
            onClick={() => donate("0.001")}
            type="button"
            className="px-8 py-3 font-semibold rounded-full bg-[#705DF2] text-[#fff]"
          >
            Join Membership
          </button>
        ) : (
          <button
            onClick={() => connectWallet()}
            type="button"
            className="px-8 py-3 font-semibold rounded-full bg-[#705DF2] text-[#fff]"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
};

export default Member;
