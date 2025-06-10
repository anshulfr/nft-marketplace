import React, { useState } from "react";

const Donate = ({ setDonationBox, setMembership }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = () => {
    setIsPlaying(true);
  };
  return (
    <div className="fixed bottom-0 sm:bottom-14 m-4 left-0 w-64 bg-[#705DFC] shadow-lg rounded-lg overflow-hidden">
      {!isPlaying && (
        <img
          onClick={handleClick}
          src={"/player.jpg"}
          alt="Video Thumbnail"
          className="w-full h-52 object-cover cursor-pointer"
        />
      )}

      {isPlaying && (
        <>
          <video className="w-full h-52" controls autoPlay>
            <source
              src="https://movieapp.nyc3.digitaloceanspaces.com/Pro%20Blockchain%20Course.mp4"
              type="video/mp4"
            />
            Your browser dose not support the video tag
          </video>
          <button
            onClick={() => setMembership(true)}
            className="absolute top-1.5 left-0 text-white text-sm font-bold animate-marquee"
          >
            Join Member Club To Get Special Offer!
          </button>
        </>
      )}

      <button
        onClick={() => setDonationBox(false)}
        className="absolute -top-2 right-0 text-xl text-white bg-[#705DFC] w-12 h-10 flex items-center justify-center hover:bg-[#5a4ac7] focus:outline-none"
      >
        &times;
      </button>

      {/* INLINE CSS FOR ANIMATION */}
      <style jsx>
        {`
          @keyframes marquee {
            0% {
              transform: translateX(100%);
            }
            100% {
              transform: translateX(-100%);
            }
          }

          .animate-marquee {
            animation: marquee 10s linear infinite;
            white-space: nowrap;
            padding-left: 10px;
          }
        `}
      </style>
    </div>
  );
};

export default Donate;
