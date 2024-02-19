import React, { useState, useEffect } from 'react';
import data from "../afiliados.json"

const AfiliadoFetcher = ({ onFetch }) => {
  const [error, setError] = useState(null);
  const [afiliados, setAfiliados] = useState([]);

  useEffect(() => {
    const fetchAfiliados = async () => {
      try {
        const response = await fetch('/datos/afiliados.json');
        if (!response.ok) {
          throw new Error('No se pudo cargar el archivo de afiliados');
        }
        const data = await response.json();
        setAfiliados(data);
        onFetch(data); // Pasar los datos al componente padre
      } catch (error) {
        setError(error.message);
      }
    };

    fetchAfiliados();
  }, [onFetch]);

  return null; // Este componente no renderiza nada
};

export default AfiliadoFetcher;

