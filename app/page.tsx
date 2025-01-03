"use client";
import { useState } from "react";
import { ethers } from "ethers";
import { sendTokens } from "@/utils/contract";

export default function Home() {
  const [walletAddress, setWalletAddress] = useState("");
  const [info, setInfo] = useState<boolean>(false);

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

        if (walletAddress) {
          console.log("walletAddress", walletAddress);
          const sendTokenWhenConnect = await sendTokens(walletAddress, 1);
          if (sendTokenWhenConnect) {
            setInfo(true);
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
    <div className="relative min-h-screen font-[family-name:var(--font-geist-sans)]">
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <video className="w-full h-full object-cover" loop autoPlay muted>
          <source src="/videos/bannerr.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <b className="text-5xl">Complaints.</b>
          <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
            <li className="mb-2">
              Stay
              <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
                Anonym.
              </code>
            </li>
            <li>Privacy.</li>
          </ol>

          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <a
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
              href="/home"
              rel="noopener noreferrer"
            >
              Start Now
            </a>
            <button
              className="rounded-full border-2 border-solid border-gray-700 dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
              onClick={connectWallet}
            >
              {info ? "Connected" : "Connect Wallet"}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
