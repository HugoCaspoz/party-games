"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showInstallButton, setShowInstallButton] = useState(false)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevenir que Chrome muestre automáticamente el diálogo
      e.preventDefault()
      // Guardar el evento para usarlo más tarde
      setDeferredPrompt(e)
      // Mostrar el botón de instalación
      setShowInstallButton(true)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallClick = () => {
    if (!deferredPrompt) return

    // Mostrar el diálogo de instalación
    deferredPrompt.prompt()

    // Esperar a que el usuario responda
    deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
      if (choiceResult.outcome === "accepted") {
        console.log("Usuario aceptó la instalación")
      } else {
        console.log("Usuario rechazó la instalación")
      }
      // Limpiar el prompt guardado
      setDeferredPrompt(null)
      setShowInstallButton(false)
    })
  }

  if (!showInstallButton) return null

  return (
    <Button onClick={handleInstallClick} className="bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700">
      <Download className="mr-2 h-4 w-4" />
      Instalar App
    </Button>
  )
}
