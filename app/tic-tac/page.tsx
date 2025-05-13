"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Clock, Bomb, ArrowRight, Check, X } from "lucide-react"
import Link from "next/link"
import { usePlayers } from "@/context/players-context"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Preguntas de trivia con opciones múltiples
const triviaQuestions = [
  {
    question: "¿Cuál es la capital de Francia?",
    options: ["Madrid", "Berlín", "París", "Roma"],
    correctAnswer: "París",
    category: "Geografía",
  },
  {
    question: "¿Cuántos planetas hay en el sistema solar?",
    options: ["7", "8", "9", "10"],
    correctAnswer: "8",
    category: "Astronomía",
  },
  {
    question: "¿En qué año comenzó la Segunda Guerra Mundial?",
    options: ["1935", "1939", "1941", "1945"],
    correctAnswer: "1939",
    category: "Historia",
  },
  {
    question: "¿Cuál es el animal terrestre más grande?",
    options: ["Elefante africano", "Jirafa", "Hipopótamo", "Rinoceronte"],
    correctAnswer: "Elefante africano",
    category: "Animales",
  },
  {
    question: "¿Cuál es el elemento químico con símbolo H?",
    options: ["Helio", "Hidrógeno", "Hierro", "Hafnio"],
    correctAnswer: "Hidrógeno",
    category: "Ciencia",
  },
  {
    question: "¿Quién pintó La Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Miguel Ángel"],
    correctAnswer: "Leonardo da Vinci",
    category: "Arte",
  },
  {
    question: "¿Cuál es el río más largo del mundo?",
    options: ["Amazonas", "Nilo", "Misisipi", "Yangtsé"],
    correctAnswer: "Nilo",
    category: "Geografía",
  },
  {
    question: "¿Cuántos huesos tiene el cuerpo humano adulto?",
    options: ["186", "206", "226", "246"],
    correctAnswer: "206",
    category: "Anatomía",
  },
  {
    question: "¿En qué año llegó el hombre a la Luna?",
    options: ["1965", "1969", "1971", "1975"],
    correctAnswer: "1969",
    category: "Historia",
  },
  {
    question: "¿Cuál es el metal más caro del mundo?",
    options: ["Oro", "Platino", "Rodio", "Paladio"],
    correctAnswer: "Rodio",
    category: "Ciencia",
  },
  {
    question: "¿Cuál es el país más pequeño del mundo?",
    options: ["Mónaco", "Vaticano", "San Marino", "Liechtenstein"],
    correctAnswer: "Vaticano",
    category: "Geografía",
  },
  {
    question: "¿Quién escribió Don Quijote de la Mancha?",
    options: ["Miguel de Cervantes", "Federico García Lorca", "Gabriel García Márquez", "Pablo Neruda"],
    correctAnswer: "Miguel de Cervantes",
    category: "Literatura",
  },
  {
    question: "¿Cuál es el océano más grande?",
    options: ["Atlántico", "Índico", "Pacífico", "Ártico"],
    correctAnswer: "Pacífico",
    category: "Geografía",
  },
  {
    question: "¿Cuántos lados tiene un hexágono?",
    options: ["5", "6", "7", "8"],
    correctAnswer: "6",
    category: "Matemáticas",
  },
  {
    question: "¿Cuál es el animal más rápido del mundo?",
    options: ["Guepardo", "Águila", "Delfín", "Antílope"],
    correctAnswer: "Guepardo",
    category: "Animales",
  },
  {
    question: "¿En qué año se descubrió América?",
    options: ["1482", "1492", "1502", "1512"],
    correctAnswer: "1492",
    category: "Historia",
  },
  {
    question: "¿Cuál es el planeta más cercano al Sol?",
    options: ["Venus", "Mercurio", "Marte", "Tierra"],
    correctAnswer: "Mercurio",
    category: "Astronomía",
  },
  {
    question: "¿Quién es el autor de la teoría de la relatividad?",
    options: ["Isaac Newton", "Albert Einstein", "Stephen Hawking", "Galileo Galilei"],
    correctAnswer: "Albert Einstein",
    category: "Ciencia",
  },
  {
    question: "¿Cuál es la montaña más alta del mundo?",
    options: ["Monte Everest", "K2", "Mont Blanc", "Aconcagua"],
    correctAnswer: "Monte Everest",
    category: "Geografía",
  },
  {
    question: "¿Cuántos continentes hay en el mundo?",
    options: ["5", "6", "7", "8"],
    correctAnswer: "5",
    category: "Geografía",
  },
  {
    question: "¿Cuál es el deporte más popular del mundo?",
    options: ["Fútbol", "Baloncesto", "Tenis", "Cricket"],
    correctAnswer: "Fútbol",
    category: "Deportes",
  },
  {
    question: "¿Cuál es el país con mayor población?",
    options: ["India", "China", "Estados Unidos", "Indonesia"],
    correctAnswer: "China",
    category: "Geografía",
  },
  {
    question: "¿Cuántos dientes tiene un adulto?",
    options: ["28", "30", "32", "36"],
    correctAnswer: "32",
    category: "Anatomía",
  },
  {
    question: "¿Cuál es el símbolo químico del oro?",
    options: ["Or", "Au", "Go", "Ar"],
    correctAnswer: "Au",
    category: "Ciencia",
  },
  {
    question: "¿En qué año terminó la Segunda Guerra Mundial?",
    options: ["1943", "1944", "1945", "1946"],
    correctAnswer: "1945",
    category: "Historia",
  },
  {
    question: "¿Cuál es el animal nacional de Australia?",
    options: ["Koala", "Canguro", "Emú", "Ornitorrinco"],
    correctAnswer: "Canguro",
    category: "Animales",
  },
  {
    question: "¿Cuántas patas tiene una araña?",
    options: ["6", "8", "10", "12"],
    correctAnswer: "8",
    category: "Animales",
  },
  {
    question: "¿Quién escribió Romeo y Julieta?",
    options: ["William Shakespeare", "Charles Dickens", "Jane Austen", "Oscar Wilde"],
    correctAnswer: "William Shakespeare",
    category: "Literatura",
  },
  {
    question: "¿Cuál es el idioma más hablado del mundo?",
    options: ["Inglés", "Español", "Chino Mandarín", "Hindi"],
    correctAnswer: "Chino Mandarín",
    category: "Idiomas",
  },
  {
    question: "¿Cuál es la capital de Japón?",
    options: ["Pekín", "Seúl", "Tokio", "Bangkok"],
    correctAnswer: "Tokio",
    category: "Geografía",
  },
  {
    question: "¿Qué planeta es conocido como el planeta rojo?",
    options: ["Venus", "Júpiter", "Marte", "Saturno"],
    correctAnswer: "Marte",
    category: "Astronomía",
  },
  {
    question: "¿Cuál es el hueso más largo del cuerpo humano?",
    options: ["Húmero", "Fémur", "Tibia", "Radio"],
    correctAnswer: "Fémur",
    category: "Anatomía",
  },
  {
    question: "¿Cuál es el instrumento musical más antiguo?",
    options: ["Flauta", "Tambor", "Arpa", "Lira"],
    correctAnswer: "Flauta",
    category: "Música",
  },
  {
    question: "¿Cuál es el país más grande del mundo por territorio?",
    options: ["China", "Estados Unidos", "Canadá", "Rusia"],
    correctAnswer: "Rusia",
    category: "Geografía",
  },
  {
    question: "¿Cuál es la bebida más consumida en el mundo después del agua?",
    options: ["Café", "Cerveza", "Té", "Refresco"],
    correctAnswer: "Té",
    category: "Gastronomía",
  },
  {
    question: "¿Cuál es el videojuego más vendido de la historia?",
    options: ["Tetris", "Minecraft", "Grand Theft Auto V", "Super Mario Bros"],
    correctAnswer: "Minecraft",
    category: "Videojuegos",
  },
  {
    question: "¿Cuál es la película más taquillera de la historia?",
    options: ["Avatar", "Avengers: Endgame", "Titanic", "Star Wars: El despertar de la fuerza"],
    correctAnswer: "Avatar",
    category: "Cine",
  },
]

