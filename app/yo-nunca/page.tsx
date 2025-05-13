"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Plus, RefreshCw, Wine } from "lucide-react"
import Link from "next/link"

// Preguntas predefinidas por categoría
const predefinedQuestions = {
  amistad: [
    "Yo nunca he mentido a un amigo para no salir con él/ella",
    "Yo nunca he olvidado el cumpleaños de mi mejor amigo/a",
    "Yo nunca he leído los mensajes privados de un amigo sin permiso",
    "Yo nunca he hablado mal de un amigo a sus espaldas",
    "Yo nunca he tenido celos de un amigo",
    "Yo nunca he fingido estar enfermo para no ir a una reunión con amigos",
    "Yo nunca he robado algo a un amigo",
    "Yo nunca he estado enamorado/a de un amigo/a",
    "Yo nunca he traicionado la confianza de un amigo",
    "Yo nunca he dejado plantado a un amigo",
    "Yo nunca he estado celoso/a de un amigo",
    "Yo nunca he mentido a un amigo para evitar salir",
    "Yo nunca he pensado que alguien es un mal amigo/a",
  ],
  sexo: [
    "Yo nunca he tenido sexo en un lugar público",
    "Yo nunca he enviado fotos íntimas a alguien",
    "Yo nunca he tenido un sueño erótico con alguien de esta sala",
    "Yo nunca he fingido un orgasmo",
    "Yo nunca he usado juguetes sexuales",
    "Yo nunca he tenido sexo en la primera cita",
    "Yo nunca he tenido una experiencia con alguien del mismo sexo",
    "Yo nunca he sido infiel",
    "Yo nunca he tenido un trío",
    "Yo nunca he visto pornografía con mi pareja",
    "Yo nunca he tenido fantasías con alguien de este grupo",
    "Yo nunca he pensado que alguien de esta sala es atractivo/a",
    "Yo nunca me he fijado en el cuerpo de alguien presente",
    "Yo nunca lo he hecho sin haber querido",
    "Yo nunca lo he hecho con más de una persona en un mismo día",
    "Yo nunca he querido tirarme a la madre/padre de un amigo/a",
    "Yo nunca he querido tirarme al hermano/a de un amigo/a",
    "Yo nunca me he querido liar con alguien presente",
    "Yo nunca he tenido fantasías sexuales sobre alguien que no considerase atractivo/a",
    "Yo nunca lo he hecho a pelo",
    "Yo nunca he acabado en la boca de alguien/me han acabado en la boca",
    "Yo nunca he querido tirarme al novio/a de un amigo/a",
    "A mí nunca me han pedido que fuese más lento porque iba demasiado rápido",
    "Yo nunca he dejado con las ganas a alguien",
    "A mí nunca me han dejado con las ganas",
    "Yo nunca he tenido la típica discusión de 'luces encendidas/apagadas'",
    "Yo nunca me he encontrado un pelo en la boca tras hacer oral",
    "Yo nunca he puesto los cuernos",
    "A mí nunca me han puesto los cuernos",
    "Yo nunca he dudado de mi orientación sexual",
    "Yo nunca me he liado con dos personas de distinto sexo en una noche",
    "Yo nunca me he liado con alguien y me he arrepentido inmediatamente después",
    "Yo nunca he tenido sexo por pena",
    "Yo nunca me he tirado a mi ex",
    "A mí nunca me han pillado en el acto",
    "Yo nunca lo he hecho en un lugar público",
    "Yo nunca lo he hecho en la cama de una tercera persona",
    "Yo nunca lo he hecho con más gente alrededor",
    "Yo nunca he hecho un trío",
    "Yo nunca he tenido fantasías sexuales sobre hacer un trío con mi novio/a y otra persona",
    "Yo nunca me he masturbado con un objeto inanimado",
    "Yo nunca me he hecho daño a mí mismo al masturbarme",
    "Yo nunca me he decepcionado al liarme/tirarme a alguien con quien tenía muchas ganas",
    "Yo nunca he practicado sadomasoquismo o usado objetos relacionados",
    "Yo nunca he intentado anal pero no salió bien",
    "Yo nunca he practicado anal por placer",
    "Yo nunca me he liado/tirado a alguien que tenía mínimo 5 años más que yo",
    "Yo nunca he hecho algo sexual en el colegio/universidad",
    "A mí nunca me han hecho un chupetón en un lugar poco común",
    "Yo nunca he intentado emborrachar a alguien para liarme con esa persona",
    "Yo nunca he visto porno con otra persona",
    "Yo nunca me he grabado con alguien en la cama",
    "Yo nunca me he masturbado con una película que no fuese pornográfica",
    "Yo nunca he tenido un gatillazo",
    "Yo nunca lo he hecho con la regla",
    "Yo nunca me he querido liar con más de 2 personas presentes",
    "Yo nunca lo he hecho disfrazado para satisfacer algún morbo",
    "Yo nunca me he liado con el chico/a con quien estaba intentando ligar un amigo/a",
    "Yo nunca me lo he tragado",
    "Yo nunca me he excitado en un momento muy poco apropiado",
    "A mí nunca se me ha roto el condón",
    "Yo nunca he estado un año sin sexo tras haberlo hecho previamente",
    "Yo nunca he puesto/a mí nunca me han puesto un condón con la boca",
    "Yo nunca he involucrado comida en el sexo",
    "Yo nunca lo he hecho en una fiesta",
    "Yo nunca me he tomado/he comprado la pastilla del día después",
    "Yo nunca he tenido sexo por teléfono",
    "Yo nunca he tenido que correr a buscar mi ropa porque acababan de tocar el timbre de la casa",
    "Yo nunca he parado de liarme/tirarme a alguien para preguntarle a la persona cómo se llamaba",
    "Yo nunca me he liado/tirado a el/la ex de un amigo/a",
    "Yo nunca le he mentido sobre mis experiencias sexuales a mi nueva pareja",
    "Yo nunca he tenido que enseñar/a mí nunca me han tenido que enseñar cómo desabrochar un sujetador",
    "Yo nunca he tenido una fantasía sexual sobre un profesor/profesora",
    "Yo nunca he pillado a mis padres haciéndolo",
    "Yo nunca me he sacado fotos desnudo/a",
    "Yo nunca he llamado a alguien por un nombre equivocado mientras lo estábamos haciendo",
    "Yo nunca he/a mí nunca me han lamido el culo",
    "Yo nunca lo he hecho en la ducha",
    "Yo nunca he usado el kamasutra para aprender o involucrar nuevas posiciones en la cama",
    "Yo nunca lo he hecho con alguien que era virgen",
    "Yo nunca he mentido sobre ser virgen",
    "Yo nunca me he medido el pene",
    "Yo nunca he borrado conversaciones subidas de tono para que mi pareja no me pillase",
    "Yo nunca me he liado/tirado a alguien que no me parecía atractivo/a solo porque estaba desesperado/a",
    "Yo nunca he creído haber contraído una enfermedad de transmisión sexual",
    "Yo nunca he fingido/exagerado un orgasmo",
    "Yo nunca he tenido un follamigo/a",
    "Yo nunca he salido de casa sin ropa interior",
    "Yo nunca me he liado/tirado a un extranjero/a",
    "Yo nunca he sentido envidia al ver los genitales de un amigo/a",
    "Yo nunca me he masturbado en casa de un amigo/a",
    "Yo nunca he hecho/a mí nunca me han hecho una mamada con condón",
    "Yo nunca he usado hielo en la cama",
    "Yo nunca he pedido que satisfacieran un fetiche mío pero sin éxito",
    "Yo nunca he intentado esconder una erección en público sin éxito",
    "A mí nunca me ha puesto la violencia en la cama",
    "Yo nunca me he tirado/se han tirado un pedo en el acto",
    "Yo nunca le he roto la ropa a mi pareja al quitársela",
    "Yo nunca he intentado/querido que una pareja rompiese",
    "Yo nunca he hecho/me han hecho una cubana",
    "Yo nunca me he masturbado viendo hentai",
    "Yo nunca he aceptado hacer algo por dinero",
    "Yo nunca he metido/me han metido más de 3 dedos",
    "Yo nunca lo he hecho en un coche y sonó la bocina",
    "A mí nunca me han tenido que enseñar una foto de con quien me había liado porque no me acordaba",
    "Yo nunca me he depilado los genitales pensando que iba a pinchar y acabé comiéndome los mocos",
    "Yo nunca he querido unirme a dos amigos que estuviesen haciéndolo",
    "Yo nunca he hecho una lista de todas los tíos/tías con las que me he liado",
    "Yo nunca he conseguido liarme/tirarme a un amor platónico",
    "Yo nunca he tenido que usar más de 2 condones en una misma ronda",
    "Yo nunca lo he hecho en todos los cuartos de mi/su casa",
    "Yo nunca he pedido por Chatroulette/Omegle que me enseñen el pene/las tetas",
    "Yo nunca he tenido que usar páginas online o aplicaciones para ligar",
    "Yo nunca me he dado cuenta de que me estaban mirando mientras lo estaba haciendo",
    "Yo nunca me he liado con alguien presente",
    "Yo nunca me he liado/tirado a alguien que me cayera mal",
    "A mí nunca se me han/yo nunca he acabado encima del cuerpo",
    "A mí nunca me han dado una hostia por estar tirando la caña",
    "Yo nunca me he arrepentido de con quien había perdido la virginidad",
    "Yo nunca me he liado con alguien que acababa de vomitar",
    "A mí nunca me ha puesto alguien sin saber en su momento que esa persona tenía mínimo 4 años menos que yo",
    "Yo nunca he salido con alguien con quien sabía que no iba a estar mucho tiempo",
    "Yo nunca he hecho un 69",
    "Yo nunca lo he hecho con mis/sus padres cerca",
    "Yo nunca he ligado con alguien para poner celoso/a a una persona",
    "Yo nunca me he resbalado mientras lo hacía en la ducha",
    "Yo nunca le he dicho a alguien 'te quiero' solo para follar",
    "Yo nunca he hecho/a mí nunca me han hecho sangrar al meter dedos",
    "Yo nunca he echado un polvo malísimo",
    "Yo nunca me he masturbado al menos 5 veces en un día",
    "Yo nunca he tenido un sueño mojado",
    "Yo nunca he pensado que el sexo oral era asqueroso",
    "Yo nunca he pensado que el sexo oral es mejor que la penetración",
    "Yo nunca he pensado en otra persona mientras estaba haciéndolo con alguien",
    "Yo nunca lo he hecho con alguien que en mi opinión tenía el pene pequeño",
    "Yo nunca he usado condones con sabores",
    "Yo nunca he/a mí nunca se me han acabado dentro sin condón",
    "Yo nunca me he guardado las fotos de mi ex desnudo/a después de haber cortado con él/ella",
    "Yo nunca he usado/nunca han usado conmigo la marcha atrás como método anticonceptivo",
    "Yo nunca me he liado con alguien que tenía novio/a",
    "A mí nunca me ha tirado la caña un familiar de mi novio/a",
    "Yo nunca he mandado a la friendzone a alguien tras haberme liado con esa persona",
    "Yo nunca me he alegrado por algo malo que le haya pasado a mi ex",
    "Yo nunca lo he hecho más de 5 veces en un día",
    "Yo nunca me he liado con alguien de mi actual clase",
    "A mí nunca me han hecho una cobra de verdad",
    "Yo nunca me he arrepentido de un tatuaje",
    "A mí nunca me ha dado más morbo hacerlo fuera de casa que dentro",
    "Yo nunca me he quedado dormido/a durante el sexo",
    "Yo nunca me he pillado por alguien mientras tenía novio/a",
    "Yo nunca he cortado con un novio/a porque el sexo no me satisfacía",
    "Yo nunca he roto la cama al hacerlo",
    "A mí nunca me han llamado la atención los vecinos por hacer demasiado ruido durante el sexo",
    "Yo nunca he/a mí nunca me han agarrado del pelo con fuerza en el sexo",
    "Yo nunca he aguantado menos de 10 minutos en la cama",
    "Nunca han aguantado menos de 10 minutos en la cama conmigo",
    "Yo nunca lo he hecho 3 o más veces seguidas",
    "Yo nunca he/a mí nunca me han despertado con una mamada/polvo",
    "Yo nunca me he masturbado mientras hacía una videollamada con alguien",
    "Yo nunca me he creado una cuenta falsa en alguna red social para ver lo que hacía un/a ex sin que se diese cuenta",
    "Yo nunca he conseguido liarme o salir con alguien con quien estaba previamente en la friendzone",
    "A mí nunca me han pillado un chupetón mis padres",
    "Yo nunca tendría una relación con alguien presente si se diese el caso",
    "Yo nunca he visto porno de hermanastros/padrastros/madrastas",
    "Yo nunca he/a mí nunca me han hecho garganta profunda",
    "Yo nunca me he sentido mal conmigo mismo tras tocarme",
    "Yo nunca le he seguido el rollo a un profesora/a que me estuviese tirando",
    "Yo nunca he pedido hacer un video porno pero sin éxito",
    "Yo nunca he fingido ser de otra nacionalidad para ligar",
    "Yo nunca he tenido sexo interracial",
    "Yo nunca he estado frustrado porque no me satisfacía el sexo con una persona a quien quería",
    "Yo nunca me he masturbado en grupo",
    "Yo nunca me he obsesionado entera o parcialmente con alguien tras liarme con esa persona una vez",
    "Yo nunca he lamido unos pezones",
    "A mí nunca me han lamido los pezones",
    "Yo nunca he estado en la friendzone con alguien presente",
    "Yo nunca he cortado con alguien para salir con otra persona",
    "Nunca han cortado conmigo para salir con otra persona",
    "Yo nunca lo he hecho estando enfermo",
    "Yo nunca me he querido tirar/tirado a mi mejor amigo/a",
    "Yo nunca he preferido los culos a las tetas",
    "Yo nunca he tenido pique con el novio/a de mi ex",
    "Yo nunca he pensado que me casaría con un ex o actual pareja",
    "Yo nunca he soñado que me liaba/tiraba a alguien y me he decepcionado al despertarme",
    "Yo nunca me he liado con alguien que tenía muy mal aliento",
    "A mí nunca me han hecho daño al practicar sexo oral",
    "Yo nunca he tenido la paranoia de estar embarazada porque se me había retrasado la regla",
    "Yo nunca he/a mí nunca me han hecho una mamada conduciendo",
    "Yo nunca le he seguido el rollo a alguien que me estaba tirando solo para conseguir alcohol",
    "Yo nunca he visto un juguete sexual y he sentido intriga",
    "Yo nunca he tenido un sueño sexual sobre alguien presente/de la clase",
    "Yo nunca he sentido intriga por practicar sexo oral con alguien de mi mismo sexo",
    "Yo nunca he pensado que el sexo entre mismo sexo es o sería mejor que el sexo entre distintos sexos",
    "Yo nunca he sentido atracción por algún familiar",
    "Yo nunca he chupado un pene/coño que supiera muy mal",
    "A mí nunca me ha interrumpido mi mascota mientras estaba haciéndolo",
    "Yo nunca me he/nunca se han equivocado de agujero",
    "Yo nunca me he masturbado justo antes de hacerlo para durar más",
    "Yo nunca he usado un video porno como modelo a seguir",
    "Yo nunca me he vestido de cierta forma para atraer la atención de alguien y pasó de mí",
    "Yo nunca he alquilado una habitación de hotel o motel solo para follar",
    "Yo nunca haría un trío con gente aquí presente",
    "Yo nunca he jugado a algún juego con el castigo de hacer un striptease",
    "Yo nunca me he liado con alguien que besase realmente mal",
    "Yo nunca he usado el móvil mientras lo estaba haciendo",
    "Yo nunca lo he hecho manteniendo 0 contacto visual con la otra persona",
    "A mí nunca me ha tirado para atrás ver cuánto pelo púbico tenía la persona con la que lo iba a hacer",
    "Yo nunca me he reído mientras lo estaba haciendo",
    "Yo nunca he tirado la caña de broma y acabó saliendo mejor de lo que esperaba",
    "Yo nunca me he liado/tirado al mejor amigo/a de mi ex",
    "Yo nunca he me hecho fotos sensuales desnudo/a para enviárselas a alguien",
    "Yo nunca he creído que alguien presente me ha tirado la caña alguna vez",
    "Yo nunca me he liado con alguien que ha querido tener algo conmigo después sin que yo quisiera",
    "Yo nunca me he liado/tirado a alguien que no he vuelto a ver en mi vida",
    "Yo nunca me he imaginado cómo serían las tetas/el pene de alguien presente",
    "Yo nunca me habría tirado a alguien de clase principio de curso pero ahora me da asco",
    "Yo nunca he hecho/provocado squirting",
    "Yo nunca he/a mí nunca me han ocasionado moratones o arañazos en el sexo",
    "Yo nunca he/a mí nunca me han dado un pollazo en la cara",
    "Yo nunca he/a mí nunca me han tirado la caña para conseguir alcohol",
    "Yo nunca lo he hecho con música de fondo",
    "Yo nunca me he liado/tirado a alguien que estaba muy por encima de mis posibilidades",
    "Yo nunca he tenido una cita de donde creía que podía surgir algo y acabé decepcionándome",
    "A mí nunca me han intentado emborrachar para liarse conmigo",
    "Yo nunca he mentido sobre mí mismo para ligar",
    "Yo nunca lo he hecho estando borracho/fumado",
    "Yo nunca le he robado condones a un familiar",
    "Yo nunca me he llevado condones pensando que iba a pinchar y acabé dándoselos a alguien",
    "Yo nunca he jugado a roles en la cama",
    "Yo nunca he usado saliva como lubricante",
    "Yo nunca me he liado 2 o más veces con alguien con quien no tenía nada",
    "Yo nunca he negado liarme con alguien pese a ser verdad",
    "Yo nunca he dormido en la misma cama con alguien del sexo opuesto sin que pasara nada",
    "Yo nunca me he liado con más de 10 personas en toda mi vida",
    "Yo nunca he chantajeado a alguien con contar un secreto suyo",
    "Yo nunca me he enterado de cuernos a un amigo/a y lo he ocultado por alguna razón",
    "Yo nunca he estado más de un mes sin masturbarme",
    "Yo nunca he pasado de los preliminares y he ido directo/a al sexo",
    "Yo nunca me he quedado en los preliminares porque no me apetecía el sexo",
    "Yo nunca he dejado un polvo a mitad por cualquier razón",
    "Yo nunca me he asustado al ver el tamaño del pene de alguien",
    "Yo nunca me he liado con alguien justo después de potar",
    "Yo nunca me he dado cuenta de que me estaban mirando mientras meaba",
    "Yo nunca he tenido arcadas al hacer oral",
    "A mí nunca me ha puesto alguien que no considerase atractivo/a",
    "Yo nunca he/a mí nunca me han hecho una mamada bajo el agua",
    "Yo nunca he rechazado a un/una ex que quería volver a liarse conmigo",
    "Yo nunca lo he hecho en otro país",
    "Yo nunca me he masturbado con una foto",
    "Yo nunca he pensado en una vieja o un animal mientras lo hacía para durar más",
    "Yo nunca he comprado algo en un sex shop",
    "Yo nunca le he hecho un baile sensual a mi pareja",
    "Yo nunca me he encarado con alguien que estuviese mirando o molestando a mi pareja",
    "A mí nunca me han retado a liarme con alguien",
    "Yo nunca me he masturbado pensando en alguien que no fuese mi pareja en ese momento",
    "Yo nunca me he liado/tirado a alguien a quien le tenía ganas mientras tenía novio/a",
    "Yo nunca lo he hecho sin quitarme la mayoría de la ropa",
    "Yo nunca he tenido un/una ex que se cambió de acera después de dejarlo conmigo",
    "Yo nunca le he hecho la cobra a alguien que me había rechazado previamente por venganza",
    "Yo nunca he puesto cachondo/a a alguien con un simple susurro al oído",
    "Yo nunca lo he hecho justo después de discutir para reconciliarnos",
    "Yo nunca volvería con un/una ex",
    "Yo nunca me volvería a liar con alguien presente",
    "Yo nunca lo he hecho en solo una posición todo el rato",
    "Yo nunca lo he hecho en alrededor de 10 posiciones",
    "Yo nunca he estado un mes sin hacerlo teniendo pareja",
    "Yo nunca he acabado encima de mi propio cuerpo sin querer",
    "A mí nunca me han puesto tanto que me han hecho temblar",
    "A mí nunca se me ha dormido una parte del cuerpo mientras lo hacía",
    "A mí nunca se me ha perdido algo dentro de alguien/de mí mismo/a",
    "Yo nunca he tenido que parar para preguntar si iba todo bien",
    "A mí nunca me han propuesto un trío seriamente",
    "Yo nunca he archivado un chat porque no quería que mi pareja lo viera pero tampoco quería borrarlo",
    "Yo nunca he negado masturbarme",
    "Yo nunca me he excitado/empalmado cuando me han perreado en una fiesta",
    "A mí nunca me han usado para poner celoso/a a alguien",
    "Yo nunca he estado en la cama con alguien del sexo opuesto pero solo hubo besos",
    "Yo nunca me he rascado los genitales en público y me han visto",
    "Yo nunca lo he hecho con los calcetines puestos",
    "Yo nunca me he negado a hacerle oral a alguien que me lo había pedido",
    "Yo nunca me he liado con un chico más bajito/una chica más alta que yo",
    "Yo nunca lo he hecho con gafas",
    "Yo nunca me he liado con alguien con quien no debería haberlo hecho por ir borracho/a",
    "Yo nunca he tenido complejo sobre alguna parte de mi cuerpo",
    "Yo nunca lo he hecho justo antes de dormirme y al despertarme",
    "A mí nunca me ha tirado la caña alguien pensando que era de otra orientación sexual",
    "Yo nunca he aceptado hacer/que me hicieran algo que no quería solo para follar",
    "Yo nunca he hecho que alguien hiciera algo que no quería con el sexo como recompensa",
    "Yo nunca he recibido fotos de alguien desnudo/a",
    "Yo nunca le he estado mirando las tetas a una chica y me ha pillado de pleno",
    "A mí nunca me ha puesto más hacerlo sin condón",
    "Yo nunca he acabado y he continuado sin parar",
    "Yo nunca he querido tirarme al hermano/a de mi pareja o de un/a ex",
    "Yo nunca he dejado una mancha en la ropa o en la cama",
    "Yo nunca he sido dominante en la cama",
    "Yo nunca me he masturbado en una ducha que no fuese la mía",
    "Yo nunca le he contado a alguien que había follado inmediatamente después de hacerlo",
    "Yo nunca lo he hecho en una bañera",
    "Yo nunca lo he hecho en el suelo",
    "A mí nunca me han visto haciendo cualquier cosa sexual en el cine",
    "Yo nunca he tenido sexo esta última semana",
    "Yo nunca me he masturbado hoy",
    "Yo nunca he sudado mucho/bastante durante el sexo",
    "Yo nunca he buscado consejos sexuales en internet",
    "A mí nunca me ha gustado más estar debajo que encima",
    "A mí nunca me ha gustado más estar encima que debajo",
    "Yo nunca he salido con alguien a quien no quería",
    "Yo nunca he tenido un amigo/a que se ha liado con mi ex",
    "A mí nunca me ha hecho una cobra alguien presente",
    "Yo nunca le he hecho una cobra a alguien presente",
    "Yo nunca me he masturbado en otro país",
    "Yo nunca me he liado con alguien solo porque un amigo/a me ayudó",
    "Yo nunca pensé que podría tener algo con alguien presente/de mi actual clase sin darme cuenta de que no le atraía para nada",
    "Yo nunca me he masturbado con amigo/as en casa",
    "Yo nunca me he masturbado pensando en alguien menor que yo",
    "Yo nunca he tonteado/ligado con alguien con quien no tenía ningún interés en quedar",
    "Yo nunca me he pillado por alguien con quien no podría tener nada por su orientación sexual",
    "Yo nunca he pensado que alguien presente podía ser una fiera en la cama",
    "Yo nunca he vuelto con un/una ex",
    "Yo nunca me he liado/he salido con alguien con quien había previamente negado que tendría algo jamás",
    "Yo nunca me he arrepentido de liarme con/pillarme por alguien presente",
    "Yo nunca me he puesto la ropa interior de alguien del sexo opuesto",
    "Yo nunca he acabado al mismo tiempo que la persona con quien lo estaba haciendo",
    "Yo nunca lo he hecho en una cama individual",
    "Yo nunca lo he hecho en un sofá",
    "Yo nunca he usado lubricante de sabores",
    "Yo nunca he dejado que alguien usara un juguete sexual conmigo",
    "A mí nunca me ha puesto hacer oral",
    "A mí nunca me ha oído haciéndolo un amigo/a",
    "Yo nunca he oído a un amigo/a haciéndolo",
    "Yo nunca he dejado manchas en la pared",
    "Yo nunca me he mirado en el espejo mientras lo estaba haciendo",
    "Yo nunca me he negado a hacerlo con mi pareja pese a que me lo suplicara",
    "Yo nunca les he contado a mis padres que perdí la virginidad",
    "Yo nunca he dicho que no podía ir a alguna quedada por quedarme follando",
    "Yo nunca me he puesto celoso al ver a mi pareja hablar con su ex",
    "Yo nunca he sido sumiso/a",
    "Yo nunca he pensado en operarme las tetas",
    "A mí nunca se me ha salido en pleno acto y me he hecho daño",
    "Yo nunca he hecho algo que previamente pensé que nunca haría",
    "Yo nunca he/a mí nunca me han hecho el hámster",
    "Yo nunca he perdido la virginidad con 15 años o menos",
    "Yo nunca he desvirgado a alguien menor de 16 años",
    "Yo nunca he rendido poco en algún deporte porque acababa de hacerlo",
    "Yo nunca me he puesto el condón al revés",
    "Yo nunca he usado lubricantes con efectos de calor o frío",
    "Yo nunca me he puesto un condón que me fuera incómodamente pequeño o apretado",
    "Yo nunca me he masturbado con un condón puesto",
    "Yo nunca lo he hecho con los ojos tapados por algo",
    "Yo nunca he perdido el equilibrio mientras lo hacía",
    "Yo nunca he pensado que alguien presente podría salir del armario",
    "Yo nunca estuve a punto de liarme con alguien hasta que otra persona me interrumpió",
    "Yo nunca he entrado en un puticlub",
    "Yo nunca he querido entrar en un puticlub pero por una razón u otra no lo hice",
    "Yo nunca enviado/recibido fotos desnudas por accidente",
    "A mí nunca me ha puesto más hacerlo con los padres cerca",
    "Yo nunca he tenido que asegurarme de hacerlo en silencio para que no nos oyeran los padres",
    "Yo nunca lo he hecho en una posición que no me gustara solo porque mi pareja quería",
    "Yo nunca he sido incapaz de recrear una posición de kamasutra",
    "Yo nunca me he liado/tirado o tenido algo con alguien para olvidarme de otra persona",
    "A mí nunca me ha tirado la caña un familiar de un amigo/a",
    "Yo nunca he mentido en este Yo Nunca",
  ],
  fiesta: [
    "Yo nunca he llegado a casa después de las 6 de la mañana",
    "Yo nunca he bebido tanto que no recuerdo cómo llegué a casa",
    "Yo nunca he bailado encima de una mesa",
    "Yo nunca he vomitado en una fiesta",
    "Yo nunca he entrado a una fiesta sin invitación",
    "Yo nunca he perdido algo importante en una fiesta",
    "Yo nunca he besado a más de una persona en la misma fiesta",
    "Yo nunca he hecho un striptease en una fiesta",
    "Yo nunca he mezclado más de 4 tipos de alcohol en una noche",
    "Yo nunca he terminado en una fiesta diferente a la que empecé",
    "Yo nunca he visto a alguien completamente borracho/a en una fiesta",
    "Yo nunca he tenido que cuidar de alguien en una fiesta",
    "Yo nunca he bailado con alguien que acabo de conocer",
  ],
  vergüenza: [
    "Yo nunca he sido pillado/a en una mentira vergonzosa",
    "Yo nunca he tropezado y caído en público",
    "Yo nunca he entrado al baño equivocado",
    "Yo nunca he roto algo en casa de otra persona y lo he ocultado",
    "Yo nunca he tenido un accidente por reírme demasiado",
    "Yo nunca he llamado a alguien por el nombre equivocado",
    "Yo nunca he enviado un mensaje comprometedor a la persona equivocada",
    "Yo nunca he sido rechazado/a públicamente",
    "Yo nunca he tenido que salir corriendo al baño en medio de una cita",
    "Yo nunca he sido pillado/a haciendo algo que no debería",
    "Yo nunca he visto a alguien en una situación vergonzosa",
    "Yo nunca me he reído de alguien cuando hizo el ridículo",
    "Yo nunca he contado un secreto vergonzoso de otra persona",
  ],
}

