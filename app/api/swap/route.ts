import { authConfig } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import db from "@/app/db";
import { Connection, Keypair, VersionedTransaction } from "@solana/web3.js";




export async function POST(req: NextRequest) {
    const connection = new Connection("https://mainnet.helius-rpc.com/?api-key=a3f7ce3e-5082-4a76-812f-213392b2e4cb")
    const data: {
        quoteResponse: any
    } = await req.json();

    const session = await getServerSession(authConfig);
    if(!session?.user){
        return NextResponse.json({
            message: "You are not logged in"
        }, {
            status: 401
        })
    }

    const solWallet = await db.solWallet.findFirst({
        where: {
            userId: session.user.uid
        }
    })

    if (!solWallet) {
        return NextResponse.json({
            message: "Could not find solana wallet"
        }, {
            status: 401
        })
    }

    const { swapTransaction } = await (
        await fetch('https://quote-api.jup.ag/v6/swap', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            // quoteResponse from /quote api
            quoteResponse: data.quoteResponse ,
            // user public key to be used for the swap
            userPublicKey: solWallet.publicKey,
            // auto wrap and unwrap SOL. default is true
            wrapAndUnwrapSol: true,
            // feeAccount is optional. Use if you want to charge a fee.  feeBps must have been passed in /quote API.
            // feeAccount: "fee_account_public_key"
          })
        })
      ).json();

      console.log("Jup returned txn")

        const swapTransactionBuf = Buffer.from(swapTransaction, 'base64');
        var transaction = VersionedTransaction.deserialize(swapTransactionBuf);
        const privateKey = getPrivateKeyFromDb(solWallet.privateKey)
        transaction.sign([privateKey]);

        const latestBlockHash = await connection.getLatestBlockhash();
        const rawTransaction = transaction.serialize()
        const txid = await connection.sendRawTransaction(rawTransaction, {
            skipPreflight: true,
            maxRetries: 2
        });
        await connection.confirmTransaction({
            blockhash: latestBlockHash.blockhash,
            lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
            signature: txid
        });

        return NextResponse.json({
            txid
        })

}

function getPrivateKeyFromDb(privateKey: String){
    const arr = privateKey.split(",").map(x=>Number(x));
    const privateKeyUintArr = Uint8Array.from(arr);
    const keypair = Keypair.fromSecretKey(privateKeyUintArr);
    return keypair;
}