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