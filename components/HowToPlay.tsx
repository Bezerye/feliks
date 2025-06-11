export default function HowToPlay() {
  return (
    <section
      id="how-to-play"
      className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-orange-50 to-red-50"
    >
      <div className="container px-4 mx-auto md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              How to Play
            </h2>
            <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Simple rules, endless fun. Here&apos;s how Felix works:
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              1
            </div>
            <h3 className="text-xl font-bold">See the Food</h3>
            <p className="text-gray-600">
              We show you a delicious food item with a clear photo and
              description
            </p>
            <div className="text-4xl">🍔</div>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              2
            </div>
            <h3 className="text-xl font-bold">Make Your Guess</h3>
            <p className="text-gray-600">
              Choose from multiple calorie options or enter your own estimate
            </p>
            <div className="text-4xl">🤔</div>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              3
            </div>
            <h3 className="text-xl font-bold">Learn & Score</h3>
            <p className="text-gray-600">
              Get instant feedback, learn the correct answer, and earn points
              for accuracy
            </p>
            <div className="text-4xl">🎉</div>
          </div>
        </div>
      </div>
    </section>
  );
}
