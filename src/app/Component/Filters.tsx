import React, { useState } from "react";

interface FiltersProps {
  filterByName: (value: string) => void;
  filterByApellido: (value: string) => void;
  filterByEspecialidad: (value: string) => void;
}

const Filters: React.FC<FiltersProps> = ({
  filterByName,
  filterByApellido,
  filterByEspecialidad,
}) => {
  const [name, setName] = useState("");
  const [apellido, setApellido] = useState("");
  const [especialidad, setEspecialidad] = useState("");

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    filterByName(event.target.value);
  };

  const handleApellidoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApellido(event.target.value);
    filterByApellido(event.target.value);
  };

  const handleEspecialidadChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEspecialidad(event.target.value);
    filterByEspecialidad(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Filtrar por nombre..."
        value={name}
        onChange={handleNameChange}
      />
      <input
        type="text"
        placeholder="Filtrar por apellido..."
        value={apellido}
        onChange={handleApellidoChange}
      />
      <input
        type="text"
        placeholder="Filtrar por especialidad..."
        value={especialidad}
        onChange={handleEspecialidadChange}
      />
    </div>
  );
};

export default Filters;
