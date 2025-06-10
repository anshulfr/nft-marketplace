import React, {
  useEffect,
  useState,
  useCallback,
  useContext,
  useMemo,
} from "react";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useRouter } from "next/router";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { useTheme } from "next-themes";
import toast from "react-hot-toast";
import axios from "axios";

//INTERNAL IMPORT
import { NFTContext } from "../context/NFTContext";
import {
  Button,
  Input,
  Loader,
  Banner,
  Notify,
  GlobalLoader,
} from "../components/index";
import images from "../assets";

const PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY;
const PINATA_SECRECT_KEY = process.env.NEXT_PUBLIC_PINATA_SECRECT_KEY;
const PINATA_IPFS_URL = process.env.NEXT_PUBLIC_PINATA_IPFS_URL;
const TOKEN_SYMBOL = process.env.NEXT_PUBLIC_TOKEN_SYMBOL;

const CreateItem = () => {
  const { theme } = useTheme;
  const router = useRouter();

  const { createSale, isLoadingNFT } = useContext(NFTContext);

  const [fileUrl, setFileUrl] = useState(null);
  const [fileType, setFileType] = useState("Image");
  const [loader, setLoader] = useState(false);
  const [formInput, updateFormInput] = useState({
    price: "",
    name: "",
    description: "",
    category: "",
    tokenPrice: "",
  });

  const notifyError = (msg) => toast.error(msg, { duration: 3000 });
  const notifySuccess = (msg) => toast.success(msg, { duration: 3000 });
  const notifyCustom = (image, message) =>
    toast.custom(<Notify image={image} message={message} toast={toast} />, {
      duration: 2000,
    });

  const uploadToPinata = async (file) => {
    try {
      setLoader(true);
      notifyCustom("loader.gif", "Uploading To IPFS...");

      const formData = new FormData();
      formData.append("file", file);

      const response = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: formData,
        headers: {
          pinata_api_key: PINATA_API_KEY, // YOUR_API_KEY
          pinata_secret_api_key: PINATA_SECRECT_KEY, // SECRET_KEY
          "Content-Type": "multipart/form-data",
        },
      });
      const ImgHash = `${PINATA_IPFS_URL}${response.data.IpfsHash}`;
      setFileUrl(ImgHash);
      setLoader(false);
      notifyCustom(ImgHash, "NFT upload completed");
    } catch (error) {
      console.log("Error uploading file", error);
      setLoader(false);
      notifyCustom("failed.png", `Pinata API Key Error: ${error.message}`);
    }
  };

  const onDrop = useCallback(async (acceptedFile) => {
    await uploadToPinata(acceptedFile[0]);
  }, []);

  const {
    getInputProps,
    getRootProps,
    isDragAccept,
    isDragActive,
    isDragReject,
  } = useDropzone({ onDrop, maxSize: 500000000000 });

  const fileStyle = useMemo(
    () =>
      `dark:bg-nft-black-1 bg-white dark:border-white border-nft-gray-2 flex flex-col items-center p-5 rounded-sm border-dashed ${
        isDragActive ? "border-file-active" : ""
      }  ${isDragAccept ? "border-file-accept" : ""}
      ${isDragReject ? "border-file-reject" : ""}`,
    [isDragAccept, isDragActive, isDragReject]
  );

  //YOU HAVE TO REPLACE WITH YOUR PINATA API KEY & SECRET KEY
  //--BECAUSE THE API KEYS IS PROVIDED IT MIGHT NOT WORK IN FUTURE BECAUSE OF LIMITED ACCESS

  const createMarket = async () => {
    const { name, description, price, category, tokenPrice } = formInput;

    if (!name || !description || !price || !fileUrl || !category || !tokenPrice)
      return notifyCustom("failed.png", "Provide all the NFT details");

    setLoader(true);
    notifyCustom("loader.gif", "Uploading MetaData To IPFS...");

    //UPLOAD TO IPFS
    const data = JSON.stringify({
      name,
      description,
      category,
      image: fileUrl,
    });

    try {
      const response = await axios({
        method: "POST",
        url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        data: data,
        headers: {
          pinata_api_key: PINATA_API_KEY, // YOUR_API_KEY
          pinata_secret_api_key: PINATA_SECRECT_KEY, // SECRET_KEY
          "Content-Type": "application/json",
        },
      });

      const url = `${PINATA_IPFS_URL}${response.data.IpfsHash}`;
      console.log(url);

      notifyCustom(fileUrl, "Uploading MetaData Successfully");

      const transaction = await createSale(
        url,
        formInput.price,
        formInput.tokenPrice
      );
      if (transaction) {
        setLoader(false);
        notifyCustom("success.png", "NFT Successfully Created");
        router.push("/");
      }
    } catch (error) {
      console.log("Error uploading file", error);
      setLoader(false);
      notifyCustom("failed.png", `Pinata API Key Error: ${error.message}`);
    }
  };

  // if (isLoadingNFT) {
  //   return (
  //     <div className="flexCenter" style={{ height: "51vh" }}>
  //       <Loader />
  //     </div>
  //   );
  // }

  // console.log(formInput);

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-3/5 md:w-full">
        <Banner
          name={<> Create new item</>}
          childStyles="md:text-4xl sm:text-2xl xs:text-xl text-left"
          parentStyle="justify-start mb-7 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded"
        />
        <h1 className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl mt-10">
          Select Category
        </h1>

        <div className="mt-7 w-full flex flex-wrap place-content-between md:justify-center gap-x-5">
          <Button
            btnName={"Image"}
            btnType={"primary"}
            classStyle={`rounded sm:mt-4  ${
              formInput.category == "Image" && "active_gray"
            }`}
            handleClick={(e) => (
              setFileType(e.target.innerText),
              updateFormInput({ ...formInput, category: e.target.innerText })
            )}
          />
          <Button
            btnName={"Audio"}
            btnType={"primary"}
            classStyle={`rounded sm:mt-4  ${
              formInput.category == "Audio" && "active_gray"
            }`}
            handleClick={(e) => (
              setFileType(e.target.innerText),
              updateFormInput({ ...formInput, category: e.target.innerText })
            )}
          />
          <Button
            btnName={"Video"}
            btnType={"primary"}
            onClick={() => setFileType("Video")}
            classStyle={`rounded sm:mt-4  ${
              formInput.category == "Video" && "active_gray"
            }`}
            handleClick={(e) => (
              setFileType(e.target.innerText),
              updateFormInput({ ...formInput, category: e.target.innerText })
            )}
          />
        </div>

        <div className="mt-16">
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
            Upload file
          </p>

          <div className="mt-4">
            <div {...getRootProps()} className={fileStyle}>
              <input {...getInputProps()} />
              <div className="flexCenter flex-col text-center">
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
                  JPG, PNG, GIF, SVG , WEBM, MP3, MP4, Max 100mb
                </p>

                <div className="my-12 w-full flex justify-center">
                  <Image
                    src={images.upload}
                    width={100}
                    height={100}
                    objectFit="contain"
                    alt="upload"
                    className={theme == "light" ? "filter invert" : undefined}
                  />
                </div>
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm">
                  Drag and Drop File
                </p>
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm mt-2">
                  Or browse media on your device
                </p>
              </div>
            </div>

            {/* //LOAD COMPONENT */}

            {fileUrl && (
              <aside>
                <div>
                  {fileType === "Image" ? (
                    <img src={fileUrl} alt="ASSET_FILE" alt="" />
                  ) : fileType === "Video" ? (
                    <video
                      src={fileUrl}
                      color="#705df2"
                      className="createPageVideo"
                      controls
                    ></video>
                  ) : (
                    <audio controls className="createPagePlayer changePosition">
                      <source src={fileUrl} type="audio/ogg" />
                      <source src={fileUrl} type="audio/mpeg" />
                      Your browser dose not support the audio tag
                    </audio>
                  )}
                </div>
              </aside>
            )}
          </div>
        </div>

        {/* //INPUT COMPONENT */}
        <Input
          inputType={"input"}
          title={"Name"}
          placeholder={"Asset Name"}
          handleClick={(e) =>
            updateFormInput({ ...formInput, name: e.target.value })
          }
        />
        <Input
          inputType={"textarea"}
          title={"Description"}
          placeholder={"Asset Description"}
          handleClick={(e) =>
            updateFormInput({ ...formInput, description: e.target.value })
          }
        />
        <Input
          inputType={"number"}
          title={"Price"}
          placeholder={"ether price"}
          handleClick={(e) =>
            updateFormInput({ ...formInput, price: e.target.value })
          }
        />
        <Input
          inputType={"number"}
          title={"Native token price"}
          placeholder={TOKEN_SYMBOL}
          cryptoToken={TOKEN_SYMBOL}
          handleClick={(e) =>
            updateFormInput({ ...formInput, tokenPrice: e.target.value })
          }
        />

        <div className="mt-7 w-full flex justify-end">
          <Button
            btnName={"Create Item"}
            btnType={"primary"}
            classStyle={"rounded"}
            handleClick={createMarket}
          />
        </div>
      </div>
      {loader && <GlobalLoader />}
      {/* {isLoadingNFT && <GlobalLoader />} */}
    </div>
  );
};

export default CreateItem;
