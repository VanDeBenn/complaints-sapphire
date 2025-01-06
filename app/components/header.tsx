import React, { useState } from "react";
import Link from "next/link";
import { BiSearchAlt, BiBell } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";
import { LiaUserSecretSolid } from "react-icons/lia";
import { ethers } from "ethers";

export const Header = () => {
  const [walletAddress, setWalletAddress] = useState("");

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        const account = accounts[0];
        setWalletAddress(account);

        const chainId = "0x5aff";
        const chainData = {
          chainId,
          chainName: "Oasis Sapphire Testnet",
          nativeCurrency: {
            name: "Sapphire",
            symbol: "TEST",
            decimals: 18,
          },
          rpcUrls: ["https://testnet.sapphire.oasis.io"],
          blockExplorerUrls: ["https://explorer.oasis.io/testnet/sapphire"],
        };

        const currentChainId = await provider.send("eth_chainId", []);
        if (currentChainId !== chainId) {
          try {
            await provider.send("wallet_addEthereumChain", [chainData]);
          } catch (error) {
            console.error("Failed to add Oasis Sapphire Testnet:", error);
          }
        }
      } catch (error) {
        console.error("Failed to connect wallet:", error);
      }
    } else {
      alert(
        "MetaMask is not installed. Please install MetaMask to connect your wallet."
      );
    }
  };
  return (
    <nav className="sticky top-0 w-full border-b-2 border-gray-700 z-50 bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between py-1">
          <Link className="font-bold" href={"/"}>
            <div className="flex items-center cursor-pointer gap-3">
              <button className="h-10 w-10 rounded-full bg-black">
                <LiaUserSecretSolid className="h-full w-full text-gray-400" />
              </button>
              <h1 className="text-gray-200">COMPLAINTS.</h1>
            </div>
          </Link>

          {/* SEARCH */}
          {/* <div className="flex-1 px-8">
            <div className="max-w-lg w-full mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <BiSearchAlt className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  className="block w-full pl-10 pr-3 py-2 border border-gray-500 rounded-md leading-5 bg-black placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search"
                  type="search"
                />
              </div>
            </div>
          </div> */}

          <div className="flex items-center space-x-2">
            <Link href={"/notifications"}>
              <BiBell className="h-7 w-7 text-gray-400 cursor-pointer" />
            </Link>
            <button
              onClick={connectWallet}
              className="h-8 w-8 rounded-full bg-black cursor-pointer"
            >
              <FaRegUserCircle className="h-full w-full text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
