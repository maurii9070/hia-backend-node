import mongoose from 'mongoose'
import colors from 'colors'

export const db = async () => {
	try {
		const db = await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true, // Opcional en versiones recientes
			useUnifiedTopology: true, // Opcional en versiones recientes
			serverSelectionTimeoutMS: 5000, // Tiempo de espera para encontrar un nodo disponible
			socketTimeoutMS: 45000, // Tiempo máximo permitido para operaciones largas
		})

		const url = `${db.connection.host}:${db.connection.port}`
		console.log(colors.cyan(`MongoDB se conectó correctamente: ${url}`))

		// Eventos para diagnosticar problemas
		mongoose.connection.on('connected', () => {
			console.log(colors.green('Conexión a MongoDB establecida.'))
		})

		mongoose.connection.on('disconnected', () => {
			console.log(colors.red('Conexión a MongoDB perdida.'))
		})

		mongoose.connection.on('error', err => {
			console.error(colors.red(`Error de conexión a MongoDB: ${err.message}`))
		})
	} catch (error) {
		console.error(colors.red(`Error al conectar con MongoDB: ${error.message}`))
		process.exit(1) // Detener la aplicación si no se puede conectar
	}
}
