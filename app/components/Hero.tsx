"use client";
import { signIn } from "next-auth/react"
import { SecondaryButton } from "./Button"

export const Hero = () => {
    return <div>
        <div className="text-5xl font-medium">
            <span>
                The Indian Crypto Exchange 
            </span>
            <span className="text-blue-500 pl-4">
                Revolution
            </span>
        </div>
        <div className="flex justify-center pt-4 text-2xl text-slate-500">
            Create a frictionless wallet from India with just a Google Account.
            
        </div>
        <div className="flex justify-center pt-2 text-2xl text-slate-500">
            Convert your INR into Cryptocurrency
        </div>
        <div className="pt-8 flex justify-center">
            <SecondaryButton onClick={() => {
                signIn("google");
            }}>Login with Google</SecondaryButton>
        </div>
    </div>
}