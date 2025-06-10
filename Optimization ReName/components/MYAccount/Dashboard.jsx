import React, { useContext, useEffect, useState } from "react";

import { NFTContext } from "../../context/NFTContext";
import { shortenAddress } from "../../utils/shortenAddress";
//INTERNAL IMPORT
import {
  Arrow,
  AdminBox,
  Add,
  ArrowDown,
  Edit,
  Read,
  Student,
  Clock,
  DashBordCard,
  TableTwo,
  Ai,
  VideoIco,
  ImageIco,
  AudioIco,
  GlobalLoader,
} from "../index";
import DashboardFriends from "./DashboardFriends";

const CURRENCY = process.env.NEXT_PUBLIC_CURRENCY;

const Dashboard = () => {
  const {
    fetchMyNFTsOrCreatedNFTs,
    fetchMyAuctionNFTs,
    currentAccount,
    GET_COMMUNITY_USER_FRIEND_LIST,
    accountBalance,
  } = useContext(NFTContext);

  //STATE VARIABLES
  const [nfts, setNfts] = useState([]);
  const [friends, setFriends] = useState([]);
  const [auctionsNfts, setAuctionsNfts] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const loadNFTs = async () => {
      if (!currentAccount) return;

      try {
        setLoader(true);

        const items = await fetchMyNFTsOrCreatedNFTs("fetchItemsListed");
        setNfts(items?.reverse() || []);
        const itemsFriends = await GET_COMMUNITY_USER_FRIEND_LIST();
        setFriends(itemsFriends?.reverse() || []);
        const itemsAuctions = await fetchMyAuctionNFTs();
        setAuctionsNfts(itemsAuctions?.reverse() || []);

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

  if (loader) {
    return (
      // <div className="flexStart min-h-screen">
      //   <Loader />
      // </div>
      <GlobalLoader />
    );
  }

  return (
    <div className="flex-grow text-[#fff] pt-24">
      <main className="p-6 sm:p-10 space-y-6">
        <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
          <div className="mr-6">
            <h1 className="text-4xl font-semibold mb-2 text-[#1a1a1a] dark:text-[#fff]">
              Dashboard
            </h1>
            <h2 className="text-[#705df2] ml-0.5">CruptoKing Nft overviews</h2>
          </div>

          <div className="flex flex-wrap items-start justify-end -mb-3">
            <button className="inline-flex px-5 py-3 text-white bg-[#705df2] hover:bg[#705df2] focus:bg-[#705df2] rounded-md ml-6 mb-3">
              <Ai />
              Ask AI
            </button>
            <button className="inline-flex px-5 py-3 text-white bg-[#705df2] hover:bg[#705df2] focus:bg-[#705df2] rounded-md ml-6 mb-3">
              <Edit />
              <a href="mailto:support@daulathussain.com">Send Email</a>
            </button>
          </div>
        </div>

        <section className="grid grid-cols-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <DashBordCard icon={<Arrow />} title="NFTs" number={nfts?.length} />
          <DashBordCard
            icon={<Clock />}
            title="Auction"
            number={auctionsNfts?.length}
          />
          <DashBordCard
            icon={<ImageIco />}
            title="Image"
            number={nftImage?.length}
          />
          <DashBordCard
            icon={<VideoIco />}
            title="Video"
            number={nftVideo?.length}
          />
          <DashBordCard
            icon={<AudioIco />}
            title="Audio"
            number={nftAudio?.length}
          />
          <DashBordCard
            icon={<ArrowDown />}
            title="Friends"
            number={friends?.length}
          />
          <DashBordCard
            icon={<Student />}
            title={CURRENCY}
            number={`${accountBalance?.slice(0, 5)}`}
          />
          <DashBordCard
            icon={<Clock />}
            title="Address"
            number={shortenAddress(currentAccount).slice(0, 5)}
          />
        </section>

        <section className="sm:hidden md:hidden grid grid-cols-2 sm:grid-cols-1 md:grid-cols-1 xl:grid-cols-4 xl:grid-rows-3 xl:grid-flow-col gap-6">
          <AdminBox nftImage={nfts} />

          <div className="flex flex-col row-span-3 dark:bg-[#222222] shadow rounded-lg">
            <div className="px-6 py-5 font-semibold dark:text-[#fff] text-[#222222]">
              Recent nft Creators list
            </div>

            <DashboardFriends
              creators={friends}
              currentAccount={currentAccount}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
