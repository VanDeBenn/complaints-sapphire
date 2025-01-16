"use client";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { sendTokens } from "@/utils/contract";
import toast from "react-hot-toast";

export default function Home() {
  const [walletAddress, setWalletAddress] = useState("");
  const [info, setInfo] = useState<boolean>(false);
  const [hasClicked, setHasClicked] = useState(false);

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
        alert(`Failed to connect wallet`);
      }
    } else {
      alert(
        "MetaMask is not installed. Please install MetaMask to connect your wallet."
      );
    }
  };

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
              onClick={() => {
                if (info) {
                  window.open(
                    `https://explorer.oasis.io/testnet/sapphire/address/${walletAddress}`,
                    "_blank",
                    "noopener,noreferrer"
                  );
                } else {
                  connectWallet();
                  if (!hasClicked) {
                    toast("Click Again");
                    setHasClicked(true);
                  }
                }
              }}
            >
              {info ? "Check Wallet" : "Connect Wallet"}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
