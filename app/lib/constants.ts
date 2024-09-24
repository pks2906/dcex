import { Connection } from "@solana/web3.js";
import axios from "axios";

let LAST_UPDATED: number | null = null;
let prices: {[key: string]: {
    price: string;
}} = {};
const TOKEN_PRICE_REFRESH_INTERVAL = 60 * 1000; //every 60
export const SUPPORTED_TOKENS: {
    name: string;
    mint: string;
    native: boolean;
    price: string;
    image: string;
}[] = [{
    name: "USDC",
    mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    native: false,
    price: "1",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3y11tujHLuelMv2OXcyVi2pUH7cyylMxIUQ&s"
}, {
    name: "USDT",
    mint: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
    native: false,
    price: "1",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRabOb2f4WWM5azcbEJq0-AwiHnyj4ehr9wOg&s"
}, {
    name: "SOL",
    mint: "So11111111111111111111111111111111111111112",
    native: true,
    price: "180",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH2rvI0FKxYk-l-MP9WiRkZUR4bY3qGkvz_w&s"

}]  

export const connection = new Connection("https://solana-mainnet.g.alchemy.com/v2/EspGgEsKtp6xdG1-P32lj9raEFUlgXNc");

export async function getSupportedTokens(){
    if(!LAST_UPDATED || new Date().getTime() - LAST_UPDATED < TOKEN_PRICE_REFRESH_INTERVAL){
        try {
            const response = await axios.get("https://price.jup.ag/v6/price?ids=SOL,USDC,USDT");
            prices = response.data.data;
            LAST_UPDATED = new Date().getTime();
            
        } catch (e) {
            console.log(e);
            
        }


    }
    return SUPPORTED_TOKENS.map(s => ({
        ...s,
        prices: prices[s.name].price
    }))

}

getSupportedTokens();