import { createStore, createEvent } from 'effector'
import { LayerType, MapObject } from './types'

export const setMapObjects = createEvent<MapObject[]>()
export const setLayer = createEvent<LayerType>()

export const $mapObjects = createStore<Map<string, MapObject>>(new Map()).on(
	setMapObjects,
	(prevMap, newData) => {
		const updatedMap = new Map(prevMap)

		newData.forEach(newItem => {
			const prevItem = updatedMap.get(newItem.uuid)

			if (!prevItem) {
				updatedMap.set(newItem.uuid, newItem)
				return
			}

			const isChanged =
				prevItem.is_active !== newItem.is_active ||
				prevItem.sensor.is_active !== newItem.sensor.is_active ||
				prevItem.sensor.pressure !== newItem.sensor.pressure ||
				prevItem.sensor.return_temperature !==
					newItem.sensor.return_temperature ||
				prevItem.sensor.supply_temperature !== newItem.sensor.supply_temperature

			if (isChanged) {
				updatedMap.set(newItem.uuid, newItem)
			}
		})

		return updatedMap
	}
)

export const $layer = createStore<LayerType>('temperature').on(
	setLayer,
	(_, newLayer) => newLayer
)