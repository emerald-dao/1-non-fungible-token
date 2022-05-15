# Steps to make this work:

Make sure you have the latest version of FCL: https://docs.onflow.org/flow-cli/install/

Next, make sure to `npm install`.

Then, open 4 terminals (lol)

1. In the first terminal, run `npm run dev`

2. In the second terminal, run `flow emulator start -v`

3. In the third terminal, run `flow dev-wallet`

4. In the fourth terminal, run `flow project deploy`

## Playing around with the front end

1. Log into the front end by clicking "Log in" and then selecting the first account.
2. In a terminal, run `npm run mint`. That will mint 3 NFTs to the Service Account (0xf8d6e0586b0a20c7) 
3. Click "Get NFTs". You'll see 3 NFTs appear. 
4. You can transfer them to another account by pasting in another accounts address and pressing transfer, but you must make sure you set up their collection on the other account by logging into that account and clicking "setup collection" first.






# 💎 Emerald Academy

## 🚩 Challenge 1: 🍀 Simple NFT 🤓

🎫 Deploy a simpleNFT   contract to learn the basics of the Flow blockchain and Cadence. You'll use:
- The local Flow emulator to deploy smart contracts. 
- The local Flow dev wallet to log into test accounts.
- A template Next.js app with sample scripts and transactions to interact with your contract.

🌟 The final deliverable is an app that lets users create an empty collection, mint some pre-loaded NFTs, and transfer them to another account on Flow testnet.

💬 Meet other builders working on this challenge and get help in the [Emerald City Discord](https://discord.gg/emeraldcity)!

---

# Checkpoint 0: 📦 Install 📚

Required: 
* [Git](https://git-scm.com/downloads)
* [Node](https://nodejs.org/dist/latest-v16.x/)  (🧨 Use Node v16 or a previous version as v17 may cause errors 🧨)

```sh
git clone https://github.com/emerald-dao/1-simple-nft.git
```

> in a terminal window, start your 📱 frontend:

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

> in a third terminal window, 💸 start your local wallet:

```bash
cd 1-simple-nft
flow dev-wallet
```

> in a fourth terminal window, 💾 deploy your contract:

```bash
cd 1-simple-nft
flow project deploy
```

> You can `flow project deploy --update` to deploy a new contract any time.

📱 Open http://localhost:3000 to see the app

---

# Checkpoint 1: 👛 Wallets

> 🔥 We'll be using **the local Flow dev wallet** on localhost...

> 👛 Click the "Log In" button and notice a window appears with different accounts to select, each with their own FlowToken balance. Select the first account to log in to it.
You will see the user address now reflects the current logged in address

---

# Checkpoint 2: 📘 Setup empty user Collection 
???

> 👀 Click the ‘Setup Collection’ button to setup your empty collection:
???

/
🚨🚨🚨 TODO: ADD IMAGE HERE 🚨🚨🚨
???

---


# Checkpoint 2?: 📘Minting the NFT’s

> In a terminal, run `npm run mint`. 

🚨🚨🚨 TODO: ADD IMAGE HERE 🚨🚨🚨
???

That will mint 3 NFTs to the Service Account (0xf8d6e0586b0a20c7)

---


# Checkpoint 3: ✏️ Minting the NFT’s 

> ✏️ Now it’s time for what we’ve all been waiting for: MINTING NFT’s (unfortunately just on testnet)
Click on the Get NFT’s button:

👀 You should see your New NFT’s appear inside your collection:

🚨🚨🚨 TODO: ADD IMAGE HERE 🚨🚨🚨

🔏 You can also check out your smart contract `ExampleNFT  .cdc` in `flow/cadence/HelloWorld.cdc`.

💼 Take a quick look at how your contract get deployed in `flow.json`.

📝 If you want to make frontend edits, open `index.js` in `pages/index.js`.

---

# Checkpoint 4: 💾 Transfer it!

📔 You can transfer the NFT’s to another account by pasting in another account’s address and clicking transfer

Before trying to transfer, make sure to set up the Collection on that user’s account by logging into that account and clicking “Setup Collection”



1. Log into the front end by clicking "Log in" and then selecting the first account.
2. In a terminal, run `npm run mint`. That will mint 3 NFTs to the Service Account (0xf8d6e0586b0a20c7) 
3. Click "Get NFTs". You'll see 3 NFTs appear. 
4. You can transfer them to another account by pasting in another accounts address and pressing transfer, but you must make sure you set up their collection on the other account by logging into that account and clicking "setup collection" first.

---

# ⚔️ Side Quests

> 🏃 Head to your next challenge [here](https://github.com/emerald-dao/2-simple-marketplace).

> 💬 Meet other builders working on this challenge and get help in the [💎 Emerald City Discord](https://discord.gg/emeraldcity)!

> 👉 Problems, questions, comments on the stack? Post them to the [💎 Emerald City Discord](https://discord.gg/emeraldcity).
