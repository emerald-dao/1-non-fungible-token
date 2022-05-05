import ExampleNFT from "../ExampleNFT.cdc"
import NonFungibleToken from "../NonFungibleToken.cdc"
import MetadataViews from "../MetadataViews.cdc"

transaction(name: String, description: String, thumbnail: String) {
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
    ExampleNFT.mintNFT(recipient: self.RecipientCollection, name: name, description: description, thumbnail: thumbnail)
  }
}