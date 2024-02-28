import Navbar from "./components/Shared/Navbar";
import Footer from "./components/Shared/Footer";

export default function SiteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section>
            <div className={`flex min-h-screen flex-col`}>
                <Navbar />
                <main className="mb-20 flex-grow">{children}</main>
                <Footer />
            </div>
        </section>
    );
}
