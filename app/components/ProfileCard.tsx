"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PrimaryButton } from "./Button";
import { useEffect, useState } from "react";

export const ProfileCard = ({publicKey}: {  
    publicKey: string
}) => { 
    const session = useSession(); 
    const router = useRouter();

    if (session.status === "loading") {
        //TODO: replace with a skeleton 
        return <div>
            Loading...
        </div>
    }

    if (!session.data?.user){
        router.push("/")
        return null

    }
    return <div className="pt-8 flex justify-center">
        <div className="max-w-4xl bg-white rounded shadow w-full p-12">
            <Greeting
                image={session.data?.user?.image ?? ""} 
                name={session.data?.user?.name ?? ""} 
             />
             <Assets publicKey={publicKey}/>


        </div>
        
    </div>
}

function Assets({publicKey}: {
    publicKey: string
}) {
    const [copied, setCopied] = useState(false);

    useEffect(()=> {
        
        
        if (copied){
            let timeout = setTimeout(()=> {
                setCopied(false)
            }, 3000)
            return () => {
                clearTimeout(timeout);
            }

        }
    }, [copied])
    return <div className="text-slate-500 mt-4">
        Account assets
        <br />
        <div className="flex justify-between">
            <div>

            </div>

            <div>
                <PrimaryButton onClick={() => {
                    navigator.clipboard.writeText(publicKey)
                    setCopied(true)

                }}>{copied ? "Copied" : "Your wallet address"}</PrimaryButton>
            </div>
        </div>
    </div>
}

function Greeting({
    image, name
}: {
    image: string, name: string
}) {
    return <div className="flex">
        <img src={image} className="rounded-full w-16 h-16 mr-4" />
        <div className="text-2xl font-semibold flex flex-col justify-center">
            Welcome back, {name}
        </div>
    </div>
}

//TODO - 2:26:31