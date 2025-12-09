import Navbar from "@/app/(site)/components/Navbar";
import Footer from "@/app/(site)/components/Footer";

export default function SiteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section>
            <div className={`flex min-h-screen flex-col`}>
                <Navbar />
                <main className="mb-20 flex-grow overflow-auto">
                    {children}
                </main>
                <Footer />
            </div>
        </section>
    );
}
