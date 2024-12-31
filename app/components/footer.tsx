import React from "react";
import Link from "next/link";
import { LiaUserSecretSolid } from "react-icons/lia";

export const Footer = () => {
  return (
    <footer className="w-full border-t-2 border-gray-700 z-50 bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex justify-between items-center py-1 cursor-pointer">
          <Link className="flex items-end gap-3 font-bold" href={"/"}>
            <button className="h-10 w-10 rounded-full bg-black">
              <LiaUserSecretSolid className="h-full w-full text-gray-400" />
            </button>
            <div className="flex-1 font-bold text-gray-200">COMPLAINTS.</div>
          </Link>
        </div>
      </div>
    </footer>
  );
};
