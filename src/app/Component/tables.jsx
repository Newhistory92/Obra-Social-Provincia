import { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, Typography, Avatar, Chip } from "@material-tailwind/react";
import { getAllUsers } from "@/app/conec_bd/datos";

export function Tables() {
  const [userType, setUserType] = useState('Operador'); // Inicializar con 'Operador' por defecto
  const [userData, setUserData] = useState([]); // Estado para almacenar los datos de usuarios

  // Obtener los datos de usuarios al cargar el componente
  useEffect(() => {
    obtenerUsuarios();
  }, []);

  // Obtener los datos de usuarios según el tipo seleccionado
  async function obtenerUsuarios() {
    try {
      const usuarios = await getAllUsers(userType); // Llamar a la función con el tipo de usuario actual
      setUserData(usuarios);
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
    }
  }

  // Función para manejar el cambio de tipo de usuario
  function handleUserTypeChange(e) {
    setUserType(e.target.value); // Actualizar el estado con el nuevo tipo de usuario seleccionado
  }

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <div className="flex items-center mb-4">
        <Typography variant="body" className="mr-4">
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
            Usuarios Table
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Nombre", "Email", "Teléfono", "DNI / Matrícula", ""].map((el) => (
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
              {userData.map(({ name, email, imageUrl, phone, dni, matricula }, key) => {
                const className = `py-3 px-5 ${
                  key === userData.length - 1 ? "" : "border-b border-blue-gray-50"
                }`;

                return (
                  <tr key={name}>
                    <td className={className}>
                      <div className="flex items-center gap-4">
                        <Avatar src={imageUrl} alt={name} size="sm" variant="rounded" />
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
                        {dni || matricula}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography
                        as="a"
                        href="#"
                        className="text-xs font-semibold text-blue-gray-600"
                      >
                        Editar
                      </Typography>
                    </td>
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