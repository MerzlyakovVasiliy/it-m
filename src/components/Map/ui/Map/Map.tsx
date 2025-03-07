import React, { useEffect, useMemo } from 'react'
import { useUnit } from 'effector-react'
import { MapContainer, TileLayer, LayersControl } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import {
	$layer,
	$mapObjects,
	setLayer,
	setMapObjects,
} from '../../model/mapModel'
import { PRESS, TEMP, TITLE_LAYER_URL, WS_URL } from '../../model/const'
import MapAutoFit from '../MapAutoFit/MapAutoFit'
import SensorMarker from '../MarkerMap/MarkerMap'

const URL = process.env.REACT_APP_WS_URL || WS_URL

export const Map: React.FC = () => {
	const mapObjects = useUnit($mapObjects)
	const layer = useUnit($layer)

	useEffect(() => {
		const socket = new WebSocket(URL)

		socket.onmessage = event => {
			const data = JSON.parse(event.data)
			setMapObjects(data)
		}

		return () => {
			if (socket.readyState === WebSocket.OPEN) {
				socket.close()
			}
		}
	}, [])

	const dataArray = useMemo(() => Array.from(mapObjects.values()), [mapObjects])

	return (
		<MapContainer
			center={[55.751244, 37.618423]}
			zoom={10}
			style={{ height: '100vh', width: '100%' }}
			zoomControl={false}
			doubleClickZoom={false}
		>
			<MapAutoFit mapObjects={dataArray} />
			<LayersControl position='topright'>
				<LayersControl.BaseLayer checked name={TEMP}>
					<TileLayer
						url={TITLE_LAYER_URL}
						eventHandlers={{ add: () => setLayer('temperature') }}
					/>
				</LayersControl.BaseLayer>
				<LayersControl.BaseLayer name={PRESS}>
					<TileLayer
						url={TITLE_LAYER_URL}
						eventHandlers={{ add: () => setLayer('pressure') }}
					/>
				</LayersControl.BaseLayer>
			</LayersControl>

			{dataArray.map(obj => (
				<SensorMarker key={obj.uuid} obj={obj} layer={layer} />
			))}
		</MapContainer>
	)
}