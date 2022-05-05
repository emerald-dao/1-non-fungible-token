import ExampleNFT from "../ExampleNFT.cdc"
import NonFungibleToken from "../NonFungibleToken.cdc"
import MetadataViews from "../MetadataViews.cdc"

transaction() {
  
  prepare(signer: AuthAccount) {
    if signer.borrow<&ExampleNFT.Collection>(from: ExampleNFT.CollectionStoragePath) == nil {
      signer.save(<- ExampleNFT.createEmptyCollection(), to: ExampleNFT.CollectionStoragePath)
      signer.link<&ExampleNFT.Collection{NonFungibleToken.CollectionPublic, MetadataViews.ResolverCollection}>(ExampleNFT.CollectionPublicPath, target: ExampleNFT.CollectionStoragePath)
    }
  }

  execute {
    
  }
}