// Estados del juego
type GameState = "setup" | "playing" | "exploded" | "waiting"

export default function TicTacPage() {
  const { players } = usePlayers()
  const [gameState, setGameState] = useState<GameState>("setup")
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState<(typeof triviaQuestions)[0] | null>(null)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [bombTime, setBombTime] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [explodedPlayer, setExplodedPlayer] = useState<string | null>(null)
  const [drinkCount, setDrinkCount] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const [showNextButton, setShowNextButton] = useState(false)

  // Iniciar el juego
  const startGame = () => {
    if (players.length < 2) {
      alert("Necesitas al menos 2 jugadores para jugar. Añádelos en la sección 'Jugadores'.")
      return
    }

    // Tiempo aleatorio entre 30 y 90 segundos para la bomba
    const randomTime = Math.floor(Math.random() * (90 - 30 + 1)) + 30
    setBombTime(randomTime)
    setTimeLeft(randomTime)
    setCurrentPlayerIndex(0)
    setGameState("playing")
    getNewQuestion()

    // Iniciar el temporizador
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // La bomba explotó
          clearInterval(timerRef.current as NodeJS.Timeout)
          setGameState("exploded")
          setExplodedPlayer(players[currentPlayerIndex])
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  // Obtener una nueva pregunta aleatoria
  const getNewQuestion = () => {
    const randomIndex = Math.floor(Math.random() * triviaQuestions.length)
    setCurrentQuestion(triviaQuestions[randomIndex])
    setSelectedOption(null)
    setIsCorrect(null)
  }

  // Verificar la respuesta
  const checkAnswer = (option: string) => {
    if (!currentQuestion) return

    setSelectedOption(option)
    const isAnswerCorrect = option === currentQuestion.correctAnswer

    setIsCorrect(isAnswerCorrect)

    if (isAnswerCorrect) {
      // Respuesta correcta
      setShowNextButton(true)
    } else {
      // Respuesta incorrecta
      setDrinkCount((prev) => prev + 1)
      // Esperar un momento para mostrar que la respuesta es incorrecta
      setTimeout(() => {
        getNewQuestion()
      }, 1500)
    }
  }

  // Pasar al siguiente jugador
  const nextPlayer = () => {
    setCurrentPlayerIndex((prev) => (prev + 1) % players.length)
    getNewQuestion()
    setShowNextButton(false)
    setDrinkCount(0)
  }

  // Reiniciar el juego
  const resetGame = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    setGameState("setup")
    setExplodedPlayer(null)
  }

  // Limpiar el temporizador al desmontar el componente
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  // Función para asignar letras a las opciones
  const getOptionLetter = (index: number) => {
    return String.fromCharCode(97 + index) // 97 es el código ASCII para 'a'
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
          <h1 className="text-2xl font-light">Tic-Tac</h1>
        </header>

        {gameState === "setup" && (
          <Card className="bg-zinc-800/50 border-0 shadow-lg mb-8 max-w-xl mx-auto">
            <CardContent className="p-8">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
                  <Bomb className="w-8 h-8 text-red-400" />
                </div>
              </div>

              <h2 className="text-2xl font-light mb-4 text-center">La bomba del tiempo</h2>
              <p className="mb-8 text-center text-zinc-400 leading-relaxed">
                Pásate el móvil entre los jugadores. Cada uno debe responder correctamente a una pregunta. Si fallas,
                bebes un trago y sigues intentando. Si aciertas, pasas el móvil al siguiente jugador. En algún
                momento... ¡BOOM! La bomba explotará.
              </p>

              {players.length < 2 ? (
                <div className="mb-6">
                  <Alert className="bg-zinc-800 border border-zinc-700 mb-4">
                    <AlertDescription className="text-zinc-400">
                      Necesitas al menos 2 jugadores para jugar. Añádelos en la sección "Jugadores".
                    </AlertDescription>
                  </Alert>
                  <Link href="/jugadores">
                    <Button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white border-0">
                      Añadir Jugadores
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="mb-8">
                  <h3 className="font-medium mb-3 text-zinc-300 text-center">Jugadores</h3>
                  <div className="flex flex-wrap justify-center gap-2">
                    {players.map((player, index) => (
                      <span key={index} className="px-3 py-1 bg-zinc-800 rounded-full text-sm text-zinc-300">
                        {player}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <Button
                onClick={startGame}
                className="w-full bg-red-500/80 hover:bg-red-600 text-white border-0"
                disabled={players.length < 2}
                size="lg"
              >
                Iniciar el Juego
              </Button>
            </CardContent>
          </Card>
        )}

        {gameState === "playing" && currentQuestion && (
          <div className="max-w-xl mx-auto">
            <Card className="bg-zinc-800/50 border-0 shadow-lg mb-4">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-zinc-400" />
                    <span className="text-zinc-400 text-sm">Tic-Tac...</span>
                  </div>
                  <div className="font-mono text-lg">
                    {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
                  </div>
                </div>
                <Progress
                  value={(timeLeft / bombTime) * 100}
                  className="h-1 bg-zinc-700"
                  indicatorClassName="bg-red-500"
                />
              </CardContent>
            </Card>

            <Card className="bg-zinc-800/50 border-0 shadow-lg mb-6">
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-6">
                  <div className="px-4 py-1 bg-zinc-700/50 rounded-full text-sm">
                    Turno de <span className="font-medium text-white">{players[currentPlayerIndex]}</span>
                  </div>
                </div>

                <div className="mb-8">
                  <div className="text-xs text-zinc-400 uppercase tracking-wider mb-2">{currentQuestion.category}</div>
                  <p className="text-xl font-light mb-6 text-white">{currentQuestion.question}</p>

                  <div className="grid grid-cols-1 gap-3">
                    {currentQuestion.options.map((option, index) => (
                      <Button
                        key={index}
                        onClick={() => checkAnswer(option)}
                        className={`justify-start text-left h-auto py-3 px-4 rounded-lg transition-all duration-200 ${
                          selectedOption === option
                            ? isCorrect
                              ? "bg-green-500/20 text-green-300 border border-green-500/30"
                              : "bg-red-500/20 text-red-300 border border-red-500/30"
                            : "bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white"
                        }`}
                        disabled={selectedOption !== null}
                      >
                        <span className="font-mono mr-3 text-zinc-400">{getOptionLetter(index)})</span> {option}
                      </Button>
                    ))}
                  </div>
                </div>

                {isCorrect === false && (
                  <Alert className="bg-zinc-800 border border-red-900/30 mb-4">
                    <AlertDescription className="flex items-center text-zinc-300">
                      <X className="h-4 w-4 mr-2 text-red-400" />
                      ¡Respuesta incorrecta! Bebe {drinkCount} trago{drinkCount > 1 ? "s" : ""} y prepárate para otra
                      pregunta.
                    </AlertDescription>
                  </Alert>
                )}

                {isCorrect === true && (
                  <Alert className="bg-zinc-800 border border-green-900/30 mb-4">
                    <AlertDescription className="flex items-center text-zinc-300">
                      <Check className="h-4 w-4 mr-2 text-green-400" />
                      ¡Respuesta correcta! Pasa el móvil al siguiente jugador.
                    </AlertDescription>
                  </Alert>
                )}

                {showNextButton && (
                  <Button
                    onClick={nextPlayer}
                    className="w-full bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700"
                  >
                    Siguiente Jugador
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {gameState === "exploded" && (
          <Card className="bg-zinc-800/50 border-0 shadow-lg mb-8 max-w-xl mx-auto overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-red-900/20 to-transparent"></div>
            <CardContent className="p-8 text-center relative z-10">
              <h2 className="text-3xl font-light mb-8 text-red-300">¡BOOM!</h2>

              <div className="mb-10">
                <div className="w-24 h-24 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
                  <Bomb className="h-12 w-12 text-red-400 animate-pulse" />
                </div>
                <p className="text-zinc-400 mb-2">La bomba ha explotado para</p>
                <p className="text-2xl font-light text-white mb-6">{explodedPlayer}</p>
                <div className="inline-block px-4 py-2 bg-zinc-800 rounded-lg text-zinc-300">¡Bebe 3 tragos!</div>
              </div>

              <Button
                onClick={resetGame}
                className="bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700"
                size="lg"
              >
                Jugar de Nuevo
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
