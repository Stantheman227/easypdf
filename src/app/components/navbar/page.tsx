"use client";
import { useState } from "react";
import Link from "next/link";
import UserMenu from "../UserMenu/page";

export default function navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex space-x-10 w-full items-center max-h-[73px] z-20">
      {/* Large Screen */}
      <div className="hidden w-full ml-10 mr-10 md:flex space-x-10 md:justify-between items-center">
        <div className="text-2xl text-easy-blue font-bold">
          <UserMenu />
        </div>
        <Link href="/">
          <button className="rounded-lg font-bold text-2xl text-easy-blue hover:opacity-50">
            easyPDF
          </button>
        </Link>
        <Link href="/faqpreis">
          <button className="rounded-lg font-bold text-2xl text-easy-blue hover:opacity-50">
            Erklärung & Preis
          </button>
        </Link>
        <Link href="/">
          <button className="rounded-lg font-bold text-2xl text-easy-blue hover:opacity-50">
            About
          </button>
        </Link>
      </div>

      {/* Small Screen */}
      <div className="md:hidden flex justify-around items-center space-x-10 w-full">
        <div className="text-2xl text-easy-blue font-bold">
          <UserMenu />
        </div>
        <div className="text-2xl text-easy-blue font-bold">
          <div className={`nav-button ${isOpen ? 'active' : ''}`} onClick={toggleNav}>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
          {isOpen && (
            <div className=" absolute top-[35px] right-[7px] flex flex-col items-center w-48 mt-12 rounded-lg bg-white shadow-lg p-5 border border-gray-300 divide-y-2">
              <Link href="/">
                <button className="rounded-lg font-bold text-2xl text-easy-blue block p-4 hover:bg-blue-100">
                  easyPDF
                </button>
              </Link>
              <Link href="/faqpreis">
                <button className="rounded-lg font-bold text-2xl text-easy-blue block p-4 hover:bg-blue-100">
                  Erklärung & Preis
                </button>
              </Link>
              <Link href="/">
                <button className="rounded-lg font-bold text-2xl text-easy-blue block p-4 hover:bg-blue-100">
                  About
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
