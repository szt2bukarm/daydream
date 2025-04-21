import FooterNav from "./FooterNav";
import FooterWheel from "./FooterWheel";

export default function Footer() {
    return (
        <div style={{overflow: "hidden"}}>
            <div style={{position: "fixed",width: "100%", height: "720px", bottom: "0", left: 0}}>
                <FooterNav />
            </div>
            <div style={{marginBottom: "690px"}}>
            <FooterWheel />
            </div>
        </div>
    )
}