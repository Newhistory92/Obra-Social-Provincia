import React, { useState } from "react";

interface FiltersProps {
  filterByName: (value: string) => void;
  filterByApellido: (value: string) => void;
  filterByEspecialidad: (value: string) => void;
  filterByTipo: (value: string) => void;
  // filterByOrder: (value: string) => void;
}

const Filters: React.FC<FiltersProps> = ({
  filterByName,
  filterByApellido,
  filterByEspecialidad,
  filterByTipo,
  // filterByOrder,
}) => {
  const [name, setName] = useState("");
  const [apellido, setApellido] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [tipo, setTipo] = useState("");
  const [order, setOrder] = useState("");

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    filterByName(event.target.value);
  };

  const handleApellidoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setApellido(event.target.value);
    filterByApellido(event.target.value);
  };

  const handleEspecialidadChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEspecialidad(event.target.value);
    filterByEspecialidad(event.target.value);
  };

  const handleTipoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTipo(event.target.value);
    filterByTipo(event.target.value);
  };

  // const handleOrderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setOrder(event.target.value);
  //   filterByOrder(event.target.value);
  // };

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
      <select value={tipo} onChange={handleTipoChange}>
        <option value="">Todos</option>
        <option value="No Fidelizado">No Fidelizado</option>
        <option value="Fidelizado">Fidelizado</option>
      </select>
      {/* <select value={order} onChange={handleOrderChange}>
        <option value="">Ordenar por</option>
        <option value="asc">Ascendente</option>
        <option value="desc">Descendente</option>
      </select> */}
    </div>
  );
};

export default Filters;
