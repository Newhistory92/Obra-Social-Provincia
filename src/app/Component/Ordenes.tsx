import React, { useState, useEffect } from 'react';
import jsonData from '../../OrdenesPrestador.json';

interface OrdenData {
    numeroOrden: number;
    fechaUso: string;
    nombreMedico: string;
    apellidoMedico: string;
    especialidad: string;
}

// Componente Orden
const Orden: React.FC<OrdenData> = ({ numeroOrden, fechaUso, nombreMedico, apellidoMedico, especialidad }) => (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{nombreMedico} {apellidoMedico}</h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Número de Orden: {numeroOrden}</p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Fecha de Uso: {fechaUso}</p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Especialidad: {especialidad}</p>
    </div>
);

// Componente Ordenes
const Ordenes = () => {
    const [ordenes, setOrdenes] = useState<OrdenData[]>([]);

    useEffect(() => {
        // Simulación de la solicitud a la base de datos para obtener las órdenes
        // const fetchOrdenes = async () => {
        //   try {
        //     // Realizar la solicitud a la API para obtener las órdenes
        //     const response = await fetch('/api/handlerprestador', {
        //         method: 'GET',
        //         headers: {
        //           'Content-Type': 'application/json',
        //         }
        //       })
        //       const data = await response.json();
        //       console.log(data)
        //     setOrdenes(data); // Establecer las órdenes obtenidas del servidor
        //   } catch (error) {
        //     console.error('Error fetching ordenes:', error);
        //   }
        // };
    
        // fetchOrdenes(); // Llamar a la función para obtener las órdenes al cargar el componente
    
        // Usa los datos del archivo JSON en lugar de la solicitud a la API
        setOrdenes(jsonData.slice(0, 5)); // Limitar a las primeras 5 órdenes
    }, []);

    return (
        <div id="indicators-carousel" className="relative w-full" data-carousel="static">
            {/* Carrusel */}
            <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                {/* Mapeo de las órdenes para crear las tarjetas */}
                {ordenes.map((orden, index) => (
                    <div key={index} className={`hidden duration-700 ease-in-out ${index === 0 ? 'data-carousel-item="active"' : ''}`} data-carousel-item>
                        <Orden
                            numeroOrden={orden.numeroOrden}
                            fechaUso={orden.fechaUso}
                            nombreMedico={orden.nombreMedico}
                            apellidoMedico={orden.apellidoMedico}
                            especialidad={orden.especialidad}
                        />
                    </div>
                ))}
            </div>
            
            {/* Controles del carrusel */}
            <div className="absolute z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse bottom-5 left-1/2">
                {ordenes.map((orden, index) => (
                    <button key={index} type="button" className="w-3 h-3 rounded-full" aria-current={index === 0} aria-label={`Slide ${index + 1}`} data-carousel-slide-to={index}></button>
                ))}
            </div>

            {/* Botones de control del carrusel */}
            <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                {/* Botón de anterior */}
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
                    </svg>
                    <span className="sr-only">Anterior</span>
                </span>
            </button>
            <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                {/* Botón de siguiente */}
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                    </svg>
                    <span className="sr-only">Siguiente</span>
                </span>
            </button>
        </div>
    );
};

export default Ordenes;




// {/* <div id="indicators-carousel" className="relative w-full" data-carousel="static">
//       {/* Carrusel */}
//       <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
//         {/* Mapeo de las órdenes para crear las tarjetas */}
//         {ordenes.map((orden, index) => (
//           <div key={index} className={`hidden duration-700 ease-in-out ${index === 0 ? 'data-carousel-item="active"' : ''}`} data-carousel-item>
//           <Orden
//               numeroOrden={orden.numeroOrden}
//               fechaUso={orden.fechaUso}
//               nombreMedico={orden.nombreMedico}
//               apellidoMedico={orden.apellidoMedico}
//               especialidad={orden.especialidad}
//             />
//           </div>
//         ))}
//       </div>
      
//       {/* Controles del carrusel */}
//       <div className="absolute z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse bottom-5 left-1/2">
//         {ordenes.map((orden, index) => (
//           <button key={index} type="button" className="w-3 h-3 rounded-full" aria-current={index === 0} aria-label={`Slide ${index + 1}`} data-carousel-slide-to={index}></button>
//         ))}
//       </div>

//       {/* Botones de control del carrusel */}
//       <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
//         {/* Botón de anterior */}
//         <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
//           <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
//             <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
//           </svg>
//           <span className="sr-only">Anterior</span>
//         </span>
//       </button>
//       <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
//         {/* Botón de siguiente */}
//         <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
//           <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
//             <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
//           </svg>
//           <span className="sr-only">Siguiente</span>
//         </span>
//       </button>
//     </div>
//   ); */}