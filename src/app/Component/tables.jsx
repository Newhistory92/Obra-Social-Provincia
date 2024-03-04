import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, Typography, Avatar } from "@material-tailwind/react";
import ActionMenu from './Actiomenu';

export function Tables() {
  const [userType, setUserType] = useState('Operador');
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [userType]);

  async function fetchData() {
    try {
      if (!userType) {
        throw new Error('Parámetro userType no proporcionado en el frontend');
      }
      
      let url;
      switch (userType) {
        case 'Afiliado':
          url = `/api/datos/afiliado`;
          break;
        case 'Operador':
          url = `/api/datos/operador`;
          break;
        case 'Prestador':
          url = `/api/datos/prestador`;
          break;
        default:
          throw new Error('Tipo de usuario no válido');
      }

      const response = await fetch(url, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          }
      });
      const responseData = await response.json();
      if (Array.isArray(responseData)) {
        setUserData(responseData);
      } else {
        console.error('La respuesta de la API no es un arreglo:', responseData);
      }
      
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
    }
  }

  function handleUserTypeChange(e) {
    setUserType(e.target.value);
  }

  // console.log("userData en el estado:", userData)

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <div className="flex items-center mb-4">
        <Typography variant="h4" className="mr-4">
          Mostrar usuarios tipo:
        </Typography>
        <select
          value={userType}
          onChange={handleUserTypeChange}
          className="border border-gray-300 rounded-md py-1 px-2"
        >
          <option value="Afiliado">Afiliado</option>
          <option value="Operador">Operador</option>
          <option value="Prestador">Prestador</option>
        </select>
      </div>
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Usuarios
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Nombre", "Teléfono", "Operador / Matrícula / Dni", "Rol", ""].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {userData.map(({ name, email, imageUrl, phone, dni, matricula, numeroOperador,  roles}, key) => {
                const className = `py-3 px-5 ${
                  key === userData.length - 1 ? "" : "border-b border-blue-gray-50"
                }`;

                return (
                  <tr key={name}>
                    <td className={className}>
                      <div className="flex items-center gap-4">
                        <Avatar src={imageUrl} alt={name} size="sm" variant="rounded"
                         className="rounded-full shadow-sm"
                         style={{ borderRadius: "0.375rem" }}
                        />
                        <div>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-semibold"
                          >
                            {name}
                          </Typography>
                          <Typography className="text-xs font-normal text-blue-gray-500">
                            {email}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {phone}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {userType === 'Afiliado' ? dni : userType === 'Prestador' ? matricula : numeroOperador}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className={`text-xs font-semibold text-white px-2 py-0.5 rounded-full bg-${roles === 'Administrador' ? 'green' : roles === 'Usuario' ? 'blue' : 'gray'}-500`}>
                        {roles}
                      </Typography>
                    </td>
                    {userType === 'Operador' && ( // Solo muestra el ActionMenu si el userType es Operador
                      <td className={className}>
                        <ActionMenu 
                        userId={id} // Pasar el ID del usuario al ActionMenu
                        onUpdateRole={(newRole) => console.log(`Se actualizó el rol a ${newRole} para el usuario con ID ${id}`)} 
                    />
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default Tables;