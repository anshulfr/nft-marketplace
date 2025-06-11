# NFT Marketplace Monorepo

This repository contains several Next.js projects and a Node API used for the NFT marketplace course. To run the full stack locally you need to start both the API and one of the Next.js front‑ends.

## Backend API
1. Navigate to `nft_api_code/`.
2. Copy `config.env` and fill in the values for your MongoDB database and email credentials.
3. Install dependencies and start the server:
   ```bash
   cd nft_api_code
   npm install
   npm start
   ```
   The API runs on `http://localhost:3000` by default.

## Front‑End / Contracts
1. Choose a project directory (e.g. `nfimarketplacefinalcode`).
2. Install dependencies:
   ```bash
   cd nfimarketplacefinalcode
   npm install
   ```
3. (Optional) start a local Hardhat node and deploy the contracts:
   ```bash
   npx hardhat node
   npx hardhat run scripts/deploy.js --network hardhat
   ```
4. Launch the Next.js app:
   ```bash
   npm run dev
   ```
   The site will start on `http://localhost:3000` (or the next free port).

Ensure the API server is running so pages that require login or database access work correctly.
