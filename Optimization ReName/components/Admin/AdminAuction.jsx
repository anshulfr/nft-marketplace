import React, { useState, useEffect, useContext } from "react";

//INTERNAL IMPORT
import { Loader, NFTCard, Title, GlobalLoader } from "../index";
import { NFTContext } from "../../context/NFTContext";
import { shortenAddress } from "../../utils/shortenAddress";

const AdminAuction = () => {
  const { fetchAuctionNFTs, currentAccount } = useContext(NFTContext);

  //STATE VARIABL
  const [nfts, setNfts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //CALLING FUNCTION
  // useEffect(() => {
  //   fetchAuctionNFTs().then((item) => {
  //     setNfts(item.reverse());
  //     setIsLoading(false);
  //   });
  // }, []);

  useEffect(() => {
    const loadNFTs = async () => {
      try {
        setIsLoading(true);

        const items = await fetchAuctionNFTs();
        setNfts(items);

        setIsLoading(false);
      } catch (error) {
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
      {!isLoading && nfts.length === 0 ? (
        <div className="flexCenter sm:p-4 p-16">
          <h1 className="font-poppins dark:text-white text-nft-black-1 text-3xl font-extrabold">
            NO NFTs owned
          </h1>
        </div>
      ) : (
        <div className="sm:px-4 p-12 w-full minmd:w-4/5 flexCenter flex-col">
          <Title title={"NFTs listed for Auction"} />
          <div className="mt-3 w-full flex flex-wrap">
            {nfts.map((nft) => (
              <NFTCard
                key={`nft-${nft.tokenId}`}
                nft={nft}
                onProfilePage
                currentAccount={currentAccount}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AdminAuction;
