import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css'
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import "../flow/config.js";

export default function Home() {
  const [user, setUser] = useState({ loggedIn: false });
  const [list, setList] = useState([]);
  const [recipient, setRecipient] = useState('');

  // This keeps track of the logged in 
  // user for you automatically.
  useEffect(() => {
    fcl.currentUser().subscribe(setUser);
  }, [])

  async function getNFTs() {

    const result = await fcl.send([
      fcl.script`
      import ExampleNFT from 0xf8d6e0586b0a20c7
      import MetadataViews from 0xf8d6e0586b0a20c7

      pub fun main(address: Address): [NFT] {
        let collection = getAccount(address).getCapability(ExampleNFT.CollectionPublicPath)
                          .borrow<&ExampleNFT.Collection{MetadataViews.ResolverCollection}>()
                          ?? panic("Could not borrow a reference to the collection")

        let ids = collection.getIDs()

        let answer: [NFT] = []

        for id in ids {
          // Get the basic display information for this NFT
          let nft = collection.borrowViewResolver(id: id)
          // Get the basic display information for this NFT
          let view = nft.resolveView(Type<MetadataViews.Display>())!
          let display = view as! MetadataViews.Display
          answer.append(
            NFT(
              id: id, 
              name: display.name, 
              description: display.description, 
              thumbnail: display.thumbnail
            )
          )
        }

        return answer
      }

      pub struct NFT {
        pub let id: UInt64
        pub let name: String 
        pub let description: String 
        pub let thumbnail: AnyStruct{MetadataViews.File}
        
        init(id: UInt64, name: String, description: String, thumbnail: AnyStruct{MetadataViews.File}) {
          self.id = id
          self.name = name 
          self.description = description
          self.thumbnail = thumbnail
        }
      }
      `,
      fcl.args([
        fcl.arg(user?.addr, t.Address)
      ])
    ]).then(fcl.decode);

    console.log(result)

    setList(result);
    console.log(list)
  }

  async function transferNFT(recipient, withdrawID) {

    const result = await fcl.send([
      fcl.transaction`
      import ExampleNFT from 0xf8d6e0586b0a20c7
      import NonFungibleToken from 0xf8d6e0586b0a20c7

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
      `,
      fcl.args([
        fcl.arg(recipient, t.Address),
        fcl.arg(withdrawID, t.UInt64)
      ]),
      fcl.proposer(fcl.authz),
      fcl.payer(fcl.authz),
      fcl.authorizations([fcl.authz]),
      fcl.limit(999)
    ]).then(fcl.decode);

    console.log({transactionId});
    setList(result);
  }

  async function setupCollection() {

    const transactionId = await fcl.send([
      fcl.transaction`
      import ExampleNFT from 0xf8d6e0586b0a20c7
      import NonFungibleToken from 0xf8d6e0586b0a20c7
      import MetadataViews from 0xf8d6e0586b0a20c7

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
      `,
      fcl.args([]),
      fcl.proposer(fcl.authz),
      fcl.payer(fcl.authz),
      fcl.authorizations([fcl.authz]),
      fcl.limit(999)
    ]).then(fcl.decode);

    console.log({transactionId});
  }

  return (
    <div>
      <Head>
        <title>0-NFT</title>
        <meta name="description" content="Used by Emerald Academy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>User Address: {user.loggedIn ? user.addr : null}</h1>
      <button onClick={fcl.authenticate}>Log In</button>
      <button onClick={fcl.unauthenticate}>Log Out</button>
      <button onClick={setupCollection}>Setup Collection</button>
      <button onClick={getNFTs}>Get NFTs</button>
      {list.map((nft, index) => (
        <div key={index} style={{border: '2px solid black'}}>
          <h1>{nft.name}</h1>
          <p>{nft.id}</p>
          <p>{nft.description}</p>
          <img src={`https://ipfs.infura.io/ipfs/${nft.thumbnail.url}`} />
          <input type="text" onChange={e => setRecipient(e.target.value)} />
          <button onClick={() => transferNFT(recipient, nft.id)}>Transfer</button>
        </div>
      ))}
    </div>
  )
}
