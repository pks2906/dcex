"use client"

import { useState } from "react"
import { SUPPORTED_TOKENS, TokenDetails } from "../lib/tokens"

export function Swap({ publicKey }: {
    publicKey: string
}) {
    const [baseAsset, setBaseAsset] = useState(SUPPORTED_TOKENS[0])
    const [quoteAsset, setQuoteAsset] = useState(SUPPORTED_TOKENS[1])

    return <div>
        <SwapInputRow onSelect={(asset) => {
            setBaseAsset(asset)
        }} selectedToken={baseAsset} title={"You pay"} />

        <SwapInputRow onSelect={(asset) => {
            setQuoteAsset(asset)
        }} selectedToken={quoteAsset} title={"You receive"} />


    </div>
}

function SwapInputRow({ onSelect, selectedToken, title }: {
    onSelect: (asset: TokenDetails) => void;
    selectedToken: TokenDetails
    title: string
}) {
    return <div className="border flex justify-between p-4">
        <div>
            {title}
            <AssestSelector selectedToken={selectedToken} onSelect={onSelect} />
        </div>
    </div>
}

function AssestSelector({ selectedToken, onSelect }: {
    selectedToken: TokenDetails;
    onSelect: (asset: TokenDetails) => void;
}) {
    return <div>
        <select onChange={(e) => {
            const selectedToken = SUPPORTED_TOKENS.find(x => x.name === e.target.value);
            if(selectedToken){
                onSelect(selectedToken);

            }
        }} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
            
            {SUPPORTED_TOKENS.map(token => <option>
                {token.name}
            </option>)}
        </select>
    </div>

}