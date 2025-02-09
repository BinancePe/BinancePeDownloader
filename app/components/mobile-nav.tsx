import { useLocation } from "@remix-run/react";
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Link, Menu } from "lucide-react";
import { externalLinks, siteLinks } from "~/lib/constants";
import { Separator } from "./ui/separator";

export function MobileNav({ className }: { className?: string }) {
  const [open, setOpen] = React.useState(false);

  const location = useLocation();

  const handleCloseSheet = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className={className}>
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <h2 className="mb-4 text-center text-lg font-semibold">
          Site Navigation
        </h2>
        <ul className="mb-8 space-y-3">
          {siteLinks.map((link) => (
            <li key={link.href}>
              <Button
                variant={location.pathname === link.href ? "default" : "outline"}
                asChild
              >
                <Link
                  href={link.href}
                  className="w-full"
                  onClick={handleCloseSheet}
                >
                  {link.name}
                </Link>
              </Button>
            </li>
          ))}
        </ul>
        <Separator className="my-4" />
        <h2 className="mb-4 text-center text-lg font-semibold">
          External Links
        </h2>
        <ul className="space-y-3">
          {externalLinks.map((link) => (
            <li key={link.href}>
              <Button variant="outline" asChild>
                <Link
                  href={link.href}
                  className="w-full"
                  target="_blank"
                  onClick={handleCloseSheet}
                >
                  {link.name}
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
}
