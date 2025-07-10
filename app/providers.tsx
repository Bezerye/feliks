"use client";

import { GameProvider } from "@/context/gameContext";

export default function Providers({ children }: React.PropsWithChildren) {
  return <GameProvider>{children}</GameProvider>;
}
