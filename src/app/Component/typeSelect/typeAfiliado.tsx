"use client"
import React, { useState, useEffect } from 'react';
import { Typography, Input, Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import afiliadosData from '../../../afiliados.json';


const TypeAfiliado = () => {

  const [dni, setDni] = useState('');
  const [selectedUser, setSelectedUser] = useState<{ id: string; name: string; dependencia: string; dni: string; } | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null); // Inicializar errorMessage como una cadena vacía

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await fetch('/api/handlerafiliado', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        const data = await response.json();
        if (response.ok) {
          if (data.status === 200) {
            window.location.href = '/page/dashboard/afiliado';
          } else if (data.status === 401) {
            window.location.href = '/page/signin';
          } else if (data.status === 402) {
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
    setDni(sanitizedValue);
    const user = afiliadosData.find(afiliado => afiliado.dni === sanitizedValue);
    setSelectedUser(user || null);
    setErrorMessage(null)
  };

  const handleConfirm = async () => {
    try {
      setLoading(true);

      if (!selectedUser) {
        toast.error('Seleccione un afiliado antes de confirmar');
        return;
      }

      const response = await fetch('/api/handlerafiliado', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dni: selectedUser.dni }),
      });

      const responseData = await response.json();
      console.log(responseData)

       if ( responseData.status === 200){
        window.location.href = '/page/dashboard/afiliado';
       toast.success(responseData.message);
      }
       else{ (responseData.status === 400)
        setErrorMessage(responseData.status); 
        toast.error(responseData.message);
       }
       
    } catch (error) {
      console.error('Error al confirmar el afiliado:', error);
      toast.error('Ocurrió un error al confirmar el afiliado');
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
      <Typography variant="h6">Tipo de usuario: Afiliado</Typography>
      <label>Ingrese Nº de DNI:</label>
      <Input
        type="text"
        value={dni}
        onChange={handleInputChange}
        className="mt-2 border-t border-blue-gray-200 focus:border-t focus:border-gray-900"
      />

      {selectedUser && (
        <div className="mt-4">
          <Typography>Nombre: {selectedUser.name}</Typography>
          <Typography>Dependencia: {selectedUser.dependencia}</Typography>
          {errorMessage === 400 && (
        <Button
          variant="contained"
           onClick={handlePrev}
           className="mt-2"
            >
           Inicio
        </Button>
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
        
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default TypeAfiliado;