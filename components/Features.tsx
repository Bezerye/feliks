import { AppleIcon, TrophyIcon, ZapIcon } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

export default function Features() {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Why Play Felix?
            </h2>
            <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Learn about nutrition while having fun. Felix makes calorie
              awareness engaging and competitive.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
          <Card className="border-orange-100 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mb-4">
                <AppleIcon className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Learn Nutrition</CardTitle>
              <CardDescription>
                Discover the calorie content of hundreds of foods and improve
                your nutritional awareness
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-orange-100 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mb-4">
                <TrophyIcon className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Compete & Win</CardTitle>
              <CardDescription>
                Challenge friends, climb leaderboards, and earn achievements for
                your nutrition knowledge
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-orange-100 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mb-4">
                <ZapIcon className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Quick & Fun</CardTitle>
              <CardDescription>
                Perfect for quick breaks. Each round takes just minutes but
                teaches you something new
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  );
}
