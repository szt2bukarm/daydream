"use client"
import { useStore } from "@/useStore";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRouter } from "next/navigation";

export default function TransitionLink3D({href,children}: {href:string,children:React.ReactNode}) {
    const {setPageTransition,fadelayer} = useStore()
    const router = useRouter();

    const handleClick = (e:any) => {
        e.preventDefault();
        setPageTransition(true)
        gsap.to(fadelayer, {
            opacity: 1,
            duration: 0.3,
            delay: 0.4,
            onComplete: () => {
                router.push(href)
            }
        })
        gsap.to(fadelayer, {
            opacity: 0,
            duration: 0.5,
            delay: 1.2,
        })
        // setTimeout(() => {
        //     setPageTransition(false)
        // }, 2750);
    }

    return (
        <Link href={href} onClick={(e) => {handleClick(e)}}>
            {children}
        </Link>
    )
}