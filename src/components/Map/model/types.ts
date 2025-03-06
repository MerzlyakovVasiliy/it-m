export interface Sensor {
    is_active: boolean
    pressure: number
    supply_temperature: number
    return_temperature: number
    correct_pressure: boolean
    correct_supply_temperature: boolean
}

export interface MapObject {
    uuid: string
    name: string
    is_active: boolean
    latitude: number
    longitude: number
    sensor: Sensor
}

export type LayerType = 'temperature' | 'pressure'