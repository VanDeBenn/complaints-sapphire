# Complaints DApp 📝

A decentralized digital complaints platform built on Oasis Sapphire Testnet 🌐

## Overview 🎯

Complaints is a Web3 application that enables users to submit and manage digital complaints in a decentralized, transparent, and secure manner using blockchain technology. Built on the Oasis Sapphire Testnet, it ensures privacy and immutability of complaint records.

## Tech Stack 🛠️

- **Frontend**: Next.js 15.1.0
- **Smart Contract**: Solidity (deployed on Oasis Sapphire Testnet)
- **Web3 Integration**: ethers.js v6
- **Privacy Layer**: @oasisprotocol/sapphire-paratime
- **Styling**: TailwindCSS
- **Development**: Vercel

## Prerequisites 📋

- Node.js
- Metamask or compatible Web3 wallet
- Oasis Sapphire Testnet network configured in your wallet

## Installation 🚀

```bash
# Clone the repository
git clone https://github.com/VanDeBenn/complaints-sapphire.git

# Install dependencies
cd complaints-sapphire
npm install

# Set up environment variables
cp .env.example .env
# Add your configuration to .env

# Run development server
npm run dev
```

## Environment Variables 🔒

Create a `.env` file with:

```
NEXT_PUBLIC_CONTRACT_ADDRESS=your_contract_address
NEXT_PUBLIC_CONTRACT_ABI=your_contract_abi
```

## Scripts 📜

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run linting

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.
