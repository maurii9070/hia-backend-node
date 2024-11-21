import mongoose from 'mongoose'
import colors from 'colors'

export const db = async () => {
	try {
		const db = await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			serverSelectionTimeoutMS: 5000,
			socketTimeoutMS: 45000,
			replicaSet: 'rs0', // Nombre del replica set
			readPreference: 'primaryPreferred', // Preferencia de lectura, primario preferido pero permite secundario
			writeConcern: { w: 'majority', j: true }, // Garantiza que la escritura se propague en el replica set
		})

		const url = `${db.connection.host}:${db.connection.port}`
		console.log(colors.cyan(`MongoDB se conectó correctamente: ${url}`))

		// Manejo de eventos de conexión
		mongoose.connection.on('connected', () => {
			console.log(colors.green('Conexión a MongoDB establecida.'))
		})

		mongoose.connection.on('disconnected', () => {
			console.log(colors.red('Conexión a MongoDB perdida.'))
		})

		mongoose.connection.on('error', err => {
			console.error(colors.red(`Error de conexión a MongoDB: ${err.message}`))
		})

		mongoose.connection.on('reconnected', () => {
			console.log(colors.green('Conexión a MongoDB reconectada.'))
		})
	} catch (error) {
		console.error(colors.red(`Error al conectar con MongoDB: ${error.message}`))
		process.exit(1) // Detener la aplicación si no se puede conectar
	}
}
