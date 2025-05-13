"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type PlayersContextType = {
  players: string[]
  addPlayer: (name: string) => void
  removePlayer: (index: number) => void
  getRandomPlayer: () => string
  getRandomPlayerExcept: (exceptName: string) => string
}

const PlayersContext = createContext<PlayersContextType | undefined>(undefined)

export function PlayersProvider({ children }: { children: ReactNode }) {
  const [players, setPlayers] = useState<string[]>([])

  // Cargar jugadores del localStorage al iniciar
  useEffect(() => {
    const savedPlayers = localStorage.getItem("partyGamePlayers")
    if (savedPlayers) {
      try {
        setPlayers(JSON.parse(savedPlayers))
      } catch (e) {
        console.error("Error loading players from localStorage", e)
      }
    }
  }, [])

  // Guardar jugadores en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem("partyGamePlayers", JSON.stringify(players))
  }, [players])

  const addPlayer = (name: string) => {
    if (name.trim() && !players.includes(name.trim())) {
      setPlayers([...players, name.trim()])
    }
  }

  const removePlayer = (index: number) => {
    const newPlayers = [...players]
    newPlayers.splice(index, 1)
    setPlayers(newPlayers)
  }

  const getRandomPlayer = () => {
    if (players.length === 0) return "alguien"
    const randomIndex = Math.floor(Math.random() * players.length)
    return players[randomIndex]
  }

  const getRandomPlayerExcept = (exceptName: string) => {
    if (players.length <= 1) return "alguien"
    const filteredPlayers = players.filter((player) => player !== exceptName)
    const randomIndex = Math.floor(Math.random() * filteredPlayers.length)
    return filteredPlayers[randomIndex]
  }

  return (
    <PlayersContext.Provider value={{ players, addPlayer, removePlayer, getRandomPlayer, getRandomPlayerExcept }}>
      {children}
    </PlayersContext.Provider>
  )
}

export function usePlayers() {
  const context = useContext(PlayersContext)
  if (context === undefined) {
    throw new Error("usePlayers must be used within a PlayersProvider")
  }
  return context
}
