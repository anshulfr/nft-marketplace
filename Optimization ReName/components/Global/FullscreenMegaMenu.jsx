import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Keyboard,
  HardDrive,
  Rocket,
  ChevronRight,
  X,
  Image,
  Clapperboard,
  AudioLines,
  RollerCoaster,
  ImagePlus,
  ArchiveRestore,
  Telescope,
  Users,
  User,
  Store,
  FolderSync,
  SquarePen,
  Anchor,
  Signature,
  BookText,
  CircleHelp,
  Boxes,
  MessagesSquare,
  Menu as MenuIcon,
} from "lucide-react";
import { Home } from "../index";

const menuData = [
  {
    id: "nfts",
    name: "NFTs",
    icon: Store,
    sections: [
      {
        title: "NFTs",
        items: [
          { name: "Image", href: "/nfts/image", icon: Image },
          { name: "Video", href: "/nfts/video", icon: Clapperboard },
          { name: "Audio", href: "/nfts/audio", icon: AudioLines },
        ],
      },
      {
        title: "NFT Auction",
        items: [
          { name: "Auctions", href: "/nft-auction", icon: RollerCoaster },
          { name: "Created NFT", href: "/create-nft", icon: ImagePlus },
          { name: "NFT Bids", href: "/nft-auction", icon: HardDrive },
        ],
      },
      {
        title: "Create NFT",
        items: [
          { name: "NFT Create", href: "/create-nft", icon: Keyboard },
          { name: "IPFS", href: "/offers", icon: ArchiveRestore },
          { name: "Explorer", href: "/offers", icon: Telescope },
        ],
      },
    ],
    featured: {
      title: "Crypto King NFTs",
      description:
        "Experience breakthrough profermance with the Crypto King NFTs",
      href: "https://www.theblockchaincoders.com",
    },
  },
  {
    id: "myaccount",
    name: "Community",
    icon: Users,
    sections: [
      {
        title: "Member",
        items: [
          { name: "Creator", href: "/creator", icon: Users },
          { name: "My Account", href: "/my-account", icon: User },
          { name: "Listed NFTs", href: "/created-nfts", icon: SquarePen },
        ],
      },
      {
        title: "Offer",
        items: [
          { name: "NFT Auction", href: "/nft-auction", icon: RollerCoaster },
          { name: "ICO Token", href: "/token-sale", icon: Anchor },
          { name: "Transfer", href: "/transferFunds", icon: FolderSync },
        ],
      },
      {
        title: "Support",
        items: [
          { name: "About Us", href: "/about-us", icon: BookText },
          { name: "Help Center", href: "/faq", icon: CircleHelp },
          { name: "Contact Us", href: "/contact-us", icon: Signature },
        ],
      },
    ],
    featured: {
      title: "Premium Community Exprience",
      description:
        "Experience breakthrough profermance with the Crypto King NFTs",
      href: "https://www.theblockchaincoders.com",
    },
  },
  {
    id: "popular",
    name: "Popular",
    icon: Boxes,
    sections: [
      {
        title: "NFTs",
        items: [
          { name: "Marketplace", href: "/", icon: Store },
          { name: "Sale", href: "/nft/image", icon: Image },
          { name: "Create", href: "/create-nft", icon: ImagePlus },
        ],
      },
      {
        title: "Community",
        items: [
          { name: "Join Member", href: "/charity", icon: Users },
          { name: "Chat", href: "/community", icon: MessagesSquare },
          { name: "Creator", href: "/creator", icon: User },
        ],
      },
      {
        title: "Marketplace",
        items: [
          { name: "NFT Upload", href: "/create-nft", icon: Store },
          { name: "ReSale NFT", href: "/my-account", icon: Image },
          { name: "NFT Explorer", href: "/nft/audio", icon: Telescope },
        ],
      },
    ],
    featured: {
      title: "Most popular features of Crypto King",
      description:
        "Experience breakthrough profermance with the Crypto King NFTs",
      href: "https://www.theblockchaincoders.com",
    },
  },
];

function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <Rocket className="h-8 w-8 text-indigo-600" />
      <span className="font-bold text-xl text-gray-900 dark:text-white">
        Crypto King
      </span>
    </div>
  );
}

function MegaMenuCategory({ category, isActive, onClick }) {
  const Icon = category.icon;

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors ${
        isActive
          ? "bg-indigo-50 dark:bg-[#1a1a1a] text-indigo-600 dark:text-indigo-400"
          : "hover:bg-gray-50 dark:hover:bg-[#1a1a1a]"
      }`}
    >
      <div className="flex items-center space-x-3">
        <Icon className="h-5 w-5" />
        <span className="font-medium">{category.name}</span>
      </div>
      <ChevronRight
        className={`h-5 w-5 transition-transform ${
          isActive ? "rotate-90" : ""
        }`}
      />
    </button>
  );
}

function MegaMenuContent({ category, closeMenu }) {
  const images = ["/cryptoking.jpg", "/ico.jpg", "market.jpg"];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  if (!category) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        <img
          src={images[currentImageIndex]}
          alt="Sildershow"
          style={{
            width: "100%",
            height: " 100%",
            objectFit: "cover",
          }}
        />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {category.sections.map((section) => (
          <div key={section.title} className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {section.title}
            </h3>
            <ul className="space-y-2">
              {section.items.map((item) => (
                <li key={item.name}>
                  <Link href={item.href}>
                    <a
                      onClick={closeMenu}
                      className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                    >
                      {item.icon && <item.icon className="h-4 w-4" />}
                      <span>{item.name}</span>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {category.featured && (
        <div className="mt-12 p-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl text-white">
          <h3 className="text-xl font-bold mb-2">{category.featured.title}</h3>
          <p className="mb-4 text-indigo-100">
            {category.featured.description}
          </p>
          <a
            href={category.featured.href}
            className="inline-flex items-center px-4 py-2 bg-white text-indigo-600 rounded-lg font-medium hover:bg-indigo-50"
          >
            Learn More
          </a>
        </div>
      )}
    </div>
  );
}

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  const closeMenu = () => setIsOpen(false);
  return (
    <div className="">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Home className="h-6 w-6" />}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white dark:bg-[#1a1a1a] overflow-hidden">
          <div className="h-full flex flex-col md:flex-row">
            <div className="w-full md:w-1/4 lg:w-1/5 border-r border-gray-200 dark:border-[#1a1a1a] overflow-y-auto">
              <div className="sticky top-0 bg-white dark:bg-[#1a1a1a] p-4 border-b border-gray-200 dark:border-[#1a1a1a]">
                <button
                  className="p-2 hover:bg-gray-100 dark:hover:bg-[#1a1a1a] rounded-full"
                  onClick={closeMenu}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="py-4">
                {menuData.map((category) => (
                  <MegaMenuCategory
                    key={category.id}
                    category={category}
                    isActive={activeCategory === category.id}
                    onClick={() => setActiveCategory(category.id)}
                  />
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              <MegaMenuContent
                category={menuData.find((c) => c.id === activeCategory)}
                closeMenu={closeMenu}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
