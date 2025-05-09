import userRoutes from "./Backend/userBackend/userRoute/user.routes"
import bookRoutes from "./Backend/BookBackend/bookRoute/book.routes"
import reservationRoutes from "./Backend/reservationBackend/reservationRoute/reservation.route"
import express from "express"
import { Request, Response } from "express"
import cors from "cors" 

// ROUTES
const SERVER_VERSION = "/api/v1/"

// FALLBACKS
function routeNotFound(request: Request, response: Response) {
  response.status(404).json({
    message: "Route not found.",
  })
}

export default function createApp() {
  // MIDDLEWARES
  const app = express()

  app.use(cors())
  app.use(express.json())
  
  app.use(SERVER_VERSION + "users", userRoutes)
  app.use(SERVER_VERSION + "books", bookRoutes)
  app.use(SERVER_VERSION + "reservations", reservationRoutes)
  app.use(routeNotFound)
  return app
}