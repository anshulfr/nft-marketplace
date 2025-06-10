import React, { useState, useEffect, useContext } from "react";
import { useForm } from "@formspree/react";

import { NFTContext } from "../../context/NFTContext";

const FORMSPREE = process.env.NEXT_PUBLIC_FORMSPREE_API;

const HeroSection = ({ nftImage }) => {
  const [state, handleSubmit] = useForm(FORMSPREE);
  const { NOTIFY, currentAccount } = useContext(NFTContext);

  if (state.succeeded) {
    NOTIFY("success.png", "Thanks for Joining");
    window.location.reload();
  }

  const [currentImage, setCurrentImage] = useState(nftImage[0]);

  useEffect(() => {
    const updateImage = () => {
      const randomIndex = Math.floor(Math.random() * nftImage.length);
      setCurrentImage(nftImage[randomIndex]);
    };
    const interval = setInterval(updateImage, 3000);

    return () => clearInterval(interval);
  }, [nftImage.length]);

  return (
    <section className="rounded-xl p-6 bg-[#705dfc] text-[#ffff]">
      <div className="container grid gap-6 mx-auto text-center sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-5">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="w-full heroSection-padding px-6 py-16 rounded-md sm:px-12 md:px-16 xl:col-span-2 bg-gray-900"
        >
          <div>
            <span className="block mb-2 text-[#fff]">
              Welcome to world of NFTs
            </span>

            <h1 className="text-5xl sm:text-3xl font-extrabold dark:text-gray-50">
              Mintify Offers
            </h1>

            <p className="my-8">
              <span className="font-medium dark:text-gray-50">Offers by, </span>
              Mintify is the world's first and largest web3 marektplace for
              NFTs and crypto collectibles
            </p>

            <form onSubmit={handleSubmit} className="self-stretch space-y-3">
              <div>
                <label for="name" className="text-sm sr-only">
                  Your name
                </label>
                <input
                  type="name"
                  id="name"
                  name="name"
                  placeholder="Your name"
                  className="w-full rounded-md focus:ring focus:ri dark:border-[#705df2] p-4"
                />
              </div>

              <div>
                <label for="email" className="text-sm sr-only">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your email"
                  className="w-full rounded-md focus:ring focus:ri dark:border-[#705df2] p-4"
                />
              </div>

              <button
                type="submit"
                disabled={state.submitting}
                className="w-full py-2 font-semibold rounded bg-[#705df2] text-[#fff]"
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        {currentAccount ? (
          <img
            src={currentImage?.image}
            alt={currentImage?.name}
            className="object-cover w-full rounded-md xl:col-span-3 dark:bg-gray-500"
          />
        ) : (
          <img
            src={"cryptoking-home.png"}
            alt={"Crypto King"}
            className="object-cover w-full rounded-md xl:col-span-3 dark:bg-gray-500"
          />
        )}
      </div>
    </section>
  );
};

export default HeroSection;
