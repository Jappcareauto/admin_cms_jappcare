"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression, LatLngTuple } from 'leaflet';

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { useMemo, useRef, useState } from "react";

interface MapProps {
    posix: LatLngExpression | LatLngTuple,
    zoom?: number,
    latitude: (value: number) => void,
    longitude: (value: number) => void,
    isDraggable: boolean,
    positionInit: {
        lat: number,
        lng: number
    }
}

const defaults = {
    zoom: 19,
}

const MapComponent = (Map: MapProps) => {
    const { zoom = defaults.zoom, posix, latitude, longitude, isDraggable, positionInit  } = Map
    const [position, setPosition] = useState(positionInit);
    const markerRef = useRef(null)
    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current
                if (marker != null) {
                    
                    setPosition(marker.getLatLng())
                   
                    longitude(marker.getLatLng().lng)
                    
                    latitude(marker.getLatLng().lat)
                }
            },
        }),
        [latitude, longitude],
    )
    return (
        <MapContainer
            center={posix}
            zoom={zoom}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker eventHandlers={eventHandlers} position={position} draggable={isDraggable} ref={markerRef}>
                <Popup>Location</Popup>
            </Marker>
        </MapContainer>
    )
}

export default MapComponent