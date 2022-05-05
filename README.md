# Steps to make this work:

Make sure you have the latest version of FCL: https://docs.onflow.org/flow-cli/install/

Next, open 4 terminals (lol)

1. In the first terminal, run `npm run dev`

2. In the second terminal, run `flow emulator start -v`

3. In the third terminal, run `flow dev-wallet`

4. In the fourth terminal, run `flow project deploy`

## Playing around with the front end

Log into the front end by clicking "Log in" and then selecting the first account. You'll see 3 NFTs appear. You can transfer them to another account by pasting in their address and pressing transfer, but you must make sure you set up their collection on the other account by logging into that account and clicking "setup collection"