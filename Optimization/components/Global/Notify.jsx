import React, { useState, useEffect } from "react";

const Notify = ({ image, message, toast }) => {
  const [finalSrc, setFinalSrc] = useState(image);

  useEffect(() => {
    const checkMediaType = async () => {
      try {
        if (image.includes("ipfs")) {
          const response = await fetch(image, { method: "HEAD" });
          const contentType = response.headers.get("Content-Type");

          if (contentType.includes("audio")) {
            setFinalSrc("music.jpg");
          } else if (contentType.includes("image")) {
            setFinalSrc(image);
          } else {
            setFinalSrc("video.jpg");
          }
        }
      } catch (error) {
        console.log("Error fetching media type:", error);
        setFinalSrc("failed.png");
      }
    };
    checkMediaType();
  }, [image]);
  return (
    <div
      className={`${
        image.visible ? "animate-enter" : "animate-leave"
      } max-w-md w-full bg-[#1a1a1a] shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <img
              src={finalSrc}
              className="h-10 w-10 rounded-full"
              alt="Image"
            />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-100">Current Status</p>
            <p className="mt-1 text-sm text-gray-500">{message}</p>
          </div>
        </div>
      </div>

      <div className="flex border-l bg-[#705DF2]">
        <button
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-gray-100 hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onClick={() => toast.dismiss(image.id)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Notify;
