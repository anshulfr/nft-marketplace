import React, { useState, useEffect } from "react";

//INTERNAL IMPORT
import { Tick } from "../index";

const Feature = ({ nftImage }) => {
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
    <section className="rounded-xl mt-36 mb-36 bg-[#1a1a1a] dark:text-gray-100">
      <div className="container flex flex-col-reverse mx-auto lg:flex-row sm:flex-col md:flex-col">
        <div className="rounded-xl flex flex-col px-6 py-8 space-y-6 rounded-sm sm:p-8 lg:p-12 sm:w-full lg:w-1/2 xl:w-2/5 bg-[#705df2] text-[#fff]">
          {/* //1 */}
          <div className="flex space-x-2 sm:space-x-4">
            <Tick />
            <div className="space-y-2">
              <p className="text-lg font-medium leadi">
                Lorem ipsum dolor sit amet
              </p>
              <p className="leadi">
                tempore impedit illo velit pariatur perferendis tempora,
                exercitationem voluptatem quasi mollitia assumenda?
              </p>
            </div>
          </div>
          {/* //2 */}
          <div className="flex space-x-2 sm:space-x-4">
            <Tick />
            <div className="space-y-2">
              <p className="text-lg font-medium leadi">
                Lorem ipsum dolor sit amet
              </p>
              <p className="leadi">
                tempore impedit illo velit pariatur perferendis tempora,
                exercitationem voluptatem quasi mollitia assumenda?
              </p>
            </div>
          </div>
          {/* //3 */}
          <div className="flex space-x-2 sm:space-x-4">
            <Tick />
            <div className="space-y-2">
              <p className="text-lg font-medium leadi">
                Lorem ipsum dolor sit amet
              </p>
              <p className="leadi">
                tempore impedit illo velit pariatur perferendis tempora,
                exercitationem voluptatem quasi mollitia assumenda?
              </p>
            </div>
          </div>
        </div>

        {/* //IMAGE */}
        <div className="sm:w-full md:w-full lg:1-1/2 xl:w-3/5 dark:bg-gray-800 w-full">
          <div className="flex items-center justify-center p-4 md:p-8 lg:p-12">
            <img
              src={currentImage?.image}
              alt={currentImage?.name}
              className="rounded-lg shadow-lg dark:bg-gray-500 aspect-video sm:min-h-96"
              style={{
                width: "460px",
                height: "400px",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;
