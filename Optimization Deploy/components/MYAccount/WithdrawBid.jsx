import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";

///INTERNAL IMPORT
import { NFTContext } from "../../context/NFTContext";
import {
  Loader,
  Button,
  GlobalLoader,
  NFTBidCard,
} from "../../components/index";
import images from "../../assets";
import { shortenAddress } from "../../utils/shortenAddress";

const WithdrawBid = ({ setConfirmBid }) => {
  const { getUserBids, withdrawBid, currentAccount, fetchAuctionNFTs } =
    useContext(NFTContext);
  const [userBids, setUserBids] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   getUserBids().then((item) => {
  //     setUserBids(item);
  //     setIsLoading(false);
  //   });
  // }, []);

  useEffect(() => {
    const loadNFTs = async () => {
      if (!currentAccount) return;

      try {
        setIsLoading(true);
        const items = await getUserBids();
        const userAuctions = await fetchAuctionNFTs();

        // console.log(items);
        // console.log(userAuctions);

        //FILTER AND COMBINE DATA FROM BOTH ARRAYS
        const combinedNFTs = items
          ?.filter((item) =>
            userAuctions.some((auction) => auction.tokenId === item.tokenId)
          )
          .map((item) => {
            //FIND THE MATCHING AUCTION NFT
            const machingAuction = userAuctions.find(
              (auction) => auction.tokenId === item.tokenId
            );

            //COMBAINE DATA FROM BOTH
            return {
              ...item,
              nft: machingAuction,
            };
          });

        console.log(combinedNFTs);

        setUserBids(combinedNFTs?.reverse() || []);

        setIsLoading(false);
      } catch (error) {
        console.log("Failed to fetch NFTs", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadNFTs();
  }, [currentAccount]);

  if (isLoading) {
    return (
      // <div className="flexStart min-h-screen">
      //   <Loader />
      // </div>
      <GlobalLoader />
    );
  }

  return (
    <>
      {!isLoading && userBids?.length === 0 ? (
        <div className="flexCenter sm:p-4 p-16  pt-24">
          <h1 className="font-poppins dark:text-white text-nft-black-1 text-3xl font-extrabold">
            Sorry you have not bid in any NFTs
          </h1>
        </div>
      ) : (
        <div className="pt-24">
          {userBids?.map((nft, i) => (
            <NFTBidCard nft={nft} i={i} setConfirmBid={setConfirmBid} />
          ))}
        </div>
      )}
    </>
  );
};

export default WithdrawBid;
