import mongoose from "mongoose"
import 'dotenv/config';
import { env } from "process"
// Función que establece la conexión con MongoDB utilizando la cadena de conexión desde las variables de entorno
export default function handleMongoConnection() {
    mongoose.connect((env as {MONGO_CONN_STRING: string}).MONGO_CONN_STRING).then(() => {
        console.log("Connected to mongo server.")
    })
}
 