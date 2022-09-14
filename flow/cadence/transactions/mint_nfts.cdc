import ExampleNFT from "../ExampleNFT.cdc"
import NonFungibleToken from "../utility/NonFungibleToken.cdc"

transaction(names: [String], descriptions: [String], thumbnails: [String], recipient: Address) {
  let RecipientCollection: &ExampleNFT.Collection{NonFungibleToken.CollectionPublic}
  
  prepare(signer: AuthAccount) {
    self.RecipientCollection = getAccount(recipient).getCapability(ExampleNFT.CollectionPublicPath)
                                .borrow<&ExampleNFT.Collection{NonFungibleToken.CollectionPublic}>()
                                ?? panic("The recipient has not set up an ExampleNFT Collection yet.")
  }

  execute {
    var i = 0
    while i < names.length {
      ExampleNFT.mintNFT(recipient: self.RecipientCollection, name: names[i], description: descriptions[i], thumbnail: thumbnails[i])
      i = i + 1
    }
  }
}
