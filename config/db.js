import mongoose from 'mongoose'
import colors from 'colors'

export const db = async () => {
	try {
		const db = await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			replicaSet: 'rs0', // Asegúrate de especificar el nombre del replica set
			readPreference: 'primaryPreferred', // Prioriza leer desde el primario, pero permitirá leer del secundario si el primario no está disponible
			socketTimeoutMS: 30000, // Tiempo de espera de socket
			connectTimeoutMS: 10000, // Tiempo de espera para establecer la conexión
			serverSelectionTimeoutMS: 5000, // Timeout para seleccionar el servidor
			heartbeatFrequencyMS: 1000, // Frecuencia de sondeo del replica set
			useUnifiedTopology: true, // Usar el nuevo motor de topología para la reconexión automática
		})
		const url = `${db.connection.host}:${db.connection.port}`
		console.log(colors.cyan(`MongoDB se conectó correctamente: ${url}`))
	} catch (error) {
		console.log(`Error: ${error.message}`)
		process.exit(1)
	}
}
