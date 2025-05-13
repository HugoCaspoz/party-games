"use client"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Wine, Bomb, Shuffle, Users } from "lucide-react"
import { InstallPWA } from "@/components/install-pwa"

export default function HomePage() {
  // Estado para rastrear qué tarjeta tiene hover
  const [hoverCard, setHoverCard] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-zinc-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-light mb-3">Drinking Hunger Games</h1>
          <div className="w-20 h-1 bg-white/20 mx-auto mb-3"></div>
          <p className="text-xl text-zinc-400">Leña al Mono🐒🪵🪓</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Link
            href="/yo-nunca"
            className="block relative"
            onMouseEnter={() => setHoverCard("yo-nunca")}
            onMouseLeave={() => setHoverCard(null)}
          >
            <Card
              className={`bg-transparent border border-zinc-700 transition-all duration-300 overflow-hidden h-full ${
                hoverCard === "yo-nunca" ? "border-pink-500/50" : ""
              }`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br from-pink-500/10 to-pink-700/10 transition-opacity duration-300 pointer-events-none ${
                  hoverCard === "yo-nunca" ? "opacity-100" : "opacity-0"
                }`}
              ></div>
              <CardContent className="p-8 flex flex-col items-center text-center relative z-10">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-colors duration-300 ${
                    hoverCard === "yo-nunca" ? "bg-pink-500/20" : "bg-pink-500/10"
                  }`}
                >
                  <Wine className="w-8 h-8 text-pink-400" />
                </div>
                <h2
                  className={`text-2xl font-light mb-3 transition-colors duration-300 ${
                    hoverCard === "yo-nunca" ? "text-pink-300" : "text-white"
                  }`}
                >
                  Yo Nunca
                </h2>
                <p
                  className={`transition-colors duration-300 ${
                    hoverCard === "yo-nunca" ? "text-zinc-300" : "text-zinc-400"
                  }`}
                >
                  Descubre secretos con frases divertidas y picantes
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link
            href="/tic-tac"
            className="block relative"
            onMouseEnter={() => setHoverCard("tic-tac")}
            onMouseLeave={() => setHoverCard(null)}
          >
            <Card
              className={`bg-transparent border border-zinc-700 transition-all duration-300 overflow-hidden h-full ${
                hoverCard === "tic-tac" ? "border-red-500/50" : ""
              }`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br from-red-500/10 to-red-700/10 transition-opacity duration-300 pointer-events-none ${
                  hoverCard === "tic-tac" ? "opacity-100" : "opacity-0"
                }`}
              ></div>
              <CardContent className="p-8 flex flex-col items-center text-center relative z-10">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-colors duration-300 ${
                    hoverCard === "tic-tac" ? "bg-red-500/20" : "bg-red-500/10"
                  }`}
                >
                  <Bomb className="w-8 h-8 text-red-400" />
                </div>
                <h2
                  className={`text-2xl font-light mb-3 transition-colors duration-300 ${
                    hoverCard === "tic-tac" ? "text-red-300" : "text-white"
                  }`}
                >
                  Tic-Tac
                </h2>
                <p
                  className={`transition-colors duration-300 ${
                    hoverCard === "tic-tac" ? "text-zinc-300" : "text-zinc-400"
                  }`}
                >
                  Responde preguntas antes de que la bomba explote
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link
            href="/ruleta"
            className="block relative"
            onMouseEnter={() => setHoverCard("ruleta")}
            onMouseLeave={() => setHoverCard(null)}
          >
            <Card
              className={`bg-transparent border border-zinc-700 transition-all duration-300 overflow-hidden h-full ${
                hoverCard === "ruleta" ? "border-violet-500/50" : ""
              }`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br from-violet-500/10 to-violet-700/10 transition-opacity duration-300 pointer-events-none ${
                  hoverCard === "ruleta" ? "opacity-100" : "opacity-0"
                }`}
              ></div>
              <CardContent className="p-8 flex flex-col items-center text-center relative z-10">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-colors duration-300 ${
                    hoverCard === "ruleta" ? "bg-violet-500/20" : "bg-violet-500/10"
                  }`}
                >
                  <Shuffle className="w-8 h-8 text-violet-400" />
                </div>
                <h2
                  className={`text-2xl font-light mb-3 transition-colors duration-300 ${
                    hoverCard === "ruleta" ? "text-violet-300" : "text-white"
                  }`}
                >
                  La Ruleta
                </h2>
                <p
                  className={`transition-colors duration-300 ${
                    hoverCard === "ruleta" ? "text-zinc-300" : "text-zinc-400"
                  }`}
                >
                  Gira la ruleta y descubre tu próximo reto
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link
            href="/jugadores"
            className="block relative"
            onMouseEnter={() => setHoverCard("jugadores")}
            onMouseLeave={() => setHoverCard(null)}
          >
            <Card
              className={`bg-transparent border border-zinc-700 transition-all duration-300 overflow-hidden h-full ${
                hoverCard === "jugadores" ? "border-blue-500/50" : ""
              }`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-700/10 transition-opacity duration-300 pointer-events-none ${
                  hoverCard === "jugadores" ? "opacity-100" : "opacity-0"
                }`}
              ></div>
              <CardContent className="p-8 flex flex-col items-center text-center relative z-10">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-colors duration-300 ${
                    hoverCard === "jugadores" ? "bg-blue-500/20" : "bg-blue-500/10"
                  }`}
                >
                  <Users className="w-8 h-8 text-blue-400" />
                </div>
                <h2
                  className={`text-2xl font-light mb-3 transition-colors duration-300 ${
                    hoverCard === "jugadores" ? "text-blue-300" : "text-white"
                  }`}
                >
                  Jugadores
                </h2>
                <p
                  className={`transition-colors duration-300 ${
                    hoverCard === "jugadores" ? "text-zinc-300" : "text-zinc-400"
                  }`}
                >
                  Añade y gestiona los nombres de los jugadores
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="mt-12 text-center">
          <InstallPWA />
        </div>

        <footer className="mt-16 text-center text-zinc-500 text-sm">
          <p>Recuerda beber con responsabilidad. Solo para mayores de 18 años.</p>
        </footer>
      </div>
    </div>
  )
}
