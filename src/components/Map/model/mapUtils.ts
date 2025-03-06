import L from 'leaflet'
import MarkerIconActiveTemp from '../../..//assets/map-pin-active-temp.svg'
import MarkerIconDisabledTemp from '../../..//assets/map-pin-disabled-temp.svg'
import MarkerIconDeviationTemp from '../../..//assets/map-pin-deviation-temp.svg'
import MarkerIconActivePress from '../../..//assets/map-pin-active-press.svg'
import MarkerIconDisabledPress from '../../../assets/map-pin-disabled-press.svg'
import MarkerIconDeviationPress from '../../..//assets/map-pin-deviation-press.svg'
import { LayerType, Sensor } from './types'

export const getMarkerIcon = (sensor: Sensor, layer: LayerType) => {
	const isTemperature = layer === 'temperature'

	const icons = {
		active: isTemperature ? MarkerIconActiveTemp : MarkerIconActivePress,
		disabled: isTemperature ? MarkerIconDisabledTemp : MarkerIconDisabledPress,
		deviation: isTemperature
			? MarkerIconDeviationTemp
			: MarkerIconDeviationPress,
	}

	let icon = icons.active

	if (!sensor.is_active) {
		icon = icons.disabled
	} else if (isTemperature && !sensor.correct_supply_temperature) {
		icon = icons.deviation
	} else if (!isTemperature && !sensor.correct_pressure) {
		icon = icons.deviation
	}

	return new L.Icon({
		iconUrl: icon,
		iconSize: [32, 32],
		iconAnchor: [16, 32],
	})
}
