import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-24">
      <Separator />
      <div className="mx-auto max-w-5xl px-6 py-16 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} KyroBlog. All rights reserved.</p>
        <div className="flex items-center gap-2">
          <Button variant="link" size="sm" asChild>
            <Link
              href="https://github.com/kasimthecoder"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </Link>
          </Button>
          <Button variant="link" size="sm" asChild>
            <Link
              href="https://x.com/kasimthecoder"
              target="_blank"
              rel="noreferrer"
            >
              X
            </Link>
          </Button>
          <Button variant="link" size="sm" asChild>
            <Link href="/">Home</Link>
          </Button>
        </div>
      </div>
    </footer>
  );
}
