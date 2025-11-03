"use client";
import Link from "next/link";
import * as React from "react";

type NavBarProps = { 
  leftLogo: string
  rightNav: React.ReactNode 
};

export function TwoItemNavBar({ leftLogo, rightNav }: NavBarProps) {
  return (
    <header >
      <div className="mx-auto max-w-screen-lg px-4">
        <nav className="h-18 flex items-center justify-between">
          <Link href="/">
            <b>[ {leftLogo} ]</b>
          </Link>

          <div className="flex items-center">
            <button
              className="px-3 py-2 text-sm md:hidden"
              type="button"
              aria-label={leftLogo}
            >
              Menu
            </button>

            <div className="flex items-center">
              {rightNav}
            </div>
            
          </div>
        </nav>
      </div>
    </header>
  );
}
