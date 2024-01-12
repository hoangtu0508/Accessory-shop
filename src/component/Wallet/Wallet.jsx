import React, { useState, useEffect, useContext } from "react";
import provider1 from '../../img/provider-1.png'
import provider2 from '../../img/provider-2.png'
import provider3 from '../../img/provider-3.png'
import provider4 from '../../img/provider-4.png'
import { initWeb3 } from "../../utils/utils";
import { ethers } from 'ethers';

const Wallet = () => {

    const providerArray = [
        {
            provider: provider1,
            name: "Metamask",
        },
        {
            provider: provider2,
            name: "walletConnect",
        },
        {
            provider: provider3,
            name: "walletlink",
        },
        {
            provider: provider4,
            name: "Formatic",
        },
    ];
    const initWeb3 = async () => {
        if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {

            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const walletAddress = accounts[0];
        };
    }

    const handleClickMetamask = () => {
        initWeb3()

    }
    return (
        <div className='w-full mt-12'>
            <div className='w-full'>
                <p class="text-xl font-medium">Select your wallet</p>
                <p class="text-gray-400">Connect with one of our avaliabl wallet providers or create a new one.</p>

                <div className="">
                    {providerArray.map((el, i) => (
                        <div
                            className="flex items-center gap-8 rounded-lg mt-6 border px-4 py-2 cursor-pointer transition duration-300 ease-in hover:border-2 hover:border-sky-500"
                            key={i + 1}
                            onClick={() => (el.name === "Metamask" && handleClickMetamask())}
                        >
                            <img
                                src={el.provider}
                                alt={el.provider}
                                width={50}
                                height={50}
                                className="rounded-full"
                            />
                            <p class="text-lg leading-none">{el.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Wallet;