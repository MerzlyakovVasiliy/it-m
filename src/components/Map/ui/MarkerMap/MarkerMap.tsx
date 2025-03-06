
import React from 'react'
import { Marker, Popup } from 'react-leaflet'
import { LayerType, MapObject } from '../../model/types';
import { getMarkerIcon } from '../../model/mapUtils';

const SensorMarker = React.memo(
	({ obj, layer }: { obj: MapObject; layer: LayerType }) => (
		<Marker
			position={[obj.latitude, obj.longitude]}
			icon={getMarkerIcon(obj.sensor, layer)}
		>
			<Popup>
				<div style={{ minWidth: '150px', textAlign: 'center' }}>
					<strong>{obj.name}</strong>
					<br />
					{layer === 'temperature' ? (
						<>
							Температура подачи: {obj.sensor.supply_temperature}°C
							<br />
							Температура возврата: {obj.sensor.return_temperature}°C
						</>
					) : (
						<>Давление: {obj.sensor.pressure} бар</>
					)}
				</div>
			</Popup>
		</Marker>
	)
)

export default SensorMarker