export default function YoNuncaPage() {
  const [category, setCategory] = useState("amistad")
  const [currentQuestion, setCurrentQuestion] = useState("")
  const [customQuestions, setCustomQuestions] = useState<string[]>([])
  const [newCustomQuestion, setNewCustomQuestion] = useState("")
  const [isCustomMode, setIsCustomMode] = useState(false)
  const [allQuestions, setAllQuestions] = useState<string[]>([])

  // Cargar una pregunta al iniciar
  useEffect(() => {
    getRandomQuestion()
  }, [])

  // Actualizar cuando cambia la categoría o el modo
  useEffect(() => {
    getRandomQuestion()
  }, [category, isCustomMode])

  // Crear array con todas las preguntas combinadas
  useEffect(() => {
    const combined: string[] = [
      ...predefinedQuestions.amistad,
      ...predefinedQuestions.sexo,
      ...predefinedQuestions.fiesta,
      ...predefinedQuestions.vergüenza,
    ]
    setAllQuestions(combined)
  }, [])

  const getRandomQuestion = () => {
    let questions: string[] = []

    if (isCustomMode) {
      questions = customQuestions
    } else if (category === "todo") {
      questions = allQuestions
    } else {
      questions = predefinedQuestions[category as keyof typeof predefinedQuestions]
    }

    if (questions && questions.length > 0) {
      const randomIndex = Math.floor(Math.random() * questions.length)
      setCurrentQuestion(questions[randomIndex])
    } else {
      setCurrentQuestion(isCustomMode ? "Añade preguntas personalizadas" : "No hay preguntas en esta categoría")
    }
  }

  const addCustomQuestion = () => {
    if (newCustomQuestion.trim()) {
      const newQuestions = [...customQuestions, newCustomQuestion]
      setCustomQuestions(newQuestions)
      setNewCustomQuestion("")
      if (customQuestions.length === 0) {
        setCurrentQuestion(newCustomQuestion)
      }
    }
  }

  const handleCategoryChange = (value: string) => {
    if (value === "custom") {
      setIsCustomMode(true)
    } else {
      setIsCustomMode(false)
      setCategory(value)
    }
  }

  // Manejar la tecla Enter en el input
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addCustomQuestion()
    }
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="flex items-center mb-8">
          <Link href="/" legacyBehavior>
            <a>
              <Button variant="ghost" size="icon" className="mr-2 text-zinc-400 hover:text-white hover:bg-zinc-800">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </a>
          </Link>
          <h1 className="text-2xl font-light">Yo Nunca</h1>
        </header>

        <div className="max-w-xl mx-auto">
          <Tabs
            defaultValue="amistad"
            value={isCustomMode ? "custom" : category}
            onValueChange={handleCategoryChange}
            className="w-full"
          >
            <TabsList className="grid grid-cols-6 mb-8 bg-zinc-800 border border-zinc-700 p-1 rounded-lg">
              <TabsTrigger
                value="amistad"
                className="data-[state=active]:bg-pink-500/20 data-[state=active]:text-pink-300"
              >
                Amistad
              </TabsTrigger>
              <TabsTrigger
                value="sexo"
                className="data-[state=active]:bg-pink-500/20 data-[state=active]:text-pink-300"
              >
                Sexo
              </TabsTrigger>
              <TabsTrigger
                value="fiesta"
                className="data-[state=active]:bg-pink-500/20 data-[state=active]:text-pink-300"
              >
                Fiesta
              </TabsTrigger>
              <TabsTrigger
                value="vergüenza"
                className="data-[state=active]:bg-pink-500/20 data-[state=active]:text-pink-300"
              >
                Vergüenza
              </TabsTrigger>
              <TabsTrigger
                value="todo"
                className="data-[state=active]:bg-pink-500/20 data-[state=active]:text-pink-300"
              >
                Todo
              </TabsTrigger>
              <TabsTrigger
                value="custom"
                className="data-[state=active]:bg-pink-500/20 data-[state=active]:text-pink-300"
              >
                Personal
              </TabsTrigger>
            </TabsList>

            <div>
              <Card className="bg-zinc-800/50 border-0 shadow-lg mb-8 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-pink-900/10 to-transparent pointer-events-none"></div>
                <CardContent className="p-8 relative z-10">
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-pink-500/10 flex items-center justify-center">
                      <Wine className="w-8 h-8 text-pink-400" />
                    </div>
                  </div>
                  <p className="text-xl font-light text-center">{currentQuestion}</p>
                </CardContent>
              </Card>

              <div className="flex justify-center mb-8">
                <Button
                  onClick={() => getRandomQuestion()}
                  className="bg-pink-500/80 hover:bg-pink-600 text-white border-0"
                  size="lg"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Siguiente pregunta
                </Button>
              </div>

              {isCustomMode && (
                <div className="mt-8">
                  <div className="flex gap-2 mb-4">
                    <Input
                      placeholder="Añade tu propia frase de 'Yo nunca...'"
                      value={newCustomQuestion}
                      onChange={(e) => setNewCustomQuestion(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="bg-zinc-700/50 border-zinc-600 text-white placeholder:text-zinc-500 focus-visible:ring-pink-500"
                    />
                    <Button
                      onClick={() => addCustomQuestion()}
                      className="bg-pink-500/80 hover:bg-pink-600 text-white border-0"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {customQuestions.length > 0 && (
                    <Card className="bg-zinc-800 border border-zinc-700 shadow-lg">
                      <CardContent className="p-4">
                        <h3 className="text-sm text-zinc-400 mb-3">Tus frases personalizadas</h3>
                        <ul className="space-y-2 text-zinc-300">
                          {customQuestions.map((q, index) => (
                            <li key={index} className="pl-3 border-l border-zinc-700">
                              {q}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
