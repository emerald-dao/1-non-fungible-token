const fcl = require("@onflow/fcl");
const t = require("@onflow/types");
// import { mint_nfts } from "../flow/cadence/interactions.js";
const { serverAuthorization } = require("./auth/authorization.js");
require("../flow/config.js");

async function mintNFTs() {
  const names = ["Education", "Building", "Governance"];
  const descriptions = [
    "This is the logo of the Education Guild",
    "This is the logo of the Building Guild",
    "This is the logo of the Governance Guild"
  ];
  const thumbnails = [
    "QmYVKNWdm2961QtHz721tdA8dvBT116eT2DtATsX53Kt28",
    "QmPkJbnJSt3ZkHuGAnHyHCAhWVrneRrK6VHMjgu5oPGnoq",
    "QmcpmzEDmZtP37csyNaYaxzhoMQmmUrQsihE3x2XGKsg1Z"
  ];

  try {
    const transactionId = await fcl.send([
      fcl.transaction`
      import ExampleNFT from 0xDeployer
      import NonFungibleToken from 0xDeployer
      import MetadataViews from 0xDeployer
      
      transaction(names: [String], descriptions: [String], thumbnails: [String]) {
        let RecipientCollection: &ExampleNFT.Collection{NonFungibleToken.CollectionPublic}
        
        prepare(signer: AuthAccount) {
          if signer.borrow<&ExampleNFT.Collection>(from: ExampleNFT.CollectionStoragePath) == nil {
            signer.save(<- ExampleNFT.createEmptyCollection(), to: ExampleNFT.CollectionStoragePath)
            signer.link<&ExampleNFT.Collection{NonFungibleToken.CollectionPublic, MetadataViews.ResolverCollection}>(ExampleNFT.CollectionPublicPath, target: ExampleNFT.CollectionStoragePath)
          }
      
          self.RecipientCollection = signer.getCapability(ExampleNFT.CollectionPublicPath)
                                      .borrow<&ExampleNFT.Collection{NonFungibleToken.CollectionPublic}>()!
        }
      
        execute {
          var i = 0
          while i < names.length {
            ExampleNFT.mintNFT(recipient: self.RecipientCollection, name: names[i], description: descriptions[i], thumbnail: thumbnails[i])
            i = i + 1
          }
        }
      }
      `,
      fcl.args([
        fcl.arg(names, t.Array(t.String)),
        fcl.arg(descriptions, t.Array(t.String)),
        fcl.arg(thumbnails, t.Array(t.String))
      ]),
      fcl.proposer(serverAuthorization),
      fcl.payer(serverAuthorization),
      fcl.authorizations([serverAuthorization]),
      fcl.limit(999)
    ]).then(fcl.decode);

    console.log({ transactionId });
  } catch (e) {
    console.log(e);
  }
}

mintNFTs();