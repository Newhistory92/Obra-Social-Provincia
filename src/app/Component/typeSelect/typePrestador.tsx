"use client"
import React, { useState, useEffect } from 'react';
import { Typography, Input, Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import prestadoresData from '../../../prestor.json';
import Link from 'next/link';


const TypePrestador = () => {
  const [matricula, setMatricula] = useState('');
  const [selectedPrestador, setSelectedPrestador] = useState<{ id: string; name: string; especialidad: string; matricula: string; } | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await fetch('/api/handlerprestador', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        const data = await response.json();
        console.log(data)
        if (response.ok) {
          if (data.status === 200) {
            // El usuario está en la tabla Afiliado, redirigir al dashboard de Afiliado
            window.location.href = '/page/dashboard/prestador';
            console.log("redirige al /dashboard/prestador")
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
    setMatricula(sanitizedValue);
    const prestador = prestadoresData.find(prestador => prestador.matricula === sanitizedValue);
    setSelectedPrestador(prestador || null);
    setErrorMessage(null);
  };

  const handleConfirm = async () => {
    try {
      setLoading(true);

      if (!selectedPrestador) {
        toast.error('Seleccione un prestador antes de confirmar');
        return;
      }

      const response = await fetch('/api/handlerprestador', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ matricula: selectedPrestador.matricula, especialidad: selectedPrestador.especialidad }),
      });

      const responseData = await response.json();

      if (responseData.status === 200) {
        window.location.href = '/page/dashboard/prestador';
        toast.success(responseData.message);
      } else if (responseData.status === 400) {
        setErrorMessage(responseData.status);
        toast.error(responseData.message);
        console.log(responseData.message)
      }

    } catch (error) {
      console.error('Error al confirmar el prestador:', error);
      toast.error('Ocurrió un error al confirmar el prestador');
    } finally {
      setLoading(false);
    }
  };
  const handlePrev = () => {
    setErrorMessage(null);
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="w-80 max-w-screen-lg mx-auto p-8 bg-white rounded-lg shadow-md">
      <Typography variant="h6">Tipo de usuario: Prestador</Typography>
      <label>Ingrese Nº de Matrícula:</label>
      <Input
        type="text"
        value={matricula}
        onChange={handleInputChange}
        className="mt-2 border-t border-blue-gray-200 focus:border-t focus:border-gray-900"
      />

      {selectedPrestador && (
        <div className="mt-4">
          <Typography>Nombre: {selectedPrestador.name}</Typography>
          <Typography>Especialidad: {selectedPrestador.especialidad}</Typography>
          <Link href="/">
          {errorMessage === 400 && (
            <Button
              variant="contained"
              onClick={handlePrev}
              className="mt-2"
              
            >
              Inicio
            </Button>
          )}</Link>
          {!errorMessage && (
            <Button
              variant="contained"
              onClick={handleConfirm}
              className="mt-2"
              disabled={loading}
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

export default TypePrestador;

