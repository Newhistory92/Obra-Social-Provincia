"use client"
import React, { useState } from 'react';
import { Typography, Input, Button } from '@mui/material';
import data from "../../../afiliados.json";
import Redirector from '../../api/RedirectorUser';

const SelectUser = () => {
  const [selectedType, setSelectedType] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const handleTypeChange = (type) => {
    setSelectedType(type);
    setInputValue('');
    setSelectedUser(null);
  };

  const handleInputChange = (value) => {
    // Limitar el input a solo números y una longitud máxima
    const maxLength = selectedType === 'AFILIADOS' ? 8 : 5;
    const sanitizedValue = value.replace(/\D/g, '').slice(0, maxLength);
    setInputValue(sanitizedValue);

    const user = data.find(afiliado => afiliado.dni === sanitizedValue);
    setSelectedUser(user);
  };



  const handleConfirmClick = () => {
    switch (selectedType) {
      case 'AFILIADOS':
        window.location.href = '/page/dashboard/afiliado';
        break;
      case 'OPERADORES':
        window.location.href = '/page/dashboard/operador';
        break;
      case 'PRESTADORES':
        window.location.href = '/page/dashboard/prestador';
        break;
      default:
        break;
    }
  };
  return (
    <div className="w-80 max-w-screen-lg mx-auto p-8 bg-white rounded-lg shadow-md">
      <Typography className="text-lg item font-normal text-center">
        Tipo de usuario
      </Typography>
      <select
        className="mb-3 font-medium mt-5 border-t border-blue-gray-200 focus:border-t focus:border-gray-900"
        onChange={(e) => handleTypeChange(e.target.value)}
      >
        <option value="">Seleccionar...</option>
        <option value="AFILIADOS">Afiliado</option>
        <option value="OPERADORES">Operador</option>
        <option value="PRESTADORES">Prestador</option>
      </select>

      {selectedType && (
        <div>
          <label>
            {`Ingrese ${
              selectedType === "AFILIADOS"
                ? "DNI"
                : selectedType === "OPERADORES"
                ? "Número de operador"
                : "Número de matrícula"
            }:`}
          </label>
          <Input
            type="text"
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            className="mt-2 border-t border-blue-gray-200 focus:border-t focus:border-gray-900"
          />

          {selectedUser && (
            <div className="mt-4">
              <Typography>Nombre: {selectedUser.name}</Typography>
              <Typography>Dependencia: {selectedUser.dependencia}</Typography>
              <Button
                className="mt-2"
                fullWidth
                onClick={handleConfirmClick}
                disabled={!inputValue}
              >
                Confirmar
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SelectUser;
