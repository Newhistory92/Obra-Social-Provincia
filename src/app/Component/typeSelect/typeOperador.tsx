"use client"

import React, { useState, useEffect } from 'react';
import { Typography, Input, Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import operadoresData from '../../../operador.json';
import Link from 'next/link';
import {useAppSelector,useAppDispatch} from "../../hooks/StoreHook"
import { setCurrentUser,  setLoading, setErrorMessage } from "../../reducers/userSlice"
const TypeOperador = () => {

  const [numeroOperador, setNumeroOperador] = useState('');
  const dispatch = useAppDispatch();
  const { currentUser, loading, errorMessage } = useAppSelector((state) => state.user); // Asegúrate de que 'user' sea el nombre correcto del slice
console.log(currentUser, loading, errorMessage)

  useEffect(() => {
    dispatch(setLoading(true)); // Establecer carga en true al montar el componente

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
              dispatch(setCurrentUser(data.user));
              window.location.href = '/page/dashboard';
              console.log("redirige al /dashboard/operador")
            } else if (data.status === 401) {
              // El usuario no está autenticado, redirigir al inicio de sesión
              window.location.href = '/page/signin';
            }else if (data.status === 402) {
              dispatch(setLoading(false));
            }
          } else {
            dispatch(setLoading(false));
          }
        } catch (error) {
          console.error('Error al verificar el usuario:', error);
          dispatch(setLoading(false));
        }
      };
  
      verifyUser();
    }, []);
  

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = event.target.value.replace(/\D/g, '').slice(0, 8);
    setNumeroOperador(sanitizedValue);
    const user = operadoresData.find(operador => operador.operador === sanitizedValue);
    dispatch(setCurrentUser(user)); // Establecer el usuario seleccionado en el estado global
    dispatch(setErrorMessage(null)); // Limpiar el mensaje de error
  };

  const handleConfirm = async () => {
    try {
        setLoading(true);
  
        if (!currentUser) {
          toast.error('Seleccione un operador antes de confirmar');
          return;
        }
  
        const response = await fetch('/api/handleroperador', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ numeroOperador: currentUser.operador }),
        });
  
        const responseData = await response.json();
        console.log(responseData)
  
         if (responseData.status === 200) {
          window.location.href = '/page/dashboard';
          toast.success(responseData.message);
        } else if (responseData.status === 400) {
          dispatch(setErrorMessage(responseData.status));
          toast.error(responseData.message);
         }
         
      } catch (error) {
        console.error('Error al confirmar el operador:', error);
        toast.error('Ocurrió un error al confirmar el operador');
      } finally {
        dispatch(setLoading(false));
      }
    };

  const handlePrev = () => {
    dispatch(setErrorMessage(null));
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

      {currentUser && (
        <div className="mt-4">
          <Typography>Nombre: {currentUser.name}</Typography>
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

