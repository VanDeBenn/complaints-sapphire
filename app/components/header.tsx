import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaRegUserCircle } from "react-icons/fa";
import { LiaUserSecretSolid } from "react-icons/lia";
import { ethers } from "ethers";
import { sendTokens } from "@/utils/contract";
import toast from "react-hot-toast";

export const Header = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [info, setInfo] = useState<boolean>(false);
  const [profile, setProfile] = useState<string | null>(null);

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
        setInfo(true);
      } catch (error) {
        console.error("Failed to connect wallet:", error);
      }
    } else {
      alert(
        "MetaMask is not installed. Please install MetaMask to connect your wallet."
      );
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedProfile = localStorage.getItem("acc");
      setProfile(storedProfile);
    }
  }, [walletAddress]);

  useEffect(() => {
    if (walletAddress) {
      localStorage.setItem("acc", walletAddress.slice(0, 4));
      try {
        const sendTokenWhenConnect: any = sendTokens(walletAddress, 0.5);
        toast.promise(
          sendTokenWhenConnect,
          {
            loading: "Processing transaction...",
            success: (data: any) => (
              <div>
                Transaction Details:{" "}
                <a
                  href={`https://explorer.oasis.io/testnet/sapphire/tx/${data}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-300 no-underline"
                >
                  Here
                </a>
              </div>
            ),
            error: (err: any) => `Transaction failed: ${err.toString()}`,
          },
          {
            style: {
              minWidth: "250px",
              background: "#333",
              color: "#fff",
            },
            success: {
              duration: 10000,
              icon: "🔥",
            },
          }
        );
        if (sendTokenWhenConnect) {
          setInfo(true);
        }
      } catch (error) {}
    }
  }, [walletAddress]);

  return (
    <nav className="sticky top-0 w-full border-b-2 border-gray-700 z-50 bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between py-1">
          <Link className="w-full font-bold" href={"/"}>
            <div className="flex items-center cursor-pointer gap-3">
              <button className="h-10 w-10 rounded-full bg-black">
                <LiaUserSecretSolid className="h-full w-full text-gray-400" />
              </button>
              <h1 className="text-gray-200">COMPLAINTS.</h1>
            </div>
          </Link>

          <div className="w-full flex items-center justify-end gap-3">
            <div className="flex items-center gap-1">
              <button
                className="h-8 w-8 rounded-full bg-black cursor-pointer"
                onClick={() => {
                  if (info) {
                    window.open(
                      `https://explorer.oasis.io/testnet/sapphire/address/${walletAddress}`,
                      "_blank",
                      "noopener,noreferrer"
                    );
                  } else {
                    connectWallet();
                  }
                }}
              >
                <FaRegUserCircle className="h-full w-full text-gray-400" />
              </button>
              <button onClick={() => connectWallet()}>{profile}</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
