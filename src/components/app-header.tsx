
import { HeartPulse } from "lucide-react";

export function AppHeader() {
  return (
    <header className="border-b">
      <div className="container mx-auto flex h-20 items-center gap-4 px-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <HeartPulse className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground font-headline sm:text-3xl">
          Blood Pressure Log
        </h1>
      </div>
    </header>
  );
}
