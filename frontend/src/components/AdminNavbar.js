import Link from "next/link";
import { ShieldCheck, LogOut, ArrowLeft, ExternalLink } from "lucide-react";

export default function AdminNavbar() {
    return (
        <nav className="fixed top-0 w-full z-[100] bg-[#4a0808] shadow-xl border-b border-[#2d0404]">
            <div className="max-w-screen-2xl mx-auto px-6 py-3 flex justify-between items-center transition-all duration-300">
                {/* Logo and Name */}
                <div className="flex items-center gap-4">
                    <ShieldCheck size={28} className="text-[#d4af37]" />
                    <span className="text-xl font-bold text-white tracking-wider font-serif">
                        Mandal Admin Portal
                    </span>
                </div>

                {/* Links */}
                <div className="flex items-center gap-6 text-sm font-semibold tracking-wide">
                    {/* View Live Site Button */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-white hover:text-[#fceabb] transition-colors py-2 px-4 rounded hover:bg-[#6b0b0b]"
                    >
                        <ExternalLink size={18} />
                        View Live Site
                    </Link>
                </div>
            </div>
        </nav>
    );
}
