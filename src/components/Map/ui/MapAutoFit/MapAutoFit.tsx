import React, { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import L from 'leaflet'
import { MapObject } from '../../model/types'

const MapAutoFit: React.FC<{ mapObjects: MapObject[] }> = ({ mapObjects }) => {
	const map = useMap()

	useEffect(() => {
		if (mapObjects.length > 0) {
			const newBounds = L.latLngBounds(
				mapObjects.map(obj => [obj.latitude, obj.longitude])
			)
			const currentBounds = map.getBounds()

			if (!currentBounds.equals(newBounds)) {
				map.flyToBounds(newBounds, { duration: 1 })
			}
		}
	}, [mapObjects, map])

	return null
}

export default MapAutoFit
