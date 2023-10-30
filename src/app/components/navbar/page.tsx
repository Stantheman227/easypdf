import { useState } from "react";
import Link from "next/link";
import UserMenu from "../UserMenu/page";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleNav = () => setIsOpen(!isOpen);

  const navItems = [
    { text: "Home", href: "/" },
    { text: "easyPDF", href: "/easypdf" },
    { text: "About", href: "/" },
  ];

  return (
    <div className="flex space-x-10 w-full items-center max-h-[73px] z-20">
      <div className="flex w-full ml-10 mr-10 space-x-10 justify-between items-center">
        {/* Large Screen */}
        <div className="flex justify-between items-center w-full space-x-10">
          {/* User Menu */}
          <div className="text-2xl text-easy-blue font-bold">
            <UserMenu />
          </div>
          {/* Navigation Buttons */}
          {navItems.map((item, index) => (
            <Link key={index} href={item.href}>
              <button className="rounded-lg font-bold text-2xl text-easy-blue hover:opacity-50 md:flex hidden">
                {item.text}
              </button>
            </Link>
          ))}
        </div>
        {/* Small Screen */}
        <div className="md:hidden">
          <div
            className={`nav-button ${isOpen ? "active" : ""}`}
            onClick={toggleNav}
          >
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
          {isOpen && (
            <div className="absolute top-[35px] right-[7px] flex flex-col items-center w-48 mt-12 rounded-lg bg-white shadow-lg p-5 border border-gray-300 divide-y-2">
              {navItems.map((item, index) => (
                <Link key={index} href={item.href}>
                  <button className="rounded-lg font-bold text-2xl text-easy-blue block p-4 hover:bg-blue-100">
                    {item.text}
                  </button>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
