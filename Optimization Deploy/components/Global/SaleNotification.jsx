import React, { useState, useEffect } from "react";
import { AlertCircle, X } from "lucide-react";
import Link from "next/link";

const productData = [
  {
    id: 1,
    name: "Creator NFT",
    price: 0.032,
    originalPrice: 0.43,
    image: "/assets/creator.png",
  },
  {
    id: 2,
    name: "Funndy NFT",
    price: 0.042,
    originalPrice: 0.143,
    image: "/assets/creator1.png",
  },
  {
    id: 3,
    name: "Time  NFT",
    price: 0.01,
    originalPrice: 0.3,
    image: "/assets/creator2.png",
  },
  {
    id: 4,
    name: "Hey NFT",
    price: 0.00001,
    originalPrice: 0.2223,
    image: "/assets/creator3.png",
  },
  {
    id: 5,
    name: "Coders NFT",
    price: 0.0005,
    originalPrice: 0.003,
    image: "/assets/creator4.png",
  },
];

const SaleNotification = () => {
  const [currentProduct, setCurrentProduct] = useState(null);
  const [isVisible, setIsVisible] = useState(true);

  const getRandomProduct = () => {
    const randomIndex = Math.floor(Math.random() * productData.length);
    return productData[randomIndex];
  };

  useEffect(() => {
    setCurrentProduct(getRandomProduct());

    const intervalId = setInterval(() => {
      setCurrentProduct(getRandomProduct(intervalId));
    }, 6000);

    return () => clearInterval(intervalId);
  }, []);

  if (!currentProduct || !isVisible) return null;

  const discountPercentage = Math.round(
    ((currentProduct.originalPrice - currentProduct.price) /
      currentProduct.originalPrice) *
      100
  );
  return (
    <Link href="/nfts/image">
      <div className={"fixed bottom-4 right-4 z-50"}>
        <div
          className={
            "bg-[#705DF2] shadow-lg rounded-lg p-4 w-72 border border-[#705DF2]"
          }
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <AlertCircle color="#705DFC" className="mr-2" />
              <h3 className="text-lg font-bold text-white">Flash Sale!</h3>
            </div>

            <button
              onClick={(e) => {
                e.preventDefault();
                setIsVisible(false);
              }}
              className="text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center">
            <img
              src={currentProduct.image}
              alt={currentProduct.name}
              className="w-20 h-20 object-cover mr-4 rounded"
            />

            <div>
              <p className="font-semibold text-white">{currentProduct?.name}</p>

              <div className="flex items-center">
                <span className="text-white font-bold mr-2">
                  ${currentProduct.price.toFixed(2)}
                </span>
                <span className="text-white line-through mr-2">
                  ${currentProduct.originalPrice.toFixed(2)}
                </span>
                <span className="bg-white text-[#705DF2] px-2 py-1 rounded text-xs">
                  ${discountPercentage} %OFF
                </span>
              </div>
            </div>
          </div>

          <div className="mt-2 text-sm text-white">
            Limited time offer! Sale ends soon.
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SaleNotification;
