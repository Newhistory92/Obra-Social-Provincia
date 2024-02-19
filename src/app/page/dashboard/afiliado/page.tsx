"use client"
import React, { useState } from 'react';
import Navbar from '../../../Component/navbar'; 
import { UserButton, useUser } from '@clerk/nextjs';


const DashboardAfiliado: React.FC = () => {
  const [showChatBot, setShowChatBot] = useState(false);
  const [showPrestadorTable, setShowPrestadorTable] = useState(false);

 const user = useUser()
 console.log(user)



  const openChatBot = () => {
    // Lógica para abrir el chat-bot (a implementar en el futuro)
    setShowChatBot(true);
    setShowPrestadorTable(false);
  };

  const showTable = () => {
    setShowPrestadorTable(true);
    setShowChatBot(false);
  };
  
  return (
    <div className="hidden bg-white border-r md:flex md:flex-shrink-0 mt-40 my-4">
      <Navbar />
      {/* Menú lateral */}
      <div className="hidden bg-white border-r md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex items-center justify-center h-16 bg-gray-200 p-4">
          <UserButton />
            <h1 className= "ml-5">Bienvenido Nombre del Usuario</h1>
          </div>
            
          
          <button
            className="flex items-center py-2 px-4 text-gray-600 hover:bg-gray-100"
            onClick={openChatBot}
          >
            Contactanos
          </button>
          <button
            className="flex items-center py-2 px-4 text-gray-600 hover:bg-gray-100"
            onClick={showTable}
          >
            Califica a tu prestador
          </button>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        <div className="p-8">
          <h1 className="text-2xl font-semibold">Dashboard Afiliado</h1>

          {/* Contenido dinámico */}
          {showChatBot && <p>Chat-bot se mostrará aquí</p>}
          {showPrestadorTable && <p>Tabla de prestadores se mostrará aquí</p>}
        </div>
      </div>
    </div>
  );
};

export default DashboardAfiliado;
