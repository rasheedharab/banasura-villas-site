import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-content flex-col items-start justify-center gap-6 px-gutter">
      <div className="eyebrow">Page not found</div>
      <h1 className="m-0 font-serif text-h2 font-semibold">
        This path leads nowhere. <span className="accent">The pool is this way.</span>
      </h1>
      <Button asChild>
        <Link to="/">Back to Banasura Villas</Link>
      </Button>
    </main>
  );
}
