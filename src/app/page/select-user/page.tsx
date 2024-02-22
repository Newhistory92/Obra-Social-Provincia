"use client"

import React, { useState } from 'react';
import { Typography, Input, Button } from '@mui/material';
import getAfiliado from "../../action/action"

const SelectUser = () => {
  const [selectedType, setSelectedType] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  const handleTypeChange = (type) => {
    setSelectedType(type);
    setInputValue('');
    setSelectedUser(null);

    // Llamar a getAfiliado si el tipo seleccionado es 'AFILIADOS'
    if (type === 'AFILIADOS') {
      getAfiliado(); // Asegúrate de pasar los parámetros necesarios si la función los requiere
    }
  };

  const handleInputChange = (value) => {
    // Limitar el input a solo números y una longitud máxima
    let maxLength;
    switch (selectedType) {
      case 'AFILIADOS':
        maxLength = 8;
        break;
      case 'OPERADORES':
      case 'PRESTADORES':
        maxLength = 5;
        break;
      default:
        maxLength = 8; // Valor por defecto para otros tipos
        break;
    }
    const sanitizedValue = value.replace(/\D/g, '').slice(0, maxLength);
    setInputValue(sanitizedValue);

    // No necesitas buscar el usuario aquí, ya que se hará en getAfiliado
  }; const handleConfirmClick = async () => {
    // Aquí verificar si hay algún error
    if (isError) {
      return; // Bloquear la función si hay un error
    }

    // Si no hay error, continuar con la lógica de confirmación
    try {
      // Lógica de confirmación aquí...
    } catch (error) {
      console.error("Error en la función handleConfirmClick:", error);
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
             <Typography>Nombre: {selectedUser ? (selectedType === 'OPERADORES' ? selectedUser.name : selectedUser.name) : 'Nombre no encontrado'}</Typography>
            <Typography>{selectedType === 'PRESTADORES' ? 'Especialidad' : (selectedType === 'OPERADORES' ? null : 'Dependencia')} {selectedUser ? (selectedType === 'PRESTADORES' ? selectedUser.especialidad : (selectedType === 'OPERADORES' ? null : selectedUser.dependencia)) : 'Información no disponible'}</Typography>


            <Button
        className="mt-2"
        fullWidth
        onClick={handleConfirmClick}
        disabled={!inputValue || !selectedUser || isError}
      >
        Confirmar
      </Button>
    {!inputValue || !selectedUser ? null : (
      <Button
        className="mt-2"
        fullWidth
        onClick={() => {
          setInputValue('');
          setSelectedUser(null);
        }}
      >
        Volver
      </Button>
              )}
            </div>
          )}
        </div>
      )}
     
    </div>
  );
};

export default SelectUser;


// import React, { useState } from 'react';
// import { Typography, Input, Button } from '@mui/material';
// import data from "../../../afiliados.json";
// import dataprest from "../../../prestor.json";
// import dataopera from "../../../operador.json";

// const SelectUser = () => {
//   const [selectedType, setSelectedType] = useState('');
//   const [inputValue, setInputValue] = useState('');
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [redirect, setRedirect] = useState(false);

//   const handleTypeChange = (type) => {
//     setSelectedType(type);
//     setInputValue('');
//     setSelectedUser(null);
//   };

//   const handleInputChange = (value) => {
//     // Limitar el input a solo números y una longitud máxima
//     let maxLength;
//     switch (selectedType) {
//       case 'AFILIADOS':
//         maxLength = 8;
//         break;
//       case 'OPERADORES':
//       case 'PRESTADORES':
//         maxLength = 5;
//         break;
//       default:
//         maxLength = 8; // Valor por defecto para otros tipos
//         break;
//     }
//     const sanitizedValue = value.replace(/\D/g, '').slice(0, maxLength);
//     setInputValue(sanitizedValue);

//     let user;
//     switch (selectedType) {
//       case 'AFILIADOS':
//         user = data.find(afiliado => afiliado.dni === sanitizedValue);
//         break;
//       case 'OPERADORES':
//         user = dataopera.find(operador => operador.operador === sanitizedValue);
//         break;
//       case 'PRESTADORES':
//         user = dataprest.find(prestador => prestador.matricula === sanitizedValue);
//         break;
//       default:
//         break;
//     }
//     setSelectedUser(user);
//   };

