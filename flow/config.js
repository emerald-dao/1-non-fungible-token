const fcl = require("@onflow/fcl");

fcl.config({
  "app.detail.title": "0-NFT", // this adds a custom name to our wallet
  "app.detail.icon": "https://i.imgur.com/nRX6VfZ.png", // this adds a custom image to our wallet
  "accessNode.api": "http://localhost:8080", // this is for the local emulator
  "discovery.wallet": "http://localhost:8701/fcl/authn", // this is for the local dev wallet
  "0xDeployer": "0xf8d6e0586b0a20c7", // this auto configures `0xStuff` to be replaced by the address in txs and scripts
})