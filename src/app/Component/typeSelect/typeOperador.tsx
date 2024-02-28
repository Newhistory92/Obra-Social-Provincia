"use client"

import React, { useState, useEffect } from 'react';
import { Typography, Input, Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import operadoresData from '../../../operador.json';
import Link from 'next/link';

const TypeOperador = () => {

  const [numeroOperador, setNumeroOperador] = useState('');
  const [selectedUser, setSelectedUser] = useState<{ name: string; operador: string; } | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Inicializar errorMessage como una cadena vacía

  useEffect(() => {
    const verifyUser = async () => {
        try {
          const response = await fetch('/api/handleroperador', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          });
          const data = await response.json();
          console.log(data)
          if (response.ok) {
            if (data.status === 200) {
              // El usuario está en la tabla Operador, redirigir al dashboard de Operador
              window.location.href = '/page/dashboard/operador';
              console.log("redirige al /dashboard/operador")
            } else if (data.status === 401) {
              // El usuario no está autenticado, redirigir al inicio de sesión
              window.location.href = '/page/signin';
            }else if (data.status === 402) {
              setLoading(false);
            }
          } else {
            setLoading(false);
          }
        } catch (error) {
          console.error('Error al verificar el usuario:', error);
          setLoading(false);
        }
      };
  
      verifyUser();
    }, []);
  

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = event.target.value.replace(/\D/g, '').slice(0, 8);
    setNumeroOperador(sanitizedValue);
    const user = operadoresData.find(operador => operador.operador === sanitizedValue);
    setSelectedUser(user || null);
    setErrorMessage(null)
  };

  const handleConfirm = async () => {
    try {
        setLoading(true);
  
        if (!selectedUser) {
          toast.error('Seleccione un operador antes de confirmar');
          return;
        }
  
        const response = await fetch('/api/handleroperador', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ numeroOperador: selectedUser.operador }),
        });
  
        const responseData = await response.json();
        console.log(responseData)
  
         if (responseData.status === 200) {
          window.location.href = '/page/dashboard/operador';
          toast.success(responseData.message);
        } else if (responseData.status === 400) {
          setErrorMessage(responseData.message); 
          toast.error(responseData.message);
         }
         
      } catch (error) {
        console.error('Error al confirmar el operador:', error);
        toast.error('Ocurrió un error al confirmar el operador');
      } finally {
        setLoading(false);
      }
    };

  const handlePrev = () => {
    setErrorMessage(null); // Limpiar el mensaje de error
  };

  if (loading) {
    return <div>Cargando...</div>;
  }


  return (
    <div className="w-80 max-w-screen-lg mx-auto p-8 bg-white rounded-lg shadow-md">
      <Typography variant="h6">Tipo de usuario: Operador</Typography>
      <label>Ingrese Número de Operador:</label>
      <Input
        type="text"
        value={numeroOperador}
        onChange={handleInputChange}
        className="mt-2 border-t border-blue-gray-200 focus:border-t focus:border-gray-900"
      />

      {selectedUser && (
        <div className="mt-4">
          <Typography>Nombre: {selectedUser.name}</Typography>
          {errorMessage && (
            <div>
              <Link href="/">
                <Button
                  variant="contained"
                  onClick={handlePrev}
                  className="mt-2"
                >
                  Inicio
                </Button>
              </Link>
            </div>
          )}
          {!errorMessage && (
              <Button
              variant="contained"
              onClick={handleConfirm}
              className="mt-2"
              disabled={loading} // Deshabilitar el botón si está en proceso de carga
              >
              Confirmar
            </Button>
          )}
          <ToastContainer />

        </div>
      )}

    </div>
  );
};

export default TypeOperador;

