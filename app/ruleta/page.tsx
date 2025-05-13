"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Plus, X, Shuffle } from "lucide-react"
import Link from "next/link"

// Opciones predefinidas por tema
const predefinedOptions = {
  hot: [
    "Besa a la persona de tu derecha",
    "Quítate una prenda",
    "Haz un baile sensual",
    "Cuenta tu fantasía más atrevida",
    "Siéntate en el regazo de alguien por 2 turnos",
    "Deja que alguien te dé un chupetón",
    "Bebe un shot del ombligo de alguien",
    "Muestra tu ropa interior",
    "Besa a alguien en la mejilla",
    "Siéntate en el regazo de alguien por un turno",
    "Haz un baile sensual para alguien del grupo",
    "Deja que alguien te dé una nalgada",
    "Susurra algo provocativo al oído de alguien",
    "Deja que alguien te vende los ojos por un turno",
    "Cuenta tu experiencia más atrevida",
    "Haz una demostración de cómo besas",
    "Deja que alguien te dé de comer algo con los ojos vendados",
    "Imita un sonido provocativo",
    "Haz un masaje de hombros a alguien por 30 segundos",
    "Describe a la persona más atractiva de la sala sin decir quién es",
    "Deja que alguien te ponga hielo en alguna parte del cuerpo",
    "Cuenta qué es lo que más te atrae de una persona",
    "Haz una pose de yoga sensual",
    "Deja que alguien te acaricie el pelo por 30 segundos",
    "Cuenta tu mejor técnica de seducción",
    "Haz una demostración de cómo bailarías en un club",
    "Deja que alguien te dibuje algo en la espalda con el dedo",
    "Cuenta tu mejor cualidad en la intimidad",
    "Haz una pose que consideres sexy",
    "Deja que alguien elija tu próxima bebida",
    "Cuenta tu fantasía más recurrente",
    "Deja que alguien te susurre algo al oído",
    "Haz un cumplido atrevido a alguien del grupo",
    "Cuenta qué parte de tu cuerpo te gusta más",
    "Deja que alguien te dé un masaje en las manos por 30 segundos",
    "Cuenta tu experiencia más vergonzosa en una cita",
    "Haz contacto visual con alguien durante 30 segundos sin hablar",
    "Cuenta qué es lo que más te excita",
    "Deja que alguien te dé un beso en la mejilla",
    "Cuenta tu mayor atracción hacia alguien del grupo",
  ],
  retos: [
    "Haz 20 flexiones",
    "Bebe un vaso entero de una vez",
    "Come algo picante",
    "Deja que te maquillen con los ojos vendados",
    "Imita a un animal durante 1 minuto",
    "Llama a un ex y dile que lo extrañas",
    "Publica algo vergonzoso en tus redes",
    "Deja que te hagan cosquillas por 30 segundos",
    "Imita a alguien del grupo durante 30 segundos",
    "Deja que alguien te dibuje algo en la cara",
    "Cuenta un secreto a alguien del grupo",
    "Deja que alguien te haga una pregunta personal",
    "Habla con acento extranjero durante 2 turnos",
    "Haz una parodia de un famoso",
    "Canta el estribillo de una canción vergonzosa",
    "Baila la macarena completa",
    "Cuenta un chiste malo y no te rías",
    "Haz 10 sentadillas",
    "Envía un mensaje extraño a un contacto aleatorio",
    "Deja que el grupo revise tu galería de fotos por 30 segundos",
    "Come una cucharada de algo desagradable (elegido por el grupo)",
    "Mantén una postura incómoda hasta tu próximo turno",
    "Habla al revés durante un turno completo",
    "Cuenta una anécdota vergonzosa de tu infancia",
    "Deja que alguien te peine como quiera",
    "Haz una llamada de broma a alguien",
    "Imita a un personaje de dibujos animados por un turno",
    "Deja que alguien escriba algo en tu frente",
    "Haz una confesión sobre algo que nunca has hecho",
    "Muestra el último mensaje de texto que enviaste",
    "Haz 15 abdominales ahora mismo",
    "Deja que alguien te grabe diciendo algo vergonzoso",
    "Baila sin música durante 30 segundos",
    "Cuenta una historia completamente falsa y convence al grupo de que es real",
    "Deja que alguien te dé órdenes durante 2 minutos",
    "Haz una imitación de un político famoso",
    "Intenta hacer malabares con tres objetos",
    "Haz una pose de yoga difícil y mantente así por 20 segundos",
    "Deja que alguien te vende los ojos y adivina qué estás comiendo",
    "Cuenta un chiste muy malo y ríete exageradamente",
    "Haz una llamada a un amigo y habla en otro idioma",
    "Deja que alguien te haga un peinado ridículo",
    "Intenta recitar el alfabeto al revés",
    "Haz una imitación de un profesor que todos conozcan",
    "Cuenta una historia de miedo improvisada",
  ],
  parejas: [
    "Bésense durante 30 segundos",
    "Háganle un masaje a su pareja",
    "Intercambien ropa por un turno",
    "Cuenten cómo se conocieron",
    "Digan lo que más les gusta del otro",
    "Bailen una canción romántica",
    "Hagan una pose de yoga en pareja",
    "Digan un secreto que nunca le han contado a su pareja",
    "Dos personas deben abrazarse por 10 segundos",
    "Una persona debe hacerle un cumplido a otra",
    "Dos personas deben tomarse una selfie juntos",
    "Una persona debe contar algo que admira de otra",
    "Mírese a los ojos sin parpadear por 30 segundos",
    "Escriban un poema corto juntos",
    "Hagan una declaración romántica exagerada al otro",
    "Cuenten su primera impresión del otro",
    "Hagan una promesa divertida para cumplir esta semana",
    "Compartan su momento más vergonzoso como pareja",
    "Hagan una pose de baile clásico (tango, vals, etc.)",
    "Describan al otro con tres palabras positivas",
    "Cuenten su plan de cita ideal",
    "Hagan un dibujo del otro sin mirar el papel",
    "Compartan su recuerdo favorito juntos",
    "Inventen una historia corta sobre cómo se conocieron (ficticia)",
    "Hagan una lista de 5 cosas que les gustaría hacer juntos",
    "Cuenten qué les atrajo inicialmente del otro",
    "Hagan un brindis romántico por el otro",
    "Compartan un talento oculto con su pareja",
    "Planeen una sorpresa para el otro (a realizar después)",
    "Hagan una promesa romántica para el futuro",
    "Cuenten su momento más divertido juntos",
    "Hagan una pose de foto romántica",
    "Digan tres cosas que les gustaría mejorar en la relación",
    "Cuenten su mayor miedo respecto a la relación",
    "Hagan un juego de 'Yo nunca' solo entre ustedes (3 rondas)",
    "Cuenten qué les hizo darse cuenta de que estaban enamorados",
    "Hagan una lista de 3 lugares que les gustaría visitar juntos",
    "Compartan su mayor sueño como pareja",
    "Cuenten qué hábito del otro les parece más adorable",
    "Hagan un pacto secreto que solo ustedes conozcan",
    "Cuenten qué canción les recuerda al otro",
    "Hagan una promesa para la próxima semana",
    "Cuenten su mayor logro como pareja",
    "Hagan una declaración de amor improvisada",
    "Cuenten qué película o serie les gustaría vivir juntos",
  ],
}

