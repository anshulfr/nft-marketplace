import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

//INTERNAL IMPORT
import { NFTContext } from "../../context/NFTContext";
import {
  NFTCard,
  Action,
  Banner,
  Title,
  GlobalLoader,
  SaleNotification,
  SideBar,
  VideoIco,
  AudioIco,
  ImageIco,
} from "../../components/index";

const nfts = () => {
  ///STATE VARIABLE
  const [nfts, setNfts] = useState([]);
  const [loader, setLoader] = useState(false);
  const [activeMenu, setActiveMenu] = useState();

  const { fetchNFTs, currentAccount } = useContext(NFTContext);

  const router = useRouter();
  const slug = router.query.category;

  const nftImage = [];
  const nftAudio = [];
  const nftVideo = [];

  // useEffect(() => {
  //   fetchNFTs().then((item) => {
  //     setNfts(item?.reverse());
  //   });
  // }, []);

  useEffect(() => {
    const loadNFTs = async () => {
      if (!currentAccount) return;

      try {
        setLoader(true);
        setActiveMenu(router.query.category);
        const items = await fetchNFTs();
        setNfts(items?.reverse() || []);
        setLoader(false);
      } catch (error) {
        console.log("Failed to fetch NFTs", error);
      } finally {
        setLoader(false);
      }
    };
    loadNFTs();
  }, [currentAccount, slug]);

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

  // console.log(nftAudio);

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
          name={<> Discover, collect and sell</>}
          childStyles="md:text-4xl sm:text-2xl xs:text-sl text-left"
          parentStyle="justify-start mb-7 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-xl"
        />
        <div className="flex dark:bg-[#1a1a1a] min-h-screen">
          <SideBar
            categoryMenu={categoryMenu}
            setActiveMenu={setActiveMenu}
            activeMenu={activeMenu}
          />

          <div className="mt-10">
            {/* IMAGE */}
            <Title title={activeMenu} />

            {/* NFT IMAGE */}
            {activeMenu == "image" && (
              <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">
                {nftImage.map((nft) => (
                  <NFTCard
                    key={nft.tokenId}
                    nft={nft}
                    currentAccount={currentAccount}
                  />
                ))}
              </div>
            )}
            {/* NFT Audio */}
            {activeMenu == "audio" && (
              <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center accountVideo">
                {nftAudio.map((nft) => (
                  <NFTCard
                    key={nft.tokenId}
                    nft={nft}
                    currentAccount={currentAccount}
                  />
                ))}
              </div>
            )}
            {/* NFT Video */}
            {activeMenu == "video" && (
              <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center accountVideo">
                {nftVideo.map((nft) => (
                  <NFTCard
                    key={nft.tokenId}
                    nft={nft}
                    currentAccount={currentAccount}
                  />
                ))}
              </div>
            )}

            <Action />
          </div>
        </div>
      </div>
      {loader && <GlobalLoader />}
      <SaleNotification />
    </div>
  );
};

export default nfts;
