import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";


const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8">
      <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
        <div className="flex items-center">
          <img src="/assets/check.png" alt="Logo" className="w-8 h-8 mr-2" />
          <h1 className="text-2xl font-bold">Task Manager</h1>
        </div>
        <div className="ml-auto flex items-center">
          <div className="hidden md:flex gap-2">
            <Link
              to="/"
              className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50 mr-6"
            >
              Dashboard
            </Link>
            <Button variant="outline" className="justify-self-end px-2 py-1 mr-3">
              Sign in
            </Button>
            <Button className="justify-self-end px-2 py-1">Sign Up</Button>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </header>
      {isOpen && (
        <div className="md:hidden">
          <div className="flex flex-col items-center space-y-2">
            <Link
              to="/"
              className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
            >
              Dashboard
            </Link>
            <Button variant="outline" className="justify-self-end px-2 py-1">
              Sign in
            </Button>
            <Button className="justify-self-end px-2 py-1">Sign Up</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;