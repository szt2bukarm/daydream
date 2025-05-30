"use client"
import Link from "next/link";
import { useTransitionRouter } from "next-view-transitions";
import navStyles from './Nav/nav.module.scss'
import { usePathname } from "next/navigation";

export default function TransitionLink({ href, children, className }) {
    const Router = useTransitionRouter();
    const pathname = usePathname();

    const animation = () => {
            document.documentElement.animate([
                { 
                    transform: "translate(0, 0) rotate(0deg) scale(1)",
                },
                { 
                    transform: "translate(250px, 400px) rotate(-2deg) scale(0.8)",
                }
            ], {
                duration: 800,
                easing: "cubic-bezier(0.76, 0, 0.24, 1)",
                fill: "forwards",
                pseudoElement: "::view-transition-old(root)",
            });
        
            document.documentElement.animate([
                {
                    transform: `translate(${window.innerWidth * -1.5}px, ${window.innerHeight}px) rotate(2deg) scale(1.2)`,
                }
            ], {
                duration: 0,
                fill: "forwards",
                pseudoElement: "::view-transition-new(root)",
            });
        
            document.documentElement.animate([
                {
                    transform: `translate(${window.innerWidth * -1.5}px, ${window.innerHeight}px) rotate(2deg) scale(1.2)`,
                },
                {
                    transform: "translate(0, 0) rotate(0deg) scale(1)",
                    opacity: 1,
                }
            ], {
                duration: 800,
                easing: "cubic-bezier(0.22, 1, 0.36, 1)",
                fill: "forwards",
                pseudoElement: "::view-transition-new(root)",
                delay: 300, 
            });    
    };
    
    return (
        <Link href={href} onClick={(e) => {
            e.preventDefault();
            if (pathname === href) return;
            const nav = document.querySelector(`.${navStyles.navWrapper}`)
            if (nav) {
                nav.style.backdropFilter = 'blur(0px)'
                setTimeout(() => {
                    nav.style.backdropFilter = 'blur(15.75px)'
                }, 500);
            }
            setTimeout(() => {
                Router.push(href, {
                    onTransitionReady: animation
                });
            }, 1);
        }} className={className}>
            {children}
        </Link>
    );
}
