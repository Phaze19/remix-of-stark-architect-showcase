import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.warn("404: unknown route", location.pathname);
    }
  }, [location.pathname]);

  return (
    <div className="min-h-dvh bg-background">
      <Navigation />
      <main className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-6 pt-60 pb-24 text-center md:pt-72">
        <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-rational-red">
          Error 404
        </span>
        <h1 className="mt-4 text-architectural text-4xl font-light md:text-6xl">Page not found</h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
          The page you are looking for has moved or no longer exists.
        </p>
        <a
          href="/"
          className="mt-8 inline-flex min-h-11 items-center bg-rational-red px-8 py-3.5 text-[12px] font-bold uppercase tracking-[0.18em] text-primary-foreground transition-colors duration-300 hover:bg-foreground"
        >
          Return home
        </a>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
