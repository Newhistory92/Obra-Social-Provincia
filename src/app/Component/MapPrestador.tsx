import React, { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

interface MapPrestadorProps {
    coordinatesLat: number;
    coordinatesLon: number;
  }
  
  function MapPrestador({ coordinatesLat, coordinatesLon }: MapPrestadorProps) {
    const coordinates = { lat: coordinatesLat, lng: coordinatesLon };
    const mapRef = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<google.maps.Map | null>(null);
  useEffect(() => {
    const loadMap = async () => {
      const loader = new Loader({
        apiKey: "AIzaSyCLn_I4rgobIL5FgrHVHeLdL_mwsqBU5XQ", // Reemplaza "TU_API_KEY_AQUI" con tu API Key de Google Maps
        version: "weekly",
      });

      const { Map } = await loader.importLibrary("maps");

      // Configurar opciones del mapa con las coordenadas proporcionadas y un zoom de 5
      const mapOptions: google.maps.MapOptions = {
        center: coordinates,
        zoom: 3,
        mapId: "cesar-map",
      };

      // Crear el mapa
      const newMap = new Map(mapRef.current as HTMLDivElement, mapOptions);
      
      // Colocar un marcador en las coordenadas proporcionadas
      new google.maps.Marker({
        position: coordinates,
        map: newMap,
      });

      setMap(newMap);
    };

    loadMap();
  }, [coordinates]);

  return <div style={{ height: "600px" }} ref={mapRef} />;
}

export default MapPrestador;

