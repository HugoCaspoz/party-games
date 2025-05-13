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
  {
  question: "¿Quién escribió Romeo y Julieta?",
  options: ["William Shakespeare", "Charles Dickens", "Jane Austen", "Oscar Wilde"],
  correctAnswer: "William Shakespeare",
  category: "Literatura",
},
{
  question: "¿Cuál es el río más largo del mundo?",
  options: ["Nilo", "Amazonas", "Yangtsé", "Misisipi"],
  correctAnswer: "Amazonas",
  category: "Geografía",
},
{
  question: "¿En qué año comenzó la Primera Guerra Mundial?",
  options: ["1914", "1918", "1939", "1945"],
  correctAnswer: "1914",
  category: "Historia",
},
{
  question: "¿Cuál es el elemento químico más abundante en la corteza terrestre?",
  options: ["Hierro", "Oxígeno", "Silicio", "Aluminio"],
  correctAnswer: "Oxígeno",
  category: "Ciencia",
},
{
  question: "¿Quién pintó 'La noche estrellada'?",
  options: ["Pablo Picasso", "Vincent van Gogh", "Leonardo da Vinci", "Salvador Dalí"],
  correctAnswer: "Vincent van Gogh",
  category: "Arte",
},
{
  question: "¿Cuál es la capital de Australia?",
  options: ["Sídney", "Melbourne", "Canberra", "Brisbane"],
  correctAnswer: "Canberra",
  category: "Geografía",
},
{
  question: "¿Qué planeta es conocido como el planeta rojo?",
  options: ["Venus", "Marte", "Júpiter", "Saturno"],
  correctAnswer: "Marte",
  category: "Ciencia",
},
{
  question: "¿Quién compuso la Novena Sinfonía?",
  options: ["Mozart", "Bach", "Beethoven", "Tchaikovsky"],
  correctAnswer: "Beethoven",
  category: "Música",
},
{
  question: "¿En qué año se fundó la ONU?",
  options: ["1945", "1950", "1939", "1955"],
  correctAnswer: "1945",
  category: "Historia",
},
{
  question: "¿Cuál es el hueso más largo del cuerpo humano?",
  options: ["Fémur", "Húmero", "Tibia", "Radio"],
  correctAnswer: "Fémur",
  category: "Ciencia",
},
{
  question: "¿Quién dirigió la película 'El Padrino'?",
  options: ["Martin Scorsese", "Steven Spielberg", "Francis Ford Coppola", "Quentin Tarantino"],
  correctAnswer: "Francis Ford Coppola",
  category: "Cine",
},
{
  question: "¿Cuál es el océano más grande del mundo?",
  options: ["Atlántico", "Índico", "Pacífico", "Ártico"],
  correctAnswer: "Pacífico",
  category: "Geografía",
},
{
  question: "¿Quién escribió 'Cien años de soledad'?",
  options: ["Mario Vargas Llosa", "Gabriel García Márquez", "Julio Cortázar", "Pablo Neruda"],
  correctAnswer: "Gabriel García Márquez",
  category: "Literatura",
},
{
  question: "¿Cuál es el país más poblado del mundo?",
  options: ["India", "China", "Estados Unidos", "Indonesia"],
  correctAnswer: "India",
  category: "Geografía",
},
{
  question: "¿En qué año llegó el hombre a la Luna por primera vez?",
  options: ["1965", "1969", "1971", "1975"],
  correctAnswer: "1969",
  category: "Historia",
},
{
  question: "¿Cuál es el símbolo químico del oro?",
  options: ["Au", "Ag", "Fe", "Cu"],
  correctAnswer: "Au",
  category: "Ciencia",
},
{
  question: "¿Quién pintó la Mona Lisa?",
  options: ["Miguel Ángel", "Leonardo da Vinci", "Rafael", "Botticelli"],
  correctAnswer: "Leonardo da Vinci",
  category: "Arte",
},
{
  question: "¿Cuál es la montaña más alta del mundo?",
  options: ["K2", "Monte Everest", "Aconcagua", "Mont Blanc"],
  correctAnswer: "Monte Everest",
  category: "Geografía",
},
{
  question: "¿Quién fue el primer presidente de Estados Unidos?",
  options: ["Thomas Jefferson", "Abraham Lincoln", "George Washington", "John Adams"],
  correctAnswer: "George Washington",
  category: "Historia",
},
{
  question: "¿Cuál es el animal terrestre más rápido del mundo?",
  options: ["Leopardo", "Guepardo", "León", "Tigre"],
  correctAnswer: "Guepardo",
  category: "Ciencia",
},
{
  question: "¿En qué país se encuentra la Torre Eiffel?",
  options: ["Italia", "España", "Francia", "Alemania"],
  correctAnswer: "Francia",
  category: "Geografía",
},
{
  question: "¿Quién escribió 'Don Quijote de la Mancha'?",
  options: ["Federico García Lorca", "Miguel de Cervantes", "Lope de Vega", "Antonio Machado"],
  correctAnswer: "Miguel de Cervantes",
  category: "Literatura",
},
{
  question: "¿Cuál es el planeta más grande del sistema solar?",
  options: ["Tierra", "Saturno", "Júpiter", "Neptuno"],
  correctAnswer: "Júpiter",
  category: "Ciencia",
},
{
  question: "¿Quién compuso 'Las Cuatro Estaciones'?",
  options: ["Mozart", "Bach", "Vivaldi", "Chopin"],
  correctAnswer: "Vivaldi",
  category: "Música",
},
{
  question: "¿En qué año cayó el Muro de Berlín?",
  options: ["1985", "1989", "1991", "1993"],
  correctAnswer: "1989",
  category: "Historia",
},
{
  question: "¿Cuál es el metal más abundante en la corteza terrestre?",
  options: ["Hierro", "Aluminio", "Cobre", "Zinc"],
  correctAnswer: "Aluminio",
  category: "Ciencia",
},
{
  question: "¿Quién interpretó a Harry Potter en las películas?",
  options: ["Daniel Radcliffe", "Rupert Grint", "Tom Felton", "Emma Watson"],
  correctAnswer: "Daniel Radcliffe",
  category: "Cine",
},
{
  question: "¿Cuál es la capital de Canadá?",
  options: ["Toronto", "Montreal", "Ottawa", "Vancouver"],
  correctAnswer: "Ottawa",
  category: "Geografía",
},
{
  question: "¿Quién escribió 'La Odisea'?",
  options: ["Homero", "Sófocles", "Platón", "Aristóteles"],
  correctAnswer: "Homero",
  category: "Literatura",
},
{
  question: "¿Cuál es el instrumento musical más antiguo?",
  options: ["Flauta", "Tambor", "Arpa", "Lira"],
  correctAnswer: "Flauta",
  category: "Música",
},
{
  question: "¿En qué año se descubrió América?",
  options: ["1492", "1498", "1500", "1510"],
  correctAnswer: "1492",
  category: "Historia",
},
{
  question: "¿Cuál es el órgano más grande del cuerpo humano?",
  options: ["Corazón", "Cerebro", "Hígado", "Piel"],
  correctAnswer: "Piel",
  category: "Ciencia",
},
{
  question: "¿Quién dirigió 'Titanic'?",
  options: ["Steven Spielberg", "James Cameron", "Christopher Nolan", "Martin Scorsese"],
  correctAnswer: "James Cameron",
  category: "Cine",
},
{
  question: "¿Cuál es el desierto más grande del mundo?",
  options: ["Sahara", "Gobi", "Atacama", "Antártico"],
  correctAnswer: "Antártico",
  category: "Geografía",
},
{
  question: "¿Quién pintó 'El Grito'?",
  options: ["Edvard Munch", "Pablo Picasso", "Salvador Dalí", "Claude Monet"],
  correctAnswer: "Edvard Munch",
  category: "Arte",
},
{
  question: "¿Cuál es el idioma más hablado del mundo?",
  options: ["Inglés", "Español", "Mandarín", "Hindi"],
  correctAnswer: "Mandarín",
  category: "Cultura general",
},
{
  question: "¿Quién inventó la bombilla eléctrica?",
  options: ["Nikola Tesla", "Thomas Edison", "Alexander Graham Bell", "Albert Einstein"],
  correctAnswer: "Thomas Edison",
  category: "Ciencia",
},
{
  question: "¿En qué país se encuentra el Taj Mahal?",
  options: ["India", "Pakistán", "Irán", "Egipto"],
  correctAnswer: "India",
  category: "Geografía",
},
{
  question: "¿Cuál es el deporte más popular del mundo?",
  options: ["Baloncesto", "Fútbol", "Tenis", "Cricket"],
  correctAnswer: "Fútbol",
  category: "Deportes",
},
{
  question: "¿Quién fue el primer ser humano en viajar al espacio?",
  options: ["Neil Armstrong", "Yuri Gagarin", "Buzz Aldrin", "Alan Shepard"],
  correctAnswer: "Yuri Gagarin",
  category: "Historia",
},
{
  question: "¿Cuál es la capital de Japón?",
  options: ["Pekín", "Seúl", "Tokio", "Bangkok"],
  correctAnswer: "Tokio",
  category: "Geografía",
},
{
  question: "¿Quién escribió 'El Principito'?",
  options: ["Jules Verne", "Antoine de Saint-Exupéry", "Victor Hugo", "Albert Camus"],
  correctAnswer: "Antoine de Saint-Exupéry",
  category: "Literatura",
},
{
  question: "¿Cuál es el animal nacional de China?",
  options: ["Dragón", "Oso panda", "Tigre", "Águila"],
  correctAnswer: "Oso panda",
  category: "Cultura general",
},
{
  question: "¿Cuántos huesos tiene el cuerpo humano adulto?",
  options: ["206", "186", "226", "246"],
  correctAnswer: "206",
  category: "Ciencia",
},
{
  question: "¿Quién pintó 'La última cena'?",
  options: ["Miguel Ángel", "Leonardo da Vinci", "Rafael", "Caravaggio"],
  correctAnswer: "Leonardo da Vinci",
  category: "Arte",
},
{
  question: "¿Cuál es la moneda oficial de Japón?",
  options: ["Yuan", "Won", "Yen", "Ringgit"],
  correctAnswer: "Yen",
  category: "Economía",
},
{
  question: "¿Quién descubrió la penicilina?",
  options: ["Louis Pasteur", "Alexander Fleming", "Marie Curie", "Robert Koch"],
  correctAnswer: "Alexander Fleming",
  category: "Ciencia",
},
{
  question: "¿Cuál es el país más pequeño del mundo?",
  options: ["Mónaco", "Vaticano", "San Marino", "Liechtenstein"],
  correctAnswer: "Vaticano",
  category: "Geografía",
},
{
  question: "¿Quién fue el autor de 'La Divina Comedia'?",
  options: ["Dante Alighieri", "Giovanni Boccaccio", "Francesco Petrarca", "Nicolás Maquiavelo"],
  correctAnswer: "Dante Alighieri",
  category: "Literatura",
},
{
  question: "¿Cuál es el lago más profundo del mundo?",
  options: ["Lago Superior", "Lago Victoria", "Lago Baikal", "Lago Tanganica"],
  correctAnswer: "Lago Baikal",
  category: "Geografía",
},
{
  question: "¿Quién ganó el Mundial de Fútbol de 2018?",
  options: ["Brasil", "Alemania", "Francia", "Argentina"],
  correctAnswer: "Francia",
  category: "Deportes",
},
{
  question: "¿Cuál es la velocidad de la luz?",
  options: ["300,000 km/s", "150,000 km/s", "200,000 km/s", "250,000 km/s"],
  correctAnswer: "300,000 km/s",
  category: "Ciencia",
},
{
  question: "¿Quién fue el primer emperador de China?",
  options: ["Qin Shi Huang", "Kublai Khan", "Wu Zetian", "Sun Yat-sen"],
  correctAnswer: "Qin Shi Huang",
  category: "Historia",
},
{
  question: "¿Cuál es la capital de Egipto?",
  options: ["Alejandría", "El Cairo", "Luxor", "Asuán"],
  correctAnswer: "El Cairo",
  category: "Geografía",
},
{
  question: "¿Quién escribió 'Orgullo y prejuicio'?",
  options: ["Emily Brontë", "Jane Austen", "Virginia Woolf", "Charlotte Brontë"],
  correctAnswer: "Jane Austen",
  category: "Literatura",
},
{
  question: "¿Cuál es el principal gas de la atmósfera terrestre?",
  options: ["Oxígeno", "Dióxido de carbono", "Nitrógeno", "Argón"],
  correctAnswer: "Nitrógeno",
  category: "Ciencia",
},
{
  question: "¿Quién pintó 'Guernica'?",
  options: ["Salvador Dalí", "Pablo Picasso", "Joan Miró", "Francisco de Goya"],
  correctAnswer: "Pablo Picasso",
  category: "Arte",
},
{
  question: "¿En qué año terminó la Segunda Guerra Mundial?",
  options: ["1943", "1944", "1945", "1946"],
  correctAnswer: "1945",
  category: "Historia",
},
{
  question: "¿Cuál es el segundo planeta del sistema solar?",
  options: ["Mercurio", "Venus", "Tierra", "Marte"],
  correctAnswer: "Venus",
  category: "Ciencia",
},
{
  question: "¿Quién compuso 'El lago de los cisnes'?",
  options: ["Tchaikovsky", "Mozart", "Beethoven", "Chopin"],
  correctAnswer: "Tchaikovsky",
  category: "Música",
},
{
  question: "¿Cuál es la capital de Brasil?",
  options: ["Río de Janeiro", "São Paulo", "Brasilia", "Salvador"],
  correctAnswer: "Brasilia",
  category: "Geografía",
},
{
  question: "¿Quién escribió 'Hamlet'?",
  options: ["William Shakespeare", "Oscar Wilde", "Charles Dickens", "Mark Twain"],
  correctAnswer: "William Shakespeare",
  category: "Literatura",
},
{
  question: "¿Cuál es el elemento químico con símbolo 'Fe'?",
  options: ["Fósforo", "Flúor", "Hierro", "Fermio"],
  correctAnswer: "Hierro",
  category: "Ciencia",
},
{
  question: "¿Quién fue el primer hombre en pisar la Luna?",
  options: ["Buzz Aldrin", "Neil Armstrong", "Yuri Gagarin", "Alan Shepard"],
  correctAnswer: "Neil Armstrong",
  category: "Historia",
},
{
  question: "¿Cuál es la capital de Rusia?",
  options: ["San Petersburgo", "Kiev", "Moscú", "Vladivostok"],
  correctAnswer: "Moscú",
  category: "Geografía",
},
{
  question: "¿Quién dirigió 'Psicosis'?",
  options: ["Steven Spielberg", "Alfred Hitchcock", "Stanley Kubrick", "Orson Welles"],
  correctAnswer: "Alfred Hitchcock",
  category: "Cine",
},
{
  question: "¿Cuál es el río más largo de Europa?",
  options: ["Danubio", "Rin", "Volga", "Támesis"],
  correctAnswer: "Volga",
  category: "Geografía",
},
{
  question: "¿Quién escribió 'La Metamorfosis'?",
  options: ["Franz Kafka", "Friedrich Nietzsche", "Thomas Mann", "Hermann Hesse"],
  correctAnswer: "Franz Kafka",
  category: "Literatura",
},
{
  question: "¿Cuál es la fórmula química del agua?",
  options: ["H2O", "CO2", "O2", "H2SO4"],
  correctAnswer: "H2O",
  category: "Ciencia",
},
{
  question: "¿Quién pintó 'Las meninas'?",
  options: ["El Greco", "Diego Velázquez", "Francisco de Goya", "Pablo Picasso"],
  correctAnswer: "Diego Velázquez",
  category: "Arte",
},
{
  question: "¿En qué año comenzó la Revolución Francesa?",
  options: ["1789", "1799", "1769", "1779"],
  correctAnswer: "1789",
  category: "Historia",
},
{
  question: "¿Cuál es el país más extenso del mundo?",
  options: ["China", "Estados Unidos", "Canadá", "Rusia"],
  correctAnswer: "Rusia",
  category: "Geografía",
},
{
  question: "¿Quién escribió 'Crimen y castigo'?",
  options: ["León Tolstói", "Fiódor Dostoyevski", "Antón Chéjov", "Iván Turguénev"],
  correctAnswer: "Fiódor Dostoyevski",
  category: "Literatura",
},
{
  question: "¿Cuál es la galaxia más cercana a la Vía Láctea?",
  options: ["Andrómeda", "Triángulo", "Centauro A", "Magallanes"],
  correctAnswer: "Andrómeda",
  category: "Ciencia",
},
{
  question: "¿Quién compuso 'Claro de luna'?",
  options: ["Beethoven", "Mozart", "Debussy", "Chopin"],
  correctAnswer: "Debussy",
  category: "Música",
},
{
  question: "¿Cuál es la capital de Argentina?",
  options: ["Santiago", "Buenos Aires", "Montevideo", "Lima"],
  correctAnswer: "Buenos Aires",
  category: "Geografía",
},
{
  question: "¿Quién escribió '1984'?",
  options: ["Aldous Huxley", "George Orwell", "Ray Bradbury", "H.G. Wells"],
  correctAnswer: "George Orwell",
  category: "Literatura",
},
{
  question: "¿Cuál es el hueso más pequeño del cuerpo humano?",
  options: ["Yunque", "Estribo", "Martillo", "Cóccix"],
  correctAnswer: "Estribo",
  category: "Ciencia",
},
{
  question: "¿Quién fue el fundador de Apple?",
  options: ["Bill Gates", "Steve Jobs", "Mark Zuckerberg", "Jeff Bezos"],
  correctAnswer: "Steve Jobs",
  category: "Tecnología",
},
{
  question: "¿Cuál es la capital de Sudáfrica?",
  options: ["Ciudad del Cabo", "Johannesburgo", "Pretoria", "Durban"],
  correctAnswer: "Pretoria",
  category: "Geografía",
},
{
  question: "¿Quién escribió 'El viejo y el mar'?",
  options: ["Ernest Hemingway", "F. Scott Fitzgerald", "William Faulkner", "John Steinbeck"],
  correctAnswer: "Ernest Hemingway",
  category: "Literatura",
},
{
  question: "¿Cuál es el único mamífero que puede volar?",
  options: ["Ardilla voladora", "Murciélago", "Lémur volador", "Colúgido"],
  correctAnswer: "Murciélago",
  category: "Ciencia",
},
{
  question: "¿Quién pintó 'El nacimiento de Venus'?",
  options: ["Leonardo da Vinci", "Miguel Ángel", "Sandro Botticelli", "Rafael"],
  correctAnswer: "Sandro Botticelli",
  category: "Arte",
},
{
  question: "¿En qué año se independizó México de España?",
  options: ["1810", "1821", "1830", "1836"],
  correctAnswer: "1821",
  category: "Historia",
},
{
  question: "¿Cuál es la capital de Marruecos?",
  options: ["Casablanca", "Marrakech", "Rabat", "Tánger"],
  correctAnswer: "Rabat",
  category: "Geografía",
},
{
  question: "¿Quién escribió 'Cumbres borrascosas'?",
  options: ["Charlotte Brontë", "Emily Brontë", "Jane Austen", "Virginia Woolf"],
  correctAnswer: "Emily Brontë",
  category: "Literatura",
},
{
  question: "¿Cuál es el planeta más cercano al Sol?",
  options: ["Venus", "Tierra", "Marte", "Mercurio"],
  correctAnswer: "Mercurio",
  category: "Ciencia",
},
{
  question: "¿Quién compuso 'La Traviata'?",
  options: ["Mozart", "Verdi", "Puccini", "Rossini"],
  correctAnswer: "Verdi",
  category: "Música",
},
{
  question: "¿Cuál es la montaña más alta de América?",
  options: ["Monte McKinley", "Monte Everest", "Aconcagua", "Kilimanjaro"],
  correctAnswer: "Aconcagua",
  category: "Geografía",
},
{
  question: "¿Quién escribió 'La Ilíada'?",
  options: ["Homero", "Sófocles", "Eurípides", "Aristóteles"],
  correctAnswer: "Homero",
  category: "Literatura",
},
{
  question: "¿Cuál es el animal más grande del mundo?",
  options: ["Elefante africano", "Ballena azul", "Tiburón ballena", "Calamar gigante"],
  correctAnswer: "Ballena azul",
  category: "Ciencia",
},
{
  question: "¿Quién pintó 'La persistencia de la memoria'?",
  options: ["Pablo Picasso", "Salvador Dalí", "Joan Miró", "René Magritte"],
  correctAnswer: "Salvador Dalí",
  category: "Arte",
},
{
  question: "¿En qué año cayó el Imperio Romano de Occidente?",
  options: ["395 d.C.", "476 d.C.", "527 d.C.", "1453 d.C."],
  correctAnswer: "476 d.C.",
  category: "Historia",
},
{
  question: "¿Cuál es la capital de Suecia?",
  options: ["Oslo", "Copenhague", "Helsinki", "Estocolmo"],
  correctAnswer: "Estocolmo",
  category: "Geografía",
},
{
  question: "¿Quién escribió 'El retrato de Dorian Gray'?",
  options: ["Oscar Wilde", "Edgar Allan Poe", "Charles Dickens", "Mark Twain"],
  correctAnswer: "Oscar Wilde",
  category: "Literatura",
},
{
  question: "¿Cuál es el elemento más abundante en el universo?",
  options: ["Oxígeno", "Carbono", "Hidrógeno", "Helio"],
  correctAnswer: "Hidrógeno",
  category: "Ciencia",
},
{
  question: "¿Quién dirigió 'El Padrino II'?",
  options: ["Martin Scorsese", "Francis Ford Coppola", "Steven Spielberg", "Brian De Palma"],
  correctAnswer: "Francis Ford Coppola",
  category: "Cine",
},
{
  question: "¿Cuál es el río más largo de África?",
  options: ["Nilo", "Congo", "Níger", "Zambeze"],
  correctAnswer: "Nilo",
  category: "Geografía",
},
{
  question: "¿Quién escribió 'Moby Dick'?",
  options: ["Herman Melville", "Mark Twain", "Edgar Allan Poe", "Walt Whitman"],
  correctAnswer: "Herman Melville",
  category: "Literatura",
},
{
  question: "¿Cuál es la unidad básica de la vida?",
  options: ["Átomo", "Molécula", "Célula", "Tejido"],
  correctAnswer: "Célula",
  category: "Ciencia",
},
{
  question: "¿Quién pintó 'Los girasoles'?",
  options: ["Claude Monet", "Vincent van Gogh", "Paul Cézanne", "Pierre-Auguste Renoir"],
  correctAnswer: "Vincent van Gogh",
  category: "Arte",
},
{
  question: "¿En qué año comenzó la Guerra Civil Española?",
  options: ["1936", "1939", "1934", "1941"],
  correctAnswer: "1936",
  category: "Historia",
},
{
  question: "¿Cuál es la capital de Portugal?",
  options: ["Oporto", "Lisboa", "Faro", "Coímbra"],
  correctAnswer: "Lisboa",
  category: "Geografía",
},
{
  question: "¿Quién escribió 'El Gran Gatsby'?",
  options: ["Ernest Hemingway", "F. Scott Fitzgerald", "William Faulkner", "John Steinbeck"],
  correctAnswer: "F. Scott Fitzgerald",
  category: "Literatura",
},
{
  question: "¿Cuál es el metal más precioso?",
  options: ["Oro", "Platino", "Plata", "Rodio"],
  correctAnswer: "Rodio",
  category: "Ciencia",
},
{
  question: "¿Quién compuso 'Réquiem'?",
  options: ["Bach", "Beethoven", "Mozart", "Handel"],
  correctAnswer: "Mozart",
  category: "Música",
},
{
  question: "¿Cuál es el país con más islas en el mundo?",
  options: ["Filipinas", "Indonesia", "Japón", "Suecia"],
  correctAnswer: "Suecia",
  category: "Geografía",
},
{
  question: "¿Quién escribió 'La metamorfosis'?",
  options: ["Franz Kafka", "Friedrich Nietzsche", "Thomas Mann", "Hermann Hesse"],
  correctAnswer: "Franz Kafka",
  category: "Literatura",
},
{
  question: "¿Cuál es el único metal líquido a temperatura ambiente?",
  options: ["Galio", "Mercurio", "Cesio", "Bromo"],
  correctAnswer: "Mercurio",
  category: "Ciencia",
},
{
  question: "¿Quién pintó 'El jardín de las delicias'?",
  options: ["El Bosco", "Pieter Bruegel", "Jan van Eyck", "Rembrandt"],
  correctAnswer: "El Bosco",
  category: "Arte",
},
{
  question: "¿En qué año se produjo la Revolución Rusa?",
  options: ["1905", "1917", "1921", "1925"],
  correctAnswer: "1917",
  category: "Historia",
},
{
  question: "¿Cuál es la capital de Turquía?",
  options: ["Estambul", "Ankara", "Esmirna", "Antalya"],
  correctAnswer: "Ankara",
  category: "Geografía",
},
{
  question: "¿Quién escribió 'Ulises'?",
  options: ["Oscar Wilde", "James Joyce", "Virginia Woolf", "D.H. Lawrence"],
  correctAnswer: "James Joyce",
  category: "Literatura",
},
{
  question: "¿Cuál es el gas noble más abundante en la atmósfera terrestre?",
  options: ["Helio", "Neón", "Argón", "Kriptón"],
  correctAnswer: "Argón",
  category: "Ciencia",
},
{
  question: "¿Quién dirigió 'Ciudadano Kane'?",
  options: ["Alfred Hitchcock", "Orson Welles", "John Ford", "Billy Wilder"],
  correctAnswer: "Orson Welles",
  category: "Cine",
},
{
  question: "¿Cuál es el lago más grande de América del Sur?",
  options: ["Titicaca", "Maracaibo", "Poopó", "Buenos Aires/General Carrera"],
  correctAnswer: "Maracaibo",
  category: "Geografía",
},
{
  question: "¿Quién escribió 'El lobo estepario'?",
  options: ["Franz Kafka", "Thomas Mann", "Hermann Hesse", "Friedrich Nietzsche"],
  correctAnswer: "Hermann Hesse",
  category: "Literatura",
},
{
  question: "¿Cuál es la partícula subatómica con carga positiva?",
  options: ["Electrón", "Protón", "Neutrón", "Fotón"],
  correctAnswer: "Protón",
  category: "Ciencia",
},
{
  question: "¿Quién pintó 'Las señoritas de Avignon'?",
  options: ["Salvador Dalí", "Pablo Picasso", "Henri Matisse", "Georges Braque"],
  correctAnswer: "Pablo Picasso",
  category: "Arte",
},
{
  question: "¿En qué año se firmó la Declaración de Independencia de Estados Unidos?",
  options: ["1776", "1789", "1781", "1783"],
  correctAnswer: "1776",
  category: "Historia",
},
{
  question: "¿Cuál es la capital de Holanda?",
  options: ["Róterdam", "La Haya", "Ámsterdam", "Utrecht"],
  correctAnswer: "Ámsterdam",
  category: "Geografía",
},
{
  question: "¿Quién escribió 'Madame Bovary'?",
  options: ["Gustave Flaubert", "Victor Hugo", "Émile Zola", "Honoré de Balzac"],
  correctAnswer: "Gustave Flaubert",
  category: "Literatura",
},
{
  question: "¿Cuál es el proceso por el cual las plantas fabrican su alimento?",
  options: ["Respiración", "Fotosíntesis", "Digestión", "Fermentación"],
  correctAnswer: "Fotosíntesis",
  category: "Ciencia",
},
{
  question: "¿Quién compuso 'La flauta mágica'?",
  options: ["Beethoven", "Mozart", "Bach", "Handel"],
  correctAnswer: "Mozart",
  category: "Música",
},
{
  question: "¿Cuál es el estrecho que separa Asia de América?",
  options: ["Estrecho de Bering", "Estrecho de Gibraltar", "Estrecho de Malaca", "Estrecho de Magallanes"],
  correctAnswer: "Estrecho de Bering",
  category: "Geografía",
},
{
  question: "¿Quién escribió 'El proceso'?",
  options: ["Franz Kafka", "Albert Camus", "Jean-Paul Sartre", "Friedrich Nietzsche"],
  correctAnswer: "Franz Kafka",
  category: "Literatura",
},
{
  question: "¿Cuál es el órgano que produce la insulina?",
  options: ["Hígado", "Riñón", "Páncreas", "Bazo"],
  correctAnswer: "Páncreas",
  category: "Ciencia",
},
{
  question: "¿Quién pintó 'La joven de la perla'?",
  options: ["Rembrandt", "Johannes Vermeer", "Frans Hals", "Jan van Eyck"],
  correctAnswer: "Johannes Vermeer",
  category: "Arte",
},
{
  question: "¿En qué año comenzó la Guerra de los Cien Años?",
  options: ["1337", "1346", "1356", "1366"],
  correctAnswer: "1337",
  category: "Historia",
},
{
  question: "¿Cuál es la capital de Dinamarca?",
  options: ["Oslo", "Estocolmo", "Helsinki", "Copenhague"],
  correctAnswer: "Copenhague",
  category: "Geografía",
},
{
  question: "¿Quién escribió 'Las uvas de la ira'?",
  options: ["Ernest Hemingway", "William Faulkner", "John Steinbeck", "F. Scott Fitzgerald"],
  correctAnswer: "John Steinbeck",
  category: "Literatura",
},
{
  question: "¿Cuál es la capa más externa de la Tierra?",
  options: ["Núcleo", "Manto", "Corteza", "Litosfera"],
  correctAnswer: "Corteza",
  category: "Ciencia",
},
{
  question: "¿Quién dirigió 'Pulp Fiction'?",
  options: ["Martin Scorsese", "Quentin Tarantino", "Steven Spielberg", "David Lynch"],
  correctAnswer: "Quentin Tarantino",
  category: "Cine",
},
{
  question: "¿Cuál es el país más pequeño de América del Sur?",
  options: ["Uruguay", "Surinam", "Guyana", "Ecuador"],
  correctAnswer: "Surinam",
  category: "Geografía",
},
{
  question: "¿Quién escribió 'El extranjero'?",
  options: ["Jean-Paul Sartre", "Albert Camus", "Simone de Beauvoir", "André Gide"],
  correctAnswer: "Albert Camus",
  category: "Literatura",
},
{
  question: "¿Cuál es la hormona del estrés?",
  options: ["Adrenalina", "Insulina", "Cortisol", "Melatonina"],
  correctAnswer: "Cortisol",
  category: "Ciencia",
},
{
  question: "¿Quién pintó 'El beso'?",
  options: ["Pablo Picasso", "Gustav Klimt", "Auguste Rodin", "Edvard Munch"],
  correctAnswer: "Gustav Klimt",
  category: "Arte",
},
{
  question: "¿En qué año terminó la Guerra Fría?",
  options: ["1985", "1989", "1991", "1993"],
  correctAnswer: "1991",
  category: "Historia",
},
{
  question: "¿Cuál es la capital de Grecia?",
  options: ["Atenas", "Tesalónica", "Patras", "Heraklion"],
  correctAnswer: "Atenas",
  category: "Geografía",
},
{
  question: "¿Quién escribió 'Matar a un ruiseñor'?",
  options: ["J.D. Salinger", "Harper Lee", "F. Scott Fitzgerald", "Ernest Hemingway"],
  correctAnswer: "Harper Lee",
  category: "Literatura",
},
{
  question: "¿Cuál es el elemento químico con símbolo 'Na'?",
  options: ["Neón", "Níquel", "Nitrógeno", "Sodio"],
  correctAnswer: "Sodio",
  category: "Ciencia",
},
{
  question: "¿Quién compuso 'El Mesías'?",
  options: ["Bach", "Mozart", "Handel", "Vivaldi"],
  correctAnswer: "Handel",
  category: "Música",
},
{
  question: "¿Cuál es el río más largo de Asia?",
  options: ["Yangtsé", "Ganges", "Mekong", "Obi-Irtish"],
  correctAnswer: "Yangtsé",
  category: "Geografía",
},
{
  question: "¿Quién escribió 'La náusea'?",
  options: ["Albert Camus", "Jean-Paul Sartre", "Simone de Beauvoir", "André Gide"],
  correctAnswer: "Jean-Paul Sartre",
  category: "Literatura",
},
{
  question: "¿Cuál es el planeta más pequeño del sistema solar?",
  options: ["Marte", "Venus", "Mercurio", "Plutón"],
  correctAnswer: "Mercurio",
  category: "Ciencia",
},
{
  question: "¿Quién pintó 'Las tres gracias'?",
  options: ["Tiziano", "Rubens", "Botticelli", "Rafael"],
  correctAnswer: "Rubens",
  category: "Arte",
},
{
  question: "¿En qué año se produjo la Revolución Industrial?",
  options: ["Siglo XVII", "Siglo XVIII", "Siglo XIX", "Siglo XX"],
  correctAnswer: "Siglo XVIII",
  category: "Historia",
},
{
  question: "¿Cuál es la capital de Noruega?",
  options: ["Estocolmo", "Helsinki", "Copenhague", "Oslo"],
  correctAnswer: "Oslo",
  category: "Geografía",
},
{
  question: "¿Quién escribió 'El guardián entre el centeno'?",
  options: ["J.D. Salinger", "Ernest Hemingway", "F. Scott Fitzgerald", "William Faulkner"],
  correctAnswer: "J.D. Salinger",
  category: "Literatura",
},
{
  question: "¿Cuál es el ácido presente en el vinagre?",
  options: ["Ácido cítrico", "Ácido láctico", "Ácido acético", "Ácido málico"],
  correctAnswer: "Ácido acético",
  category: "Ciencia",
},
{
  question: "¿Quién dirigió 'El resplandor'?",
  options: ["Alfred Hitchcock", "Stanley Kubrick", "Steven Spielberg", "David Lynch"],
  correctAnswer: "Stanley Kubrick",
  category: "Cine",
},
{
  question: "¿Cuál es el archipiélago más grande del mundo?",
  options: ["Filipinas", "Indonesia", "Japón", "Maldivas"],
  correctAnswer: "Indonesia",
  category: "Geografía",
},
{
  question: "¿Quién escribió 'La montaña mágica'?",
  options: ["Hermann Hesse", "Thomas Mann", "Franz Kafka", "Robert Musil"],
  correctAnswer: "Thomas Mann",
  category: "Literatura",
},
{
  question: "¿Cuál es la glándula más grande del cuerpo humano?",
  options: ["Páncreas", "Tiroides", "Hígado", "Hipófisis"],
  correctAnswer: "Hígado",
  category: "Ciencia",
},
{
  question: "¿Quién pintó 'La creación de Adán'?",
  options: ["Leonardo da Vinci", "Miguel Ángel", "Rafael", "Donatello"],
  correctAnswer: "Miguel Ángel",
  category: "Arte",
},
{
  question: "¿En qué año se produjo la caída de Constantinopla?",
  options: ["1453", "1492", "1204", "1389"],
  correctAnswer: "1453",
  category: "Historia",
},
{
  question: "¿Cuál es la capital de Finlandia?",
  options: ["Oslo", "Estocolmo", "Helsinki", "Copenhague"],
  correctAnswer: "Helsinki",
  category: "Geografía",
},
{
  question: "¿Quién escribió 'En busca del tiempo perdido'?",
  options: ["Albert Camus", "Marcel Proust", "André Gide", "Jean-Paul Sartre"],
  correctAnswer: "Marcel Proust",
  category: "Literatura",
},
{
  question: "¿Cuál es el único gas noble que no se encuentra en el aire?",
  options: ["Helio", "Neón", "Radón", "Xenón"],
  correctAnswer: "Radón",
  category: "Ciencia",
},
{
  question: "¿Quién compuso 'La primavera'?",
  options: ["Bach", "Mozart", "Vivaldi", "Beethoven"],
  correctAnswer: "Vivaldi",
  category: "Música",
},
{
  question: "¿Cuál es el país con forma de bota?",
  options: ["España", "Portugal", "Grecia", "Italia"],
  correctAnswer: "Italia",
  category: "Geografía",
},
{
  question: "¿Quién escribió 'El señor de las moscas'?",
  options: ["George Orwell", "William Golding", "Aldous Huxley", "J.R.R. Tolkien"],
  correctAnswer: "William Golding",
  category: "Literatura",
},
{
  question: "¿Cuál es la vitamina que se obtiene principalmente a través de la exposición al sol?",
  options: ["Vitamina A", "Vitamina C", "Vitamina D", "Vitamina E"],
  correctAnswer: "Vitamina D",
  category: "Ciencia",
},
{
  question: "¿Quién pintó 'El grito'?",
  options: ["Vincent van Gogh", "Edvard Munch", "Pablo Picasso", "Salvador Dalí"],
  correctAnswer: "Edvard Munch",
  category: "Arte",
},
{
  question: "¿En qué año se produjo la Revolución Cubana?",
  options: ["1953", "1956", "1959", "1962"],
  correctAnswer: "1959",
  category: "Historia",
},
{
  question: "¿Cuál es la capital de Irlanda?",
  options: ["Belfast", "Cork", "Dublín", "Galway"],
  correctAnswer: "Dublín",
  category: "Geografía",
},
{
  question: "¿Quién escribió 'El amor en los tiempos del cólera'?",
  options: ["Mario Vargas Llosa", "Gabriel García Márquez", "Julio Cortázar", "Isabel Allende"],
  correctAnswer: "Gabriel García Márquez",
  category: "Literatura",
},
{
  question: "¿Cuál es el elemento químico más electronegativo?",
  options: ["Oxígeno", "Cloro", "Flúor", "Nitrógeno"],
  correctAnswer: "Flúor",
  category: "Ciencia",
},
{
  question: "¿Quién dirigió 'La lista de Schindler'?",
  options: ["Steven Spielberg", "Martin Scorsese", "Francis Ford Coppola", "Quentin Tarantino"],
  correctAnswer: "Steven Spielberg",
  category: "Cine",
},
{
  question: "¿Cuál es el país más poblado de África?",
  options: ["Egipto", "Etiopía", "Nigeria", "Sudáfrica"],
  correctAnswer: "Nigeria",
  category: "Geografía",
},
{
  question: "¿Quién escribió 'La insoportable levedad del ser'?",
  options: ["Milan Kundera", "Franz Kafka", "Václav Havel", "Bohumil Hrabal"],
  correctAnswer: "Milan Kundera",
  category: "Literatura",
},
{
  question: "¿Cuál es el único mamífero que pone huevos?",
  options: ["Ornitorrinco", "Equidna", "Koala", "Canguro"],
  correctAnswer: "Ornitorrinco",
  category: "Ciencia",
},
{
  question: "¿Quién pintó 'La última cena'?",
  options: ["Miguel Ángel", "Leonardo da Vinci", "Rafael", "Donatello"],
  correctAnswer: "Leonardo da Vinci",
  category: "Arte",
},
{
  question: "¿En qué año comenzó la Guerra de Vietnam?",
  options: ["1955", "1960", "1965", "1970"],
  correctAnswer: "1955",
  category: "Historia",
},
{
  question: "¿Cuál es la capital de Nueva Zelanda?",
  options: ["Auckland", "Wellington", "Christchurch", "Hamilton"],
  correctAnswer: "Wellington",
  category: "Geografía",
},
{
  question: "¿Quién escribió 'El retrato de Dorian Gray'?",
  options: ["Oscar Wilde", "Charles Dickens", "Jane Austen", "Emily Brontë"],
  correctAnswer: "Oscar Wilde",
  category: "Literatura",
},
{
  question: "¿Cuál es el elemento químico con símbolo 'Hg'?",
  options: ["Hidrógeno", "Helio", "Hafnio", "Mercurio"],
  correctAnswer: "Mercurio",
  category: "Ciencia",
},
{
  question: "¿Quién compuso 'Para Elisa'?",
  options: ["Mozart", "Bach", "Beethoven", "Chopin"],
  correctAnswer: "Beethoven",
  category: "Música",
},
{
  question: "¿Cuál es el país más grande de Centroamérica?",
  options: ["Guatemala", "Honduras", "Nicaragua", "Panamá"],
  correctAnswer: "Nicaragua",
  category: "Geografía",
},
{
  question: "¿Quién escribió 'El nombre de la rosa'?",
  options: ["Italo Calvino", "Umberto Eco", "Alberto Moravia", "Primo Levi"],
  correctAnswer: "Umberto Eco",
  category: "Literatura",
},
{
  question: "¿Cuál es la velocidad del sonido en el aire a temperatura ambiente?",
  options: ["343 m/s", "300 m/s", "400 m/s", "500 m/s"],
  correctAnswer: "343 m/s",
  category: "Ciencia",
},
{
  question: "¿Quién pintó 'Las Meninas'?",
  options: ["El Greco", "Francisco de Goya", "Diego Velázquez", "Pablo Picasso"],
  correctAnswer: "Diego Velázquez",
  category: "Arte",
},
{
  question: "¿En qué año se produjo la Revolución Mexicana?",
  options: ["1900", "1910", "1920", "1930"],
  correctAnswer: "1910",
  category: "Historia",
},
{
  question: "¿Cuál es la capital de Bélgica?",
  options: ["Amberes", "Brujas", "Bruselas", "Gante"],
  correctAnswer: "Bruselas",
  category: "Geografía",
},
{
  question: "¿Quién escribió 'Rayuela'?",
  options: ["Jorge Luis Borges", "Julio Cortázar", "Gabriel García Márquez", "Mario Vargas Llosa"],
  correctAnswer: "Julio Cortázar",
  category: "Literatura",
},
{
  question: "¿Cuál es el único metal líquido a temperatura ambiente?",
  options: ["Galio", "Mercurio", "Cesio", "Sodio"],
  correctAnswer: "Mercurio",
  category: "Ciencia",
},
{
  question: "¿Quién dirigió 'El Padrino'?",
  options: ["Martin Scorsese", "Francis Ford Coppola", "Steven Spielberg", "Brian De Palma"],
  correctAnswer: "Francis Ford Coppola",
  category: "Cine",
},
{
  question: "¿Cuál es el país más pequeño de África?",
  options: ["Gambia", "Seychelles", "Cabo Verde", "Santo Tomé y Príncipe"],
  correctAnswer: "Seychelles",
  category: "Geografía",
},
{
  question: "¿Quién escribió 'Pedro Páramo'?",
  options: ["Octavio Paz", "Juan Rulfo", "Carlos Fuentes", "Gabriel García Márquez"],
  correctAnswer: "Juan Rulfo",
  category: "Literatura",
},
{
  question: "¿Cuál es el planeta con más lunas en el sistema solar?",
  options: ["Júpiter", "Saturno", "Urano", "Neptuno"],
  correctAnswer: "Saturno",
  category: "Ciencia",
},
{
  question: "¿Quién pintó 'La noche estrellada'?",
  options: ["Claude Monet", "Vincent van Gogh", "Pablo Picasso", "Salvador Dalí"],
  correctAnswer: "Vincent van Gogh",
  category: "Arte",
},
{
  question: "¿En qué año se produjo la Revolución Rusa?",
  options: ["1905", "1917", "1921", "1925"],
  correctAnswer: "1917",
  category: "Historia",
},
{
  question: "¿Cuál es la capital de Australia?",
  options: ["Sídney", "Melbourne", "Canberra", "Brisbane"],
  correctAnswer: "Canberra",
  category: "Geografía",
},
{
  question: "¿Quién escribió 'El Quijote'?",
  options: ["Lope de Vega", "Miguel de Cervantes", "Francisco de Quevedo", "Luis de Góngora"],
  correctAnswer: "Miguel de Cervantes",
  category: "Literatura",
},
{
  question: "¿Cuál es el elemento químico más abundante en la corteza terrestre?",
  options: ["Hierro", "Silicio", "Aluminio", "Oxígeno"],
  correctAnswer: "Oxígeno",
  category: "Ciencia",
},
{
  question: "¿Quién compuso 'La Quinta Sinfonía'?",
  options: ["Mozart", "Bach", "Beethoven", "Tchaikovsky"],
  correctAnswer: "Beethoven",
  category: "Música",
},
{
  question: "¿Cuál es el país con más fronteras del mundo?",
  options: ["Rusia", "China", "Brasil", "Francia"],
  correctAnswer: "China",
  category: "Geografía",
},
{
  question: "¿Quién escribió 'La Odisea'?",
  options: ["Homero", "Sófocles", "Eurípides", "Aristóteles"],
  correctAnswer: "Homero",
  category: "Literatura",
},
{
  question: "¿Cuál es el hueso más pequeño del cuerpo humano?",
  options: ["Yunque", "Estribo", "Martillo", "Cóccix"],
  correctAnswer: "Estribo",
  category: "Ciencia",
},
{
  question: "¿Quién pintó 'El Guernica'?",
  options: ["Salvador Dalí", "Pablo Picasso", "Joan Miró", "Francisco de Goya"],
  correctAnswer: "Pablo Picasso",
  category: "Arte",
},
{
  question: "¿En qué año se produjo la caída del Muro de Berlín?",
  options: ["1985", "1987", "1989", "1991"],
  correctAnswer: "1989",
  category: "Historia",
},
{
  question: "¿Cuál es la capital de Canadá?",
  options: ["Toronto", "Montreal", "Ottawa", "Vancouver"],
  correctAnswer: "Ottawa",
  category: "Geografía",
},
{
  question: "¿Quién escribió '1984'?",
  options: ["Aldous Huxley", "George Orwell", "Ray Bradbury", "H.G. Wells"],
  correctAnswer: "George Orwell",
  category: "Literatura",
},
{
  question: "¿Cuál es el elemento químico con símbolo 'K'?",
  options: ["Kriptón", "Potasio", "Kobalto", "Kalio"],
  correctAnswer: "Potasio",
  category: "Ciencia",
},
{
  question: "¿Quién dirigió 'Vértigo'?",
  options: ["Alfred Hitchcock", "Orson Welles", "Billy Wilder", "John Ford"],
  correctAnswer: "Alfred Hitchcock",
  category: "Cine",
},
{
  question: "¿Cuál es el río más largo de Europa?",
  options: ["Danubio", "Rin", "Volga", "Támesis"],
  correctAnswer: "Volga",
  category: "Geografía",
},
{
  question: "¿Quién escribió 'Crónica de una muerte anunciada'?",
  options: ["Mario Vargas Llosa", "Gabriel García Márquez", "Julio Cortázar", "Isabel Allende"],
  correctAnswer: "Gabriel García Márquez",
  category: "Literatura",
},
{
  question: "¿Cuál es el animal más venenoso del mundo?",
  options: ["Serpiente mamba negra", "Medusa avispa de mar", "Rana dardo venenoso", "Escorpión"],
  correctAnswer: "Medusa avispa de mar",
  category: "Ciencia",
},
{
  question: "¿Quién pintó 'La persistencia de la memoria'?",
  options: ["Pablo Picasso", "Salvador Dalí", "Joan Miró", "René Magritte"],
  correctAnswer: "Salvador Dalí",
  category: "Arte",
},
{
  question: "¿En qué año comenzó la Segunda Guerra Mundial?",
  options: ["1936", "1939", "1941", "1945"],
  correctAnswer: "1939",
  category: "Historia",
},
{
  question: "¿Cuál es la capital de Egipto?",
  options: ["Alejandría", "El Cairo", "Luxor", "Asuán"],
  correctAnswer: "El Cairo",
  category: "Geografía",
},
{
  question: "¿Quién escribió 'Cien años de soledad'?",
  options: ["Mario Vargas Llosa", "Gabriel García Márquez", "Julio Cortázar", "Pablo Neruda"],
  correctAnswer: "Gabriel García Márquez",
  category: "Literatura",
},
{
  question: "¿Cuál es el planeta más grande del sistema solar?",
  options: ["Tierra", "Saturno", "Júpiter", "Neptuno"],
  correctAnswer: "Júpiter",
  category: "Ciencia",
},
{
  question: "¿Quién compuso 'El lago de los cisnes'?",
  options: ["Tchaikovsky", "Mozart", "Beethoven", "Chopin"],
  correctAnswer: "Tchaikovsky",
  category: "Música",
},
{
  question: "¿Cuál es el país más pequeño del mundo?",
  options: ["Mónaco", "Vaticano", "San Marino", "Liechtenstein"],
  correctAnswer: "Vaticano",
  category: "Geografía",
},
{
  question: "¿Quién escribió 'La metamorfosis'?",
  options: ["Franz Kafka", "Friedrich Nietzsche", "Thomas Mann", "Hermann Hesse"],
  correctAnswer: "Franz Kafka",
  category: "Literatura",
},
{
  question: "¿Cuál es el elemento químico más abundante en el universo?",
  options: ["Oxígeno", "Carbono", "Hidrógeno", "Helio"],
  correctAnswer: "Hidrógeno",
  category: "Ciencia",
},
{
  question: "¿Quién pintó 'Las señoritas de Avignon'?",
  options: ["Salvador Dalí", "Pablo Picasso", "Henri Matisse", "Georges Braque"],
  correctAnswer: "Pablo Picasso",
  category: "Arte",
},
{
  question: "¿En qué año se produjo la Revolución Francesa?",
  options: ["1776", "1789", "1799", "1804"],
  correctAnswer: "1789",
  category: "Historia",
},
{
  question: "¿Cuál es la capital de Brasil?",
  options: ["Río de Janeiro", "São Paulo", "Brasilia", "Salvador"],
  correctAnswer: "Brasilia",
  category: "Geografía",
},
{
  question: "¿Quién escribió 'El viejo y el mar'?",
  options: ["Ernest Hemingway", "F. Scott Fitzgerald", "William Faulkner", "John Steinbeck"],
  correctAnswer: "Ernest Hemingway",
  category: "Literatura",
},
{
  question: "¿Cuál es el órgano más grande del cuerpo humano?",
  options: ["Corazón", "Cerebro", "Hígado", "Piel"],
  correctAnswer: "Piel",
  category: "Ciencia",
},
{
  question: "¿Quién dirigió 'El ciudadano Kane'?",
  options: ["Alfred Hitchcock", "Orson Welles", "John Ford", "Billy Wilder"],
  correctAnswer: "Orson Welles",
  category: "Cine",
},
{
  question: "¿Cuál es el océano más pequeño del mundo?",
  options: ["Atlántico", "Índico", "Pacífico", "Ártico"],
  correctAnswer: "Ártico",
  category: "Geografía",
},
{
  question: "¿Quién escribió 'Crimen y castigo'?",
  options: ["León Tolstói", "Fiódor Dostoyevski", "Antón Chéjov", "Iván Turguénev"],
  correctAnswer: "Fiódor Dostoyevski",
  category: "Literatura",
},
{
  question: "¿Cuál es la partícula subatómica con carga negativa?",
  options: ["Electrón", "Protón", "Neutrón", "Fotón"],
  correctAnswer: "Electrón",
  category: "Ciencia",
},
{
  question: "¿Quién pintó 'Los girasoles'?",
  options: ["Claude Monet", "Vincent van Gogh", "Paul Cézanne", "Pierre-Auguste Renoir"],
  correctAnswer: "Vincent van Gogh",
  category: "Arte",
},
{
  question: "¿En qué año se descubrió América?",
  options: ["1492", "1498", "1500", "1510"],
  correctAnswer: "1492",
  category: "Historia",
},
{
  question: "¿Cuál es la capital de China?",
  options: ["Shanghái", "Hong Kong", "Pekín", "Cantón"],
  correctAnswer: "Pekín",
  category: "Geografía",
},
{
  question: "¿Quién escribió 'La Ilíada'?",
  options: ["Homero", "Sófocles", "Eurípides", "Aristóteles"],
  correctAnswer: "Homero",
  category: "Literatura",
},
{
  question: "¿Cuál es el símbolo químico del plomo?",
  options: ["Pl", "Pb", "Po", "Pm"],
  correctAnswer: "Pb",
  category: "Ciencia",
},
{
  question: "¿Quién compuso 'La Novena Sinfonía'?",
  options: ["Mozart", "Bach", "Beethoven", "Tchaikovsky"],
  correctAnswer: "Beethoven",
  category: "Música",
},
{
  question: "¿Cuál es el desierto más grande del mundo?",
  options: ["Sahara", "Gobi", "Atacama", "Antártico"],
  correctAnswer: "Antártico",
  category: "Geografía",
},
{
  question: "¿Quién escribió 'El Principito'?",
  options: ["Jules Verne", "Antoine de Saint-Exupéry", "Victor Hugo", "Albert Camus"],
  correctAnswer: "Antoine de Saint-Exupéry",
  category: "Literatura",
},
{
  question: "¿Cuál es el animal más rápido del mundo?",
  options: ["Guepardo", "Halcón peregrino", "Águila real", "Pez vela"],
  correctAnswer: "Halcón peregrino",
  category: "Ciencia",
},
{
  question: "¿Quién pintó 'El nacimiento de Venus'?",
  options: ["Leonardo da Vinci", "Miguel Ángel", "Sandro Botticelli", "Rafael"],
  correctAnswer: "Sandro Botticelli",
  category: "Arte",
},
{
  question: "¿En qué año terminó la Primera Guerra Mundial?",
  options: ["1916", "1917", "1918", "1919"],
  correctAnswer: "1918",
  category: "Historia",
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
