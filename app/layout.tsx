import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { PlayersProvider } from "@/context/players-context"

export const metadata = {
  title: "Party Games - Juegos para beber",
  description: "Aplicación de juegos para animar tus fiestas",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <PlayersProvider>{children}</PlayersProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
