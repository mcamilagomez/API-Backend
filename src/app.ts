import userRoutes from "./Backend/userBackend/userRoute/user.routes"
import bookRoutes from "./Backend/BookBackend/bookRoute/book.routes"
import reservationRoutes from "./Backend/reservationBackend/reservationRoute/reservation.route"
import express from "express"
import { Request, Response } from "express"
import cors from "cors" 

// Prefijo de versión para las rutas de la API, útil para versionado y mantenimiento.
const SERVER_VERSION = "/api/v1/"

// Middleware para manejar rutas no encontradas.
// Si ninguna de las rutas definidas coincide, se responde con un error 404.
function routeNotFound(request: Request, response: Response) {
  response.status(404).json({
    message: "Route not found.",
  })
}

// Función principal que crea y configura la aplicación Express.
export default function createApp() {
  // MIDDLEWARES
  const app = express()

  app.use(cors())
  app.use(express.json())
  
// Registro de rutas principales para la API, usando el prefijo de versión:
  // - Rutas para usuarios.
  // - Rutas para libros.
  // - Rutas para reservaciones.
  app.use(SERVER_VERSION + "users", userRoutes)
  app.use(SERVER_VERSION + "books", bookRoutes)
  app.use(SERVER_VERSION + "reservations", reservationRoutes)
  app.use(routeNotFound)
  return app
}