// Función para obtener todas las opciones combinadas
const getAllOptions = () => {
  const allOptions: string[] = []

  // Combinar todas las opciones de todas las categorías
  Object.values(predefinedOptions).forEach((categoryOptions) => {
    allOptions.push(...categoryOptions)
  })

  // Mezclar las opciones para que aparezcan en orden aleatorio
  return [...allOptions].sort(() => Math.random() - 0.5)
}

// Componente para la ruleta
const Wheel = ({
  options,
  spinning,
  onSpinEnd,
}: { options: string[]; spinning: boolean; onSpinEnd: (option: string) => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [rotation, setRotation] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) - 10

    // Limpiar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Dibujar la ruleta
    const sliceAngle = (2 * Math.PI) / options.length

    options.forEach((option, i) => {
      const startAngle = i * sliceAngle + rotation
      const endAngle = (i + 1) * sliceAngle + rotation

      // Dibujar sector
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, endAngle)
      ctx.closePath()

      // Alternar colores con un esquema más minimalista
      ctx.fillStyle = i % 2 === 0 ? "#4c1d95" : "#5b21b6"
      ctx.fill()

      // Borde sutil
      ctx.strokeStyle = "#7c3aed"
      ctx.lineWidth = 1
      ctx.stroke()

      // Dibujar texto
      ctx.save()
      ctx.translate(centerX, centerY)
      ctx.rotate(startAngle + sliceAngle / 2)
      ctx.textAlign = "right"
      ctx.fillStyle = "white"
      ctx.font = "12px sans-serif"

      // Acortar texto si es muy largo
      let displayText = option
      if (option.length > 15) {
        displayText = option.substring(0, 15) + "..."
      }

      ctx.fillText(displayText, radius - 15, 5)
      ctx.restore()
    })

    // Dibujar centro
    ctx.beginPath()
    ctx.arc(centerX, centerY, 15, 0, 2 * Math.PI)
    ctx.fillStyle = "#7c3aed"
    ctx.fill()

    // Dibujar flecha
    ctx.beginPath()
    ctx.moveTo(centerX + radius + 5, centerY)
    ctx.lineTo(centerX + radius - 10, centerY - 10)
    ctx.lineTo(centerX + radius - 10, centerY + 10)
    ctx.closePath()
    ctx.fillStyle = "#7c3aed"
    ctx.fill()
  }, [options, rotation])

  useEffect(() => {
    if (spinning) {
      let spinSpeed = 0.5 // Aumentar velocidad inicial
      const slowdown = 0.98 // Aumentar factor de desaceleración
      let totalRotation = 0
      const minRotation = 2 * Math.PI * 2 // Reducir a 2 vueltas mínimas

      const spin = () => {
        if (spinSpeed > 0.001 && totalRotation > minRotation) {
          // Determinar opción seleccionada correctamente
          const normalizedRotation = rotation % (2 * Math.PI)
          const sliceAngle = (2 * Math.PI) / options.length
          // Corregir el cálculo del índice seleccionado
          const selectedIndex = Math.floor((2 * Math.PI - normalizedRotation) / sliceAngle) % options.length
          const selected = options[selectedIndex]
          setSelectedOption(selected)
          onSpinEnd(selected)
          return
        }

        setRotation((prev) => {
          const newRotation = prev + spinSpeed
          totalRotation += spinSpeed
          return newRotation
        })
        spinSpeed *= slowdown
        requestAnimationFrame(spin)
      }

      requestAnimationFrame(spin)
    }
  }, [spinning, options, rotation, onSpinEnd])

  return <canvas ref={canvasRef} width={300} height={300} className="mx-auto" />
}

