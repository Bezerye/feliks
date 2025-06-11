import { HeartIcon, PlayIcon, UsersIcon, ZapIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export default function Hero() {
  return (
    <section className="w-full center py-12 md:py-24 lg:py-32 bg-gradient-to-br from-orange-50 to-red-50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Guess the Calories with{" "}
                <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Felix
                </span>
              </h1>
              <p className="max-w-[600px] text-gray-600 md:text-xl">
                Test your nutrition knowledge! Can you guess how many calories
                are in your favorite foods? Challenge yourself and compete with
                friends in this fun and educational guessing game.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              >
                <PlayIcon className="mr-2 h-4 w-4" />
                Start Playing
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-orange-200 hover:bg-orange-50"
              >
                View Leaderboard
              </Button>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <HeartIcon className="h-4 w-4" />
                <span>Fun & educational</span>
              </div>
              <div className="flex items-center gap-1">
                <UsersIcon className="h-4 w-4" />
                <span>Play with friends</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="w-80 h-80 bg-gradient-to-br from-orange-200 to-red-200 rounded-full flex items-center justify-center">
                <div className="w-64 h-64 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="text-6xl">🍕</div>
                    <div className="space-y-2">
                      <p className="text-lg font-semibold text-gray-800">
                        How many calories?
                      </p>
                      <div className="flex gap-2 justify-center">
                        <Badge variant="outline">285</Badge>
                        <Badge variant="outline">420</Badge>
                        <Badge variant="outline">650</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                <ZapIcon className="h-8 w-8 text-yellow-800" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
