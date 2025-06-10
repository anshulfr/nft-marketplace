import React, { useContext, useEffect, useState, useRef } from "react";

///INTERNAL IMPORT
import { NFTContext } from "../../context/NFTContext";
import {
  CreatorCard,
  Loader,
  SearchBar,
  GlobalLoader,
} from "../../components/index";
import images from "../../assets";
import { shortenAddress } from "../../utils/shortenAddress";

const Friends = () => {
  const { GET_COMMUNITY_USER_FRIEND_LIST, currentAccount } =
    useContext(NFTContext);

  //STATE VARIABLE
  const [friends, setFriends] = useState([]);
  const [friendsCopy, setFriendsCopy] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSelect, setActiveSelect] = useState("Recently added");

  // useEffect(() => {
  //   GET_COMMUNITY_USER_FRIEND_LIST().then((item) => {
  //     setFriends(item);
  //     setFriendsCopy(item);
  //     setIsLoading(false);
  //   });
  // }, []);

  useEffect(() => {
    const loadNFTs = async () => {
      if (!currentAccount) return;

      try {
        setIsLoading(true);
        const items = await GET_COMMUNITY_USER_FRIEND_LIST();
        setFriends(items?.reverse() || []);
        setFriendsCopy(items?.reverse() || []);

        setIsLoading(false);
      } catch (error) {
        console.log("Failed to fetch NFTs", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadNFTs();
  }, [currentAccount]);

  useEffect(() => {
    const sortedNfts = [...friends];

    switch (activeSelect) {
      case "Price (low to high)":
        setFriends(sortedNfts.sort((a, b) => a.price - b.price));
        break;
      case "Price (high to low)":
        setFriends(sortedNfts.sort((a, b) => b.price - a.price));
        break;
      case "Recently added":
        setFriends(sortedNfts.sort((a, b) => b.tokenId - a.tokenId));
        break;
      default:
        setFriends(friends);
        break;
    }
  }, [activeSelect]);

  const onHandleSearch = (value) => {
    const filteredNfts = friends.filter(({ name }) =>
      name.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredNfts.length === 0) {
      setFriends(nftsCopy);
    } else {
      setFriends(filteredNfts);
    }
  };

  const onClearSearch = () => {
    if (friends?.length && friendsCopy.length) {
      setFriends(friendsCopy);
    }
  };

  if (isLoading) {
    return (
      // <div className="flexStart min-h-screen">
      //   <Loader />
      // </div>
      <GlobalLoader />
    );
  }

  console.log(friends);

  return (
    <>
      {!isLoading && friends?.length === 0 ? (
        <div className="flexCenter sm:p-4 p-16  pt-24">
          <h1 className="font-poppins dark:text-white text-nft-black-1 text-3xl font-extrabold">
            Sorry you have no friends
          </h1>
        </div>
      ) : (
        <div className="sm:px-4 p-12 w-full minmd:w-4/5 flexCenter flex-col  pt-24">
          <div className="flex-1 w-full flex flex-row sm:flex-col px-4 xs:px-0 minlg:px-8">
            <SearchBar
              activeSelect={activeSelect}
              setActiveSelect={setActiveSelect}
              handleSearch={onHandleSearch}
              clearSearch={onClearSearch}
            />
          </div>

          <div className="mt-3 w-full flex flex-wrap">
            {friends?.map((friend, i) => (
              <CreatorCard
                key={friend.pubkey}
                rank={i + 1}
                creatorImage={images[`creator${i + 1}`]}
                creatorName={shortenAddress(friend.pubkey)}
                creatorEths={1}
                userName={friend.name}
                childStyles={"cursor-pointer"}
                link={{
                  pathname: "/chat",
                  query: {
                    name: `${friend.name}`,
                    address: `${friend.pubkey}`,
                    currentUser: currentAccount,
                  },
                }}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Friends;
