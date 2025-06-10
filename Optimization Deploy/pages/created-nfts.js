import React, { useEffect, useState, useContext } from "react";

//INTERNAL IMPORT
import { NFTContext } from "../context/NFTContext";
import {
  Loader,
  NFTCard,
  GlobalLoader,
  Banner,
  SideBar,
  VideoIco,
  ImageIco,
  AudioIco,
  SaleNotification,
} from "../components/index";

const createdNFTs = () => {
  const { fetchMyNFTsOrCreatedNFTs, currentAccount } = useContext(NFTContext);
  const [nfts, setNfts] = useState([]);
  const [loader, setLoader] = useState(false);
  const [activeMenu, setActiveMenu] = useState("image");

  const nftImage = [];
  const nftAudio = [];
  const nftVideo = [];

  // useEffect(() => {
  //   fetchMyNFTsOrCreatedNFTs("fetchItemsListed").then((items) => {
  //     setNfts(items);
  //     setLoader(false);
  //   });
  // }, []);

  useEffect(() => {
    const loadNFTs = async () => {
      if (!currentAccount) return;

      try {
        setLoader(true);
        const items = await fetchMyNFTsOrCreatedNFTs("fetchItemsListed");
        console.log(items);
        setNfts(items?.reverse() || []);
        setLoader(false);
      } catch (error) {
        console.log("Failed to fetch NFTs", error);
      } finally {
        setLoader(false);
      }
    };
    loadNFTs();
  }, [currentAccount]);

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

  // if (loader && nfts?.length === 0) {
  //   return (
  //     <div className="flexCenter sm:p-4 p-16 min-h-screen">
  //       <h1 className="font-poppins data:text-white text-nft-black-1 text-3xl font-extrabold">
  //         No NFTS Listed for sale
  //       </h1>
  //     </div>
  //   );
  // }

  const categoryMenu = [
    {
      name: "Image",
      icon: <ImageIco />,
      slug: "image",
    },
    {
      name: "Audio",
      icon: <AudioIco />,
      slug: "audio",
    },
    {
      name: "Video",
      icon: <VideoIco />,
      slug: "video",
    },
  ];

  return (
    <div className="flex justify-center sm:px-4 p-12 min-h-screen">
      <div className="w-full minmd:w-4/5">
        <Banner
          name={<> All NFTs, Listed For Sale</>}
          childStyles="md:text-4xl sm:text-2xl xs:text-sl text-left"
          parentStyle="justify-start mb-7 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-xl"
        />

        <div className="flex dark:bg-[#1a1a1a] min-h-screen">
          <SideBar
            categoryMenu={categoryMenu}
            setActiveMenu={setActiveMenu}
            activeMenu={activeMenu}
          />

          <div className="mt-4">
            {currentAccount ? (
              <>
                {activeMenu == "image" ? (
                  <>
                    <h2 className="font-poppins dark:text-white text-nft-black-1 text-2xl mt-2 ml-4 sm:ml-2 font-semibold">
                      NFTs Listed for Sale
                    </h2>

                    <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">
                      {nftImage?.map((nft) => (
                        <NFTCard
                          key={`nft-${nft.tokenId}`}
                          nft={nft}
                          currentAccount={currentAccount}
                        />
                      ))}
                    </div>
                  </>
                ) : activeMenu == "audio" ? (
                  <>
                    <h2 className="font-poppins dark:text-white text-nft-black-1 text-2xl mt-2 ml-4 sm:ml-2 font-semibold">
                      NFTs Listed for Sale
                    </h2>

                    <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">
                      {nftAudio?.map((nft) => (
                        <NFTCard
                          key={`nft-${nft.tokenId}`}
                          nft={nft}
                          currentAccount={currentAccount}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="font-poppins dark:text-white text-nft-black-1 text-2xl mt-2 ml-4 sm:ml-2 font-semibold">
                      NFTs Listed for Sale
                    </h2>

                    <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">
                      {nftVideo?.map((nft) => (
                        <NFTCard
                          key={`nft-${nft.tokenId}`}
                          nft={nft}
                          currentAccount={currentAccount}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="mt-10 p-7 rounded-lg shadow-lg bg-[#705DFc] max-auto block">
                <img src="/cryptoking.jpg" alt="Crypto King" />
              </div>
            )}
          </div>
        </div>
      </div>
      {loader && <GlobalLoader />}
      <SaleNotification />
    </div>
  );
};

export default createdNFTs;
