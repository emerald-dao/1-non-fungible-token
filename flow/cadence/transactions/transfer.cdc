import ExampleNFT from "../ExampleNFT.cdc"
import NonFungibleToken from "../utility/NonFungibleToken.cdc"

transaction(recipient: Address, withdrawID: UInt64) {
  let ProviderCollection: &ExampleNFT.Collection{NonFungibleToken.Provider}
  let RecipientCollection: &ExampleNFT.Collection{NonFungibleToken.CollectionPublic}
  
  prepare(signer: AuthAccount) {
    self.ProviderCollection = signer.borrow<&ExampleNFT.Collection{NonFungibleToken.Provider}>(from: ExampleNFT.CollectionStoragePath)
                                ?? panic("This user does not have a Collection.")

    self.RecipientCollection = getAccount(recipient).getCapability(ExampleNFT.CollectionPublicPath)
                                .borrow<&ExampleNFT.Collection{NonFungibleToken.CollectionPublic}>()!
  }

  execute {
    self.RecipientCollection.deposit(token: <- self.ProviderCollection.withdraw(withdrawID: withdrawID))
  }
}