import { AppleIcon } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
          <AppleIcon className="h-3 w-3 text-white" />
        </div>
        <p className="text-xs text-gray-600">
          © {new Date().getFullYear()} Felix Calorie Game. All rights reserved.
        </p>
      </div>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link
          href="/privacy"
          className="text-xs hover:underline underline-offset-4 text-gray-600"
        >
          Privacy Policy
        </Link>
        <Link
          href="/terms"
          className="text-xs hover:underline underline-offset-4 text-gray-600"
        >
          Terms of Service
        </Link>
        <Link
          href="/contact"
          className="text-xs hover:underline underline-offset-4 text-gray-600"
        >
          Contact
        </Link>
      </nav>
    </footer>
  );
}
