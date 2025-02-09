import { cn } from "~/lib/utils";
import { MobileNav } from "./mobile-nav";

export function Navbar() {
    return (
      <header className="h-fit w-full">
        <nav
          className={cn(
            "z-50",
            "flex h-[3.5rem] px-4",
            "w-full items-center border-b bg-accent/20"
          )}
        >
          <div className="hidden select-none text-xl font-extrabold uppercase md:block">
            BinancePe
          </div>
          <MobileNav className="md:hidden" />
          <div className="ml-auto flex items-center gap-4">
            
          </div>
        </nav>
      </header>
    );
  }