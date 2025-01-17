import * as sapphire from "@oasisprotocol/sapphire-paratime";
import { ethers } from "ethers";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "";
const ABI = JSON.parse(process.env.NEXT_PUBLIC_CONTRACT_ABI || "[]");

const DEV_PRIVATE_KEY = process.env.NEXT_PUBLIC_DEV_PRIVATE_KEY || "";
const TESTNET_RPC = process.env.NEXT_PUBLIC_TESTNET_RPC;

// send token
export async function sendTokens(to: string, amount: number) {
  const provider = new ethers.JsonRpcProvider(TESTNET_RPC);

  const wallet = new ethers.Wallet(DEV_PRIVATE_KEY, provider);
  const tx = await wallet.sendTransaction({
    to,
    value: ethers.parseUnits(amount.toString(), 18),
  });

  await tx.wait();
  return tx.hash;
}

// provider read-only
export function getContract() {
  const provider = sapphire.wrap(
    ethers.getDefaultProvider(sapphire.NETWORKS.testnet.defaultGateway)
  );
  return new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
}

// provider signer (read write)
export async function getSignerContract() {
  if (!window.ethereum) throw new Error("MetaMask not installed");

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = sapphire.wrap(await provider.getSigner());
  return new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
}

// check connect wallet
export async function connectWallet() {
  if (!window.ethereum) throw new Error("MetaMask not installed");

  try {
    await window.ethereum.request({ method: "eth_requestAccounts" });

    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    const sapphireTestnetChainId = "0x5aff";
    if (chainId !== sapphireTestnetChainId) {
      throw new Error("Please switch to Oasis Sapphire Testnet in MetaMask.");
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = sapphire.wrap(await provider.getSigner());
    const address = await signer.getAddress();
    return { signer, address };
  } catch (error) {
    console.error("Failed to connect wallet:", error);
    throw error;
  }
}

export async function switchOrAddNetwork() {
  if (typeof window.ethereum !== "undefined") {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const account = accounts[0];

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
}
