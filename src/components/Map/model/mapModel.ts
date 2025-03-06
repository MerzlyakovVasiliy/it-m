import { createStore, createEvent } from 'effector'
import { LayerType, MapObject } from './types'

export const setMapObjects = createEvent<MapObject[]>()
export const setLayer = createEvent<LayerType>()

export const $mapObjects = createStore<MapObject[]>([]).on(
	setMapObjects,
	(prev, newObjects) => [...prev, ...newObjects]
)
export const $layer = createStore<LayerType>('temperature').on(
	setLayer,
	(_, newLayer) => newLayer
)