import ExampleNFT from "../ExampleNFT.cdc"
import NonFungibleToken from "../utility/NonFungibleToken.cdc"

transaction(name: String, description: String, thumbnail: String, recipient: Address) {
  let RecipientCollection: &ExampleNFT.Collection{NonFungibleToken.CollectionPublic}
  
  prepare(signer: AuthAccount) {
    self.RecipientCollection = getAccount(recipient).getCapability(ExampleNFT.CollectionPublicPath)
                                .borrow<&ExampleNFT.Collection{NonFungibleToken.CollectionPublic}>()
                                ?? panic("The recipient has not set up an ExampleNFT Collection yet.")
  }

  execute {
    ExampleNFT.mintNFT(recipient: self.RecipientCollection, name: name, description: description, thumbnail: thumbnail)
  }
}