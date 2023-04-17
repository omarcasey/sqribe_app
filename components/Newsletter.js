"use client"
import React, { useState } from 'react'
import { db } from '../firebase'
import { collection, addDoc } from "firebase/firestore"; 
import { motion } from 'framer-motion'
import Image from 'next/image'

const Newsletter = () => {
    const [email, setEmail] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await addDoc(collection(db, "emails"), { email });
            setEmail('')
            alert('Email successfully captured')
        } catch (err) {
            console.error('Error capturing email: ', err)
        }
    }

    return (
        <section class="py-12 sm:pb-16 lg:pb-20 xl:pb-24 overflow-hidden sm:overflow-visible" id='newsletter'>
            <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                <div class="flex">
                    <div class="w-1/2 pr-1">
                        <p class="text-sm font-normal tracking-widest text-gray-300 uppercase">Unlock the Future of YouTube Content Creation</p>
                        <h1 class="mt-6 text-4xl font-light text-white sm:mt-10 sm:text-5xl lg:text-6xl pr-8">Join the waitlist for early access!</h1>
                        <form onSubmit={handleSubmit} class="relative mt-8 rounded-full sm:mt-12">
                            <div class="relative">
                                <div class="absolute rounded-full -inset-px bg-white"></div>
                                <div class="relative">
                                    <div class="absolute inset-y-0 left-0 flex items-center pl-6">
                                        <Image className='w-5 h-5 invert opacity-30' src='/email-icon.svg' width={20} height={20} />
                                    </div>
                                    <input type="email" name="" id="" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} class="block w-full py-4 pr-6 text-white placeholder-gray-500 bg-black border border-transparent rounded-full pl-14 sm:py-5 focus:border-transparent focus:ring-0" />
                                </div>
                            </div>
                            <div class="sm:absolute flex sm:right-1.5 sm:inset-y-1.5 mt-4 sm:mt-0">
                                <button type="submit" class="inline-flex items-center justify-center w-full px-5 py-5 text-sm font-semibold tracking-widest text-white uppercase transition-all duration-200 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full sm:w-auto sm:py-3 hover:opacity-90">Get Notified</button>
                            </div>
                        </form>
                        <div>
                            <div class="inline-flex items-center pt-6 mt-8 border-t border-gray-800 sm:pt-10 sm:mt-14">
                                <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke-width="1.5" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13 7.00003H21M21 7.00003V15M21 7.00003L13 15L9 11L3 17" stroke="url(#a)" stroke-linecap="round" stroke-linejoin="round" />
                                    <defs>
                                        <linearGradient id="a" x1="3" y1="7.00003" x2="22.2956" y2="12.0274" gradientUnits="userSpaceOnUse">
                                            <stop offset="0%" style={{ stopColor: '#06B6D4' }} />
                                            <stop offset="100%" style={{ stopColor: '#7C3AED' }} />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <span class="ml-2 text-base font-normal text-white"> Exclusive Discounts for Early Adopters </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center w-1/2 px-12 relative">
                        <div className="absolute inset-0">
                            <svg
                                class="blur-3xl filter opacity-70"
                                style={{ filter: "blur(64px)" }}
                                width="444"
                                height="536"
                                viewBox="0 0 444 536"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M225.919 112.719C343.98 64.6648 389.388 -70.487 437.442 47.574C485.496 165.635 253.266 481.381 135.205 529.435C17.1445 577.488 57.9596 339.654 9.9057 221.593C-38.1482 103.532 107.858 160.773 225.919 112.719Z"
                                    fill="url(#c)"
                                />
                                <defs>
                                    <linearGradient
                                        id="c"
                                        x1="82.7339"
                                        y1="550.792"
                                        x2="-39.945"
                                        y2="118.965"
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop offset="0%" stopColor="#00B4D8" />
                                        <stop offset="100%" stopColor="#7B2CBF" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                        <motion.div
                            className="z-10 absolute left-28"
                            animate={{ y: [-10, 10] }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "easeInOut",
                            }}
                        >
                            <Image
                                width={1024}
                                height={1024}
                                className="w-full mx-auto filter saturate-150"
                                src="/new logo transparent.png"
                                alt=""
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Newsletter