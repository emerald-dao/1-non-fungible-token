const fcl = require("@onflow/fcl");

const EMULATOR_ACCESSNODE = "http://localhost:8080";
const EMULATOR_WALLET = "http://localhost:8701/fcl/authn";
const EMULATOR_ADDRESS = "0xf8d6e0586b0a20c7";

const TESNTET_ACCESSNODE = "https://testnet.onflow.org";
const TESTNET_WALLET = "https://fcl-discovery.onflow.org/testnet/authn";
const TESTNET_ADDRESS = "";

fcl.config({
  "app.detail.title": "1-SIMPLE-NFT", // this adds a custom name to our wallet
  "app.detail.icon": "https://i.imgur.com/nRX6VfZ.png", // this adds a custom image to our wallet
  "accessNode.api": EMULATOR_ACCESSNODE, // this is for the local emulator
  "discovery.wallet": EMULATOR_WALLET, // this is for the local dev wallet
  "0xDeployer": EMULATOR_ADDRESS, // this auto configures `0xStuff` to be replaced by the address in txs and scripts
})