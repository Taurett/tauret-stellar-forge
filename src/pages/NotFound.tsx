import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useSeo } from "@/hooks/useSeo";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  useSeo({
    title: "404 — Page Not Found · TAURET",
    description: "The page you're looking for doesn't exist on TAURET.",
    canonical: location.pathname,
    noindex: true,
  });

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" aria-hidden="true" />
      <div className="relative glass clip-angle-lg border border-primary/20 p-10 max-w-md text-center">
        <div className="font-tech text-xs uppercase tracking-[0.4em] text-primary mb-3">
          Signal Lost
        </div>
        <h1 className="font-display text-7xl font-black text-aurora mb-3">404</h1>
        <p className="text-muted-foreground mb-8">
          This route doesn't exist. Let's get you back on track.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-gradient-neon text-primary-foreground font-tech font-bold uppercase tracking-widest clip-angle px-6 py-3 text-xs hover:shadow-neon-cyan transition-shadow"
        >
          <ArrowLeft className="w-3 h-3" />
          Return Home
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
