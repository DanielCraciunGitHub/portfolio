import { Toaster } from "@/components/ui/toaster";
import { Footer } from "@/components/Footer";
import NavBar from "@/components/Navbar/Navbar";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      <main className="flex min-h-screen flex-1 justify-center bg-muted">
        {children}
      </main>
      <Footer />
      <Toaster />
    </>
  );
}
