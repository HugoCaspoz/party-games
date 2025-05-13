"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, X, UserPlus, Users } from "lucide-react"
import Link from "next/link"
import { usePlayers } from "@/context/players-context"

export default function JugadoresPage() {
  const { players, addPlayer, removePlayer } = usePlayers()
  const [newPlayer, setNewPlayer] = useState("")

  const handleAddPlayer = () => {
    if (newPlayer.trim()) {
      addPlayer(newPlayer)
      setNewPlayer("")
    }
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="flex items-center mb-8">
          <Link href="/">
            <Button variant="ghost" size="icon" className="mr-2 text-zinc-400 hover:text-white hover:bg-zinc-800">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-light">Jugadores</h1>
        </header>

        <Card className="bg-zinc-800/50 border-0 shadow-lg mb-8 max-w-xl mx-auto">
          <CardHeader className="pb-0">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Users className="w-8 h-8 text-blue-400" />
              </div>
            </div>
            <h2 className="text-2xl font-light text-center mb-2">Añadir Jugadores</h2>
            <p className="text-zinc-400 text-center text-sm mb-4">
              Añade los nombres de los jugadores para personalizar el juego
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-8">
              <Input
                placeholder="Nombre del jugador"
                value={newPlayer}
                onChange={(e) => setNewPlayer(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddPlayer()}
                className="bg-zinc-700/50 border-zinc-600 text-white placeholder:text-zinc-500 focus-visible:ring-blue-500"
              />
              <Button onClick={handleAddPlayer} className="bg-blue-500/80 hover:bg-blue-600 text-white border-0">
                <UserPlus className="h-4 w-4" />
              </Button>
            </div>

            {players.length > 0 ? (
              <div>
                <h3 className="text-sm text-zinc-400 mb-3">Jugadores ({players.length})</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {players.map((player, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-zinc-800 rounded-lg border border-zinc-700"
                    >
                      <span className="font-light">{player}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removePlayer(index)}
                        className="h-8 w-8 hover:bg-zinc-700 text-zinc-400 hover:text-white"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center p-6 bg-zinc-800 rounded-lg border border-zinc-700">
                <p className="text-zinc-400">No hay jugadores añadidos todavía.</p>
              </div>
            )}

            <div className="mt-8 text-center">
              <Link href="/">
                <Button className="bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700">
                  Volver al Inicio
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
