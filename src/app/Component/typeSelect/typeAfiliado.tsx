"use client"
import React, { useState } from 'react';
import { Typography, Input, Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import afiliadosData from '../../../afiliados.json';

const TypeAfiliado = () => {
  const [dni, setDni] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null); // Nuevo estado para manejar el mensaje de error

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = event.target.value.replace(/\D/g, '').slice(0, 8);
    setDni(sanitizedValue);
    const user = afiliadosData.find(afiliado => afiliado.dni === sanitizedValue);
    setSelectedUser(user);
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

      if (response.ok) {
        toast.success('Afiliado confirmado correctamente');
        // Redireccionar al usuario al dashboard de afiliado
        // window.location.href = '/page/dashboard/afiliado';
      } else {
        if (response.status === 400) {
          setErrorMessage(responseData.message); // Establecer el mensaje de error
        } else {
          toast.error('Ocurrió un error al confirmar el afiliado');
        }
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
          {errorMessage ? (
            <Button
              variant="contained"
              onClick={handlePrev}
              className="mt-2"
            >
              Prev
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleConfirm}
              className="mt-2"
              disabled={loading} // Deshabilitar el botón si está en proceso de carga
            >
              Confirmar
            </Button>
          )}
          {errorMessage && <Typography className="text-red-500">{errorMessage}</Typography>} {/* Mostrar el mensaje de error si existe */}
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default TypeAfiliado;







// import React, { useState } from 'react';
// import { Typography, Input, Button } from '@mui/material';
// import { ToastContainer, toast } from 'react-toastify';
// import afiliadosData from '../../../afiliados.json';

// const TypeAfiliado = () => {
//   const [dni, setDni] = useState('');
//   const [selectedAfiliado, setSelectedAfiliado] = useState(null);
//   const [loading, setLoading] = useState(false); // Agregado para controlar la carga

//   const handleInputChange = (event) => {
//     setDni(event.target.value);
//     setSelectedAfiliado(null); // Limpiar afiliado seleccionado cuando se cambia el input
//   };
//   let user = afiliadosData.find(afiliado => afiliado.dni === dni);
//   setSelectedAfiliado(user)
//   const handleConfirm = async () => {
//     try {
//       setLoading(true); // Establecer carga a true al iniciar la confirmación

//       if (!selectedAfiliado) {
//         toast.error('Seleccione un afiliado antes de confirmar');
//         return;
//       }

//       // Simulando la petición POST al backend
//       const response = await fetch('/api/handlerafiliado', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ dni: selectedAfiliado.dni }),
//       });
//         console.log("esto se manda al bakend",dni)
//       if (response.ok) {
//         // Si la solicitud fue exitosa, mostrar un mensaje de éxito
//         toast.success('Afiliado confirmado correctamente');
//         // Redireccionar al usuario al dashboard de afiliado
//         // window.location.href = '/page/dashboard/afiliado';
//       } else {
//         if (response.status === 400) {
//           // Si la respuesta es un error 400, mostrar un mensaje de error y bloquear el botón
//           toast.error('Error: El afiliado ya está confirmado');
//           setLoading(true);
//         } else {
//           // Si hubo otro tipo de error en la respuesta, mostrar un mensaje de error general
//           toast.error('Ocurrió un error al confirmar el afiliado');
//         }
//       }
//     } catch (error) {
//       console.error('Error al confirmar el afiliado:', error);
//       toast.error('Ocurrió un error al confirmar el afiliado');
//     } finally {
//       setLoading(false); // Establecer carga a false después de la confirmación
//     }
//   };

//   // Mapeo de los afiliados fuera del render
//   const filteredAfiliados = afiliadosData.filter(afiliado => afiliado.dni.includes(dni));

//   return (
//     <div className="w-80 max-w-screen-lg mx-auto p-8 bg-white rounded-lg shadow-md">
//       <Typography variant="h6">Ingrese Nº de DNI:</Typography>
//       <Input
//         type="text"
//         value={dni}
//         onChange={handleInputChange}
//         className="mt-2 border-t border-blue-gray-200 focus:border-t focus:border-gray-900"
//       />
//       {filteredAfiliados.map((afiliado) => (
//         <div key={afiliado.id} className="mt-4">
//           <Typography className="text-lg item font-normal text-center">
//             Nombre: {selectedUser.name}
//           </Typography>
//           <Typography className="text-lg item font-normal text-center">
//             Dependencia: {selectedUser.dependencia}
//           </Typography>
//           <Button
//             variant="contained"
//             onClick={handleConfirm}
//             className="mt-2"
//             disabled={loading} // Deshabilitar el botón si está cargando
//           >
//             Confirmar
//           </Button>
//         </div>
//       ))}
//       <ToastContainer />
//     </div>
//   );
// };

// export default TypeAfiliado;
