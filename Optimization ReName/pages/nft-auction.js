import React, { useEffect, useState, useContext } from "react";

//INTERNAL IMPORT
import {
  NFTCard,
  Loader,
  Title,
  GlobalLoader,
  Banner,
  SideBar,
  VideoIco,
  ImageIco,
  AudioIco,
  SaleNotification,
} from "../components/index";
import { NFTContext } from "../context/NFTContext";

const nftAuction = () => {
  const { fetchAuctionNFTs, currentAccount } = useContext(NFTContext);

  const [fetchAuctionNFT, setFetchAuctionNFT] = useState([]);
  const [loader, setLoader] = useState(false);
  const [activeMenu, setActiveMenu] = useState("image");

  // useEffect(() => {
  //   fetchAuctionNFTs().then((items) => {
  //     setFetchAuctionNFT(items?.reverse()), setIsLoading(false);
  //   });
  // }, []);

  useEffect(() => {
    const loadNFTs = async () => {
      if (!currentAccount) return;

      try {
        setLoader(true);
        const items = await fetchAuctionNFTs();
        console.log(items);
        setFetchAuctionNFT(items?.reverse() || []);
        setLoader(false);
      } catch (error) {
        console.log("Failed to fetch NFTs", error);
      } finally {
        setLoader(false);
      }
    };
    loadNFTs();
  }, [currentAccount]);

  //FILTER BASED ON CATEGORY
  const nftImage = [];
  const nftAudio = [];
  const nftVideo = [];

  if (fetchAuctionNFT?.length) {
    fetchAuctionNFT?.map((el) => {
      if (el.category == "Image") {
        nftImage.push(el);
      } else if (el.category == "Audio") {
        nftAudio.push(el);
      } else {
        nftVideo.push(el);
      }
    });
  }

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
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-full minmd:w-4/5">
        <Banner
          name={
            <>
              {" "}
              Top NFTS for Auction, <br /> Mintify{" "}
            </>
          }
          childStyles={"md:text-4xl sm:text-2xl xs:text-xl text-left"}
          parentStyle={
            "justify-start mb-7 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-xl"
          }
        />

        {/* CARD */}

        {!nftImage.length ? (
          <div className="mt-10 p-7 rounded-lg shadow-lg bg-[#705DFc] max-auto block">
            <img src="/cryptoking.jpg" alt="Crypto King" />
          </div>
        ) : (
          <div className="flex dark:bg-[#1a1a1a] min-h-screen">
            <SideBar
              categoryMenu={categoryMenu}
              setActiveMenu={setActiveMenu}
              activeMenu={activeMenu}
            />
            <div className="mt-10 p-20">
              {/* IMAGE */}
              {activeMenu == "image" && (
                <>
                  <div className="flexBetween mx-4 xs:mx-0 minlg:mx-8 sm:flex-col sm:items-start">
                    <h1 className="flex-1 font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold sm:mb-4">
                      Top Image NFTs
                    </h1>
                  </div>

                  <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">
                    {nftImage.map((nft) => (
                      <NFTCard
                        key={nft.tokenId}
                        nft={nft}
                        currentAccount={currentAccount}
                      />
                    ))}
                  </div>
                </>
              )}

              {activeMenu == "video" && (
                <>
                  {/* //AUDIO */}
                  {nftAudio.length ? (
                    <>
                      <Title title={"Audio"} styleClass={"mt-24 mb-12"} />

                      <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">
                        {nftAudio.map((nft) => (
                          <NFTCard
                            key={nft.tokenId}
                            nft={nft}
                            currentAccount={currentAccount}
                          />
                        ))}
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </>
              )}

              {activeMenu == "audio" && (
                <>
                  {/* //AUDIO */}
                  {nftVideo.length ? (
                    <>
                      <Title title={"Video"} styleClass={"mt-24 mb-12"} />

                      <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">
                        {nftVideo.map((nft) => (
                          <NFTCard
                            key={nft.tokenId}
                            nft={nft}
                            currentAccount={currentAccount}
                          />
                        ))}
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
      {loader && <GlobalLoader />}
      <SaleNotification />
    </div>
  );
};

export default nftAuction;
