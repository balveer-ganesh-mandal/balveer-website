import AdminNavbar from "@/components/AdminNavbar";

export const metadata = {
    title: "Admin Panel | Balveer Ganesh Mandal",
    description: "Secure management portal for Balveer Ganesh Mandal.",
};

export default function AdminLayout({ children }) {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Exclusive Admin Navigation Bar */}
            <AdminNavbar />

            {/* Content wrapper with padding to account for fixed navbar */}
            <div className="flex-grow pt-16 bg-[#fffdfc]">
                {children}
            </div>
        </div>
    );
}