export default function RuletaPage() {
  const [theme, setTheme] = useState("hot")
  const [options, setOptions] = useState<string[]>(predefinedOptions.hot)
  const [customOptions, setCustomOptions] = useState<string[]>([])
  const [newOption, setNewOption] = useState("")
  const [isCustomMode, setIsCustomMode] = useState(false)
  const [spinning, setSpinning] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  useEffect(() => {
    if (!isCustomMode) {
      if (theme === "todo") {
        // Si el tema es "todo", obtener todas las opciones combinadas
        setOptions(getAllOptions())
      } else {
        // Si es otro tema, obtener las opciones de ese tema específico
        const standardOptions = predefinedOptions[theme as keyof typeof predefinedOptions]
        // Mezclar las opciones de forma aleatoria
        setOptions([...standardOptions].sort(() => Math.random() - 0.5))
      }
    } else {
      // También mezclar las opciones personalizadas
      setOptions([...customOptions].sort(() => Math.random() - 0.5))
    }
  }, [theme, isCustomMode, customOptions])

  const addCustomOption = () => {
    if (newOption.trim()) {
      const newOptions = [...customOptions, newOption]
      setCustomOptions(newOptions)
      // Mezclar las opciones incluyendo la nueva
      setOptions([...newOptions].sort(() => Math.random() - 0.5))
      setNewOption("")
    }
  }

  const removeCustomOption = (index: number) => {
    const newOptions = [...customOptions]
    newOptions.splice(index, 1)
    setCustomOptions(newOptions)
  }

  const handleSpin = () => {
    setSelectedOption(null)
    // Mezclar las opciones antes de girar
    setOptions([...options].sort(() => Math.random() - 0.5))
    setSpinning(true)
  }

  const handleSpinEnd = (option: string) => {
    setSpinning(false)
    setSelectedOption(option)
  }

  const handleTabChange = (value: string) => {
    if (value === "custom") {
      setIsCustomMode(true)
      // Mezclar las opciones personalizadas
      setOptions([...customOptions].sort(() => Math.random() - 0.5))
    } else {
      setIsCustomMode(false)
      setTheme(value)

      if (value === "todo") {
        // Si se selecciona "todo", obtener todas las opciones combinadas
        setOptions(getAllOptions())
      } else {
        // Si es otro tema, obtener las opciones de ese tema específico
        const standardOptions = predefinedOptions[value as keyof typeof predefinedOptions]
        // Mezclar las opciones estándar de la nueva categoría
        setOptions([...standardOptions].sort(() => Math.random() - 0.5))
      }
    }
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="flex items-center mb-8">
          <Link href="/" passHref>
            <Button variant="ghost" size="icon" className="mr-2 text-zinc-400 hover:text-white hover:bg-zinc-800">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-light">La Ruleta</h1>
        </header>

        <div className="max-w-xl mx-auto">
          <Tabs defaultValue="hot" value={isCustomMode ? "custom" : theme} onValueChange={handleTabChange}>
            <TabsList className="grid grid-cols-5 mb-8 bg-zinc-800 border border-zinc-700 p-1 rounded-lg">
              <TabsTrigger
                value="hot"
                className="data-[state=active]:bg-violet-500/20 data-[state=active]:text-violet-300"
              >
                Hot 🔥
              </TabsTrigger>
              <TabsTrigger
                value="retos"
                className="data-[state=active]:bg-violet-500/20 data-[state=active]:text-violet-300"
              >
                Retos 🤪
              </TabsTrigger>
              <TabsTrigger
                value="parejas"
                className="data-[state=active]:bg-violet-500/20 data-[state=active]:text-violet-300"
              >
                Parejas ❤️
              </TabsTrigger>
              <TabsTrigger
                value="todo"
                className="data-[state=active]:bg-violet-500/20 data-[state=active]:text-violet-300"
              >
                Todo 🎲
              </TabsTrigger>
              <TabsTrigger
                value="custom"
                className="data-[state=active]:bg-violet-500/20 data-[state=active]:text-violet-300"
              >
                Personal
              </TabsTrigger>
            </TabsList>

            <Card className="bg-zinc-800/50 border-0 shadow-lg mb-8 overflow-hidden">
              <CardContent className="p-6 relative z-10">
                <div className="mb-8">
                  <Wheel options={options} spinning={spinning} onSpinEnd={handleSpinEnd} />
                </div>

                <div className="flex justify-center mb-6">
                  <Button
                    onClick={handleSpin}
                    disabled={spinning || options.length === 0}
                    className="bg-violet-600 hover:bg-violet-700 text-white border-0"
                    size="lg"
                  >
                    <Shuffle className="mr-2 h-4 w-4" />
                    {spinning ? "Girando..." : "Girar la ruleta"}
                  </Button>
                </div>

                {selectedOption && (
                  <div className="p-4 bg-zinc-800 rounded-lg border border-violet-700/30 text-center animate-fadeIn">
                    <p className="text-xl font-light text-white">{selectedOption}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {isCustomMode && (
              <div className="mt-8">
                <div className="flex gap-2 mb-4">
                  <Input
                    placeholder="Añade tu propia opción para la ruleta"
                    value={newOption}
                    onChange={(e) => setNewOption(e.target.value)}
                    className="bg-zinc-700/50 border-zinc-600 text-white placeholder:text-zinc-500 focus-visible:ring-violet-500"
                  />
                  <Button
                    onClick={addCustomOption}
                    className="bg-violet-500/80 hover:bg-violet-600 text-white border-0"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {customOptions.length > 0 && (
                  <Card className="bg-zinc-800 border border-zinc-700 shadow-lg">
                    <CardContent className="p-4">
                      <h3 className="text-sm text-zinc-400 mb-3">Tus opciones personalizadas</h3>
                      <ul className="space-y-2">
                        {customOptions.map((option, index) => (
                          <li
                            key={index}
                            className="flex items-center justify-between p-2 border-b border-zinc-700 last:border-0"
                          >
                            <span className="text-zinc-300">{option}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeCustomOption(index)}
                              className="h-8 w-8 hover:bg-zinc-700 text-zinc-400 hover:text-white"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </Tabs>
        </div>
      </div>
    </div>
  )
}
