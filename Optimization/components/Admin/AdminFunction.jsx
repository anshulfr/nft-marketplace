import React, { useState, useEffect } from "react";

//INTERNAL IMPORT
import { Title, Button, Input } from "../index";

const AdminFunction = ({
  widthdraw,
  nftContractBalance,
  nftWithdraw,
  donationBalance,
  nftListingFees,
  setNftListingFees,
  updateNFTListingFee,
  INITAIL_NFTMARKETPLACE,
  INITIAL_DONATION,
  setIsLoading,
  currentAccount,
}) => {
  const [listingFee, setListingFee] = useState();

  useEffect(() => {
    const loadNFTs = async () => {
      try {
        setIsLoading(true);

        const items = await INITAIL_NFTMARKETPLACE();
        const donationitems = await INITIAL_DONATION();

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    loadNFTs();
  }, [currentAccount]);

  return (
    <div className="sm:px-4 p-12 w-full minmd:w-4/5 flexCenter flex-col">
      <Title title="Only owner can call these function" />

      <div className="sm:px-4 p-12 w-full minmd:w-4/5 pl-16">
        <Button
          btnName={`Withdraw Donation Bal: ${donationBalance} ETH`}
          btnType={"primary"}
          classStyle={"mr-5 sm:mr-4 sm:mb-5 rounded"}
          handleClick={() => widthdraw()}
        />
        <Button
          btnName={`Withdraw NFT Contract Bal: ${nftContractBalance} ETH`}
          btnType={"primary"}
          classStyle={"mr-5 sm:mr-4 sm:mb-5 rounded"}
          handleClick={() => nftWithdraw()}
        />

        <Input
          inputType={"number"}
          title={"Update NFT Listing fee"}
          placeholder={`Current Fee: ${nftListingFees} ETH`}
          cryptoToken={"ETH"}
          handleClick={(e) => setListingFee(e.target.value)}
        />

        <div className="mt-7 w-full flex justify-end">
          <Button
            btnName={"Update Listing Fee"}
            btnType={"primary"}
            classStyle={"rounded"}
            handleClick={() => updateNFTListingFee(listingFee)}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminFunction;
