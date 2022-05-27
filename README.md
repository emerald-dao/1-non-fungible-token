# 💎 Emerald Academy

## 🚩 Challenge 1: 🍀 Simple NFT 🤓

🎫 Deploy your own NFT contract to learn the basics of the Flow blockchain and Cadence. You'll use:
- The local Flow emulator to deploy smart contracts. 
- The local Flow dev wallet to log into test accounts.
- A template Next.js app with sample scripts and transactions to interact with your contract.

🌟 The final deliverable is a DApp that lets users create an empty collection, mint some pre-loaded NFTs, and transfer them to another account on Flow testnet.

💬 Meet other builders working on this challenge and get help in the [Emerald City Discord](https://discord.gg/emeraldcity)!

---

# Checkpoint 0: 📦 Install 📚

Required: 
* [Git](https://git-scm.com/downloads)
* [Node](https://nodejs.org/dist/latest-v16.x/)  (🧨 Use Node v16 or a previous version as v17 may cause errors 🧨)

```sh
git clone https://github.com/emerald-dao/1-simple-nft.git
```

> in a terminal window, 📱 install the dependencies start your frontend:

```sh
cd 1-simple-nft
npm install
npm run dev
```

> in a second terminal window, start your 👷‍ local emulator:

```bash
cd 1-simple-nft
flow emulator start -v
```

> in a third terminal window, 💾 deploy your contract and 💸 start your local wallet:

```bash
cd 1-simple-nft
flow project deploy
flow dev-wallet
```

> You can `flow project deploy --update` to deploy a new contract any time.

📱 Open http://localhost:3000 to see the app

---

# Checkpoint 1: 👛 Wallets

> 🔥 We'll be using **the local Flow dev wallet**.

> 👛 Click the "Log In" button and notice a window appears with different accounts to select, each with their own Flow Token balance. Select the first account to log in to it.

---

# Checkpoint 2: 👀 See your NFTs

> After logging in to the account with address `0xf8d6e0586b0a20c7`, click the `Get NFTs` button. Notice that you get an error:

<img src="https://i.imgur.com/aM6gV2G.png" alt="error when getting NFTs" />

The reason for this is because we haven't set up the user's account. Let's do that in the next step.

# Checkpoint 3: 📘 Minting the NFT’s

> In a terminal, run `npm run mint`. 

<img src="https://i.imgur.com/r9zppoi.png" alt="mint NFTs transaction" />

This will automatically set up the user's account and mint 3 NFTs to their address (`0xf8d6e0586b0a20c7`).

> Go back to your application and click `Get NFTs` again. Notice that 3 NFTs appear! Woooohoooo.

<img src="https://i.imgur.com/CZSwxxJ.png" alt="NFTs now appear on the frontend" />

---

# Checkpoint 4: 📘 Setup empty user Collection 

> Log out of the current account and login to another account. Click `Get NFTs` again. You will see an error appear:

<img src="https://i.imgur.com/GjCa4NF.png" alt="error when getting NFTs" />

Again, this is because we haven't set up the user's account. This time, we will do it manually by clicking the `Setup Collection` button:

<img src="https://i.imgur.com/VvaLKkW.png" alt="setup collection for user account" />

This will set up the user's account so it can receive NFTs.

> Try clicking `Get NFTs`. You will see no NFTs appear. So let's transfer some from the other account!

---

# Checkpoint 4: 💾 Transfer an NFT

> 📔 Log out of your account and go back to the Service Account. In one of the NFT boxes, copy and paste `0x179b6b1cb6755e31` and click `Transfer`:

<img src="https://i.imgur.com/i3r1GVa.png" alt="transfer an NFT" />

This will transfer an NFT to the `0x179b6b1cb6755e31` account. Log in to that account, click `Get NFTs`, and you will see it has an NFT now!

---

# Checkpoint 5: 💾 Deploy it to testnet!

📔 Ready to deploy to a public testnet?!?

> 🔐 Generate a **deployer address** by typing `flow keys generate --network=testnet` into a terminal. Make sure to save your public key and private key somewhere, you will need them soon.

<img src="https://i.imgur.com/HbF4C73.png" alt="generate key pair" />

> 👛 Create your **deployer account** by going to https://testnet-faucet.onflow.org/, pasting in your public key from above, and clicking `CREATE ACCOUNT`: 

<img src="https://i.imgur.com/73OjT3K.png" alt="configure testnet account on the website" />

> After it finishes, click `COPY ADDRESS` and make sure to save that address somewhere. You will need it!

> ⛽️ Add your new testnet account to your `flow.json` by modifying the following lines of code. Paste your address you copied above to where it says "YOUR GENERATED ADDRESS", and paste your private key where it says "YOUR PRIVATE KEY".

```json
"accounts": {
  "emulator-account": {
    "address": "f8d6e0586b0a20c7",
    "key": "5112883de06b9576af62b9aafa7ead685fb7fb46c495039b1a83649d61bff97c"
  },
  "testnet-account": {
    "address": "YOUR GENERATED ADDRESS",
    "key": {
      "type": "hex",
      "index": 0,
      "signatureAlgorithm": "ECDSA_P256",
      "hashAlgorithm": "SHA3_256",
      "privateKey": "YOUR PRIVATE KEY"
    }
  }
},
"deployments": {
  "emulator": {
    "emulator-account": [
      "NonFungibleToken",
      "FungibleToken",
      "MetadataViews",
      "ExampleNFT"
		]
  },
  "testnet": {
    "testnet-account": [
      "NonFungibleToken",
      "FungibleToken",
      "MetadataViews",
      "ExampleNFT"
    ]
  }
}
```

> 🚀 Deploy your HelloWorld smart contract:

```sh
flow project deploy --network=testnet
```

<img src="https://i.imgur.com/GBFs2Uz.png" alt="deploy contract to testnet" />

> Lastly, configure your .env file to point to Flow TestNet so we can interact with your new contract.

In your .env file, change the following:
1. `NEXT_PUBLIC_CONTRACT_ADDRESS` to your generated testnet address
2. `NEXT_PUBLIC_ACCESS_NODE` to `https://testnet.onflow.org`
3. `NEXT_PUBLIC_WALLET` to `https://fcl-discovery.onflow.org/testnet/authn` 

You can now terminate all your terminals since we no longer need to run our own local blockchain or wallet. Everything lives on testnet!

> Run `npm run dev` to start your application in a terminal, and have a blast with your DApp!

---

# 📝 Make Edits!

🔏 You can also check out your smart contract `ExampleNFT.cdc` in `flow/cadence/ExampleNFT.cdc`.

💼 Take a quick look at how your contract get deployed in `flow.json`.

📝 If you want to make frontend edits, open `index.js` in `pages/index.js`.

# ⚔️ Side Quests

> 🏃 Head to your next challenge [here](https://github.com/emerald-dao/2-simple-marketplace).

> 💬 Meet other builders working on this challenge and get help in the [💎 Emerald City Discord](https://discord.gg/emeraldcity)!

> 👉 Problems, questions, comments on the stack? Post them to the [💎 Emerald City Discord](https://discord.gg/emeraldcity).
