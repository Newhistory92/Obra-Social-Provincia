import React, { useState, useEffect } from 'react';
import jsonData from '../../OrdenesPrestador.json';
import { CarouselDefault } from './CarouselCard';

interface OrdenData {
    numeroOrden: number;
    fechaUso: string;
    nombreMedico: string;
    apellidoMedico: string;
    especialidad: string;
    nombreAfiliado:string;
    numeroPrestador:number;
    tipoBono:string
}

const Ordenes = () => {
    const [ordenes, setOrdenes] = useState<OrdenData[]>([]);

    useEffect(() => {
        // Simulación de la solicitud a la base de datos para obtener las órdenes
        setOrdenes(jsonData.slice(0, 5)); // Limitar a las primeras 5 órdenes
    }, []);

    return (
        <div  >
            <CarouselDefault ordenes={ordenes}
             />
        </div>
    );
};


export default Ordenes;