//   const handleConfirmClick = async () => {
//     try {
//       let additionalFields = {};

//       switch (selectedType) {
//         case 'AFILIADOS':
//           additionalFields = { dni: inputValue };
//           break;
//         case 'OPERADORES':
//           additionalFields = { numeroOperario: inputValue };
//           break;
//         case 'PRESTADORES':
//           additionalFields = { 
//             numeroMatricula: selectedUser.matricula,
//             especialidad: selectedUser.especialidad 
//           };
//           break;
//         default:
//           break;
//       }

//       if (Object.keys(additionalFields).length === 0) {
//         console.error('Tipo de usuario no válido');
//         return;
//       }
      
//       const getApiRoute = (selectedType) => {
//         switch (selectedType) {
//           case 'AFILIADOS':
//             return '/api/handlerafiliado';
//           case 'OPERADORES':
//             return '/api/handleroperario';
//           case 'PRESTADORES':
//             return '/api/handlerprestador';
//           default:
//             throw new Error('Tipo de usuario no válido');
//         }
//       };

//       const userWithAdditionalFields = { ...selectedUser, ...additionalFields };

//       const response = await fetch(getApiRoute(selectedType), {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(userWithAdditionalFields), // Envía los datos del usuario seleccionado con los campos adicionales
//       });

//       if (response.ok) {
//         // Si la solicitud fue exitosa, redirige al usuario a la página de dashboard correspondiente
//         switch (selectedType) {
//           case 'AFILIADOS':
//             window.location.href = '/page/dashboard/afiliado';
//             break;
//           case 'OPERADORES':
//             window.location.href = '/page/dashboard/operador';
//             break;
//           case 'PRESTADORES':
//             window.location.href = '/page/dashboard/prestador';
//             break;
//           default:
//             break;
//         }
//       } else {
//         console.error('Error al enviar datos a la API');
//       }
//     } catch (error) {
//       console.error('Error de red:', error);
//     }
//   };

//   return (
//     <div className="w-80 max-w-screen-lg mx-auto p-8 bg-white rounded-lg shadow-md">
//       <Typography className="text-lg item font-normal text-center">
//         Tipo de usuario
//       </Typography>
//       <select
//         className="mb-3 font-medium mt-5 border-t border-blue-gray-200 focus:border-t focus:border-gray-900"
//         onChange={(e) => handleTypeChange(e.target.value)}
//       >
//         <option value="">Seleccionar...</option>
//         <option value="AFILIADOS">Afiliado</option>
//         <option value="OPERADORES">Operador</option>
//         <option value="PRESTADORES">Prestador</option>
//       </select>

//       {selectedType && (
//         <div>
//           <label>
//             {`Ingrese ${
//               selectedType === "AFILIADOS"
//                 ? "DNI"
//                 : selectedType === "OPERADORES"
//                 ? "Número de operador"
//                 : "Número de matrícula"
//             }:`}
//           </label>
//           <Input
//             type="text"
//             value={inputValue}
//             onChange={(e) => handleInputChange(e.target.value)}
//             className="mt-2 border-t border-blue-gray-200 focus:border-t focus:border-gray-900"
//           />

//           {selectedUser && (
//             <div className="mt-4">
//              <Typography>Nombre: {selectedUser ? (selectedType === 'OPERADORES' ? selectedUser.name : selectedUser.name) : 'Nombre no encontrado'}</Typography>
//             <Typography>{selectedType === 'PRESTADORES' ? 'Especialidad' : (selectedType === 'OPERADORES' ? null : 'Dependencia')} {selectedUser ? (selectedType === 'PRESTADORES' ? selectedUser.especialidad : (selectedType === 'OPERADORES' ? null : selectedUser.dependencia)) : 'Información no disponible'}</Typography>


//               <Button
//                 className="mt-2"
//                 fullWidth
//                 onClick={handleConfirmClick}
//                 disabled={!inputValue || !selectedUser}
//               >
//                 Confirmar
//               </Button>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SelectUser;


