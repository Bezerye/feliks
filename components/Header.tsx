import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { AppleIcon } from "lucide-react";

export default function Header() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <Link href="/" className="flex items-center justify-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
          <AppleIcon className="h-4 w-4 text-white" />
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          Felix
        </span>
      </Link>
      <NavigationMenu className="ml-auto">
        <NavigationMenuList className="flex gap-4">
          <NavigationMenuItem>
            <Link href="/#features" className="text-sm font-medium">
              Features
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/#how-to-play" className="text-sm font-medium">
              How to Play
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/#Leaderboard" className="text-sm font-medium">
              Leaderboard
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/dashboard" className="text-sm font-medium">
              Dashboard
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}
