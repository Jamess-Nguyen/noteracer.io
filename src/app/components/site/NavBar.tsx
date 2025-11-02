"use client";
import Link from "next/link";
import * as React from "react";

type NavBarProps = { rightSlot?: React.ReactNode };

export function NavBar({ rightSlot }: NavBarProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/70 dark:bg-zinc-950/60 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="h-16 flex items-center justify-between">
          <Link href="/" className="font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            NoteRacer.io
          </Link>

          <div className="flex items-center gap-2">
            <button
              className="inline-flex items-center rounded-md px-3 py-2 text-sm font-medium text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white md:hidden"
              aria-label="Open menu"
              type="button"
            >
              Menu
            </button>

            <div className="hidden md:flex items-center">{rightSlot}</div>
          </div>
        </nav>
      </div>
    </header>
  );
}
