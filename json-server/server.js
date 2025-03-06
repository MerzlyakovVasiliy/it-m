const WebSocket = require('ws')
const { v4: uuidv4 } = require('uuid')

const wss = new WebSocket.Server({ port: 8080 })

wss.on('connection', ws => {
	console.log('Клиент подключен')

	const sendData = () => {
		if (ws.readyState === WebSocket.OPEN) {
			ws.send(JSON.stringify(generateRandomData()))
			setTimeout(sendData, Math.random() * 2000 + 3000) // 3-5 секунд
		}
	}

	sendData()

	ws.on('close', () => {
		console.log('Клиент отключился')
	})
})

function generateRandomData() {
	return [
		{
			uuid: uuidv4(),
			name: `Device-${Math.floor(Math.random() * 100)}`,
			is_active: Math.random() > 0.5,
			latitude: (57.935 + Math.random() * (58.125 - 57.935)).toFixed(6),
			longitude: (56.15 + Math.random() * (56.35 - 56.15)).toFixed(6),
			sensor: {
				is_active: Math.random() > 0.5,
				pressure: +(Math.random() * 10).toFixed(2),
				supply_temperature: +(Math.random() * 100).toFixed(2),
				return_temperature: +(Math.random() * 100).toFixed(2),
				correct_pressure: Math.random() > 0.5,
				correct_supply_temperature: Math.random() > 0.5,
			},
		},
	]
}
