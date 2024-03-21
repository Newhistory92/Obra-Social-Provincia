import React, { useState, useEffect } from "react";
import { Card, Table, Image,Modal,Button } from 'react-bootstrap';
import MedicalInformationOutlinedIcon from '@mui/icons-material/MedicalInformationOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import AddLocationOutlinedIcon from '@mui/icons-material/AddLocationOutlined';
import AddTaskSharpIcon from '@mui/icons-material/AddTaskSharp';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import Filters from "./Filters";
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import PrestadorCard from './cards/CardsPrestador';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

interface Prestador {
  id:string,
  imageUrl: string;
  name: string;
  apellido: string;
  descripcion: string;
  phone: string;
  phoneopc: string;
  address: string;
  especialidad:string,
  especialidad2:string,
  especialidad3:string,
  tipo: string,
  puntuacion:Number,
  email:string,
  checkedphone:boolean,
  coordinatesLat:Number, 
  coordinatesLon: Number,
}

const Prestadores = () => {
  const [prestadores, setPrestadores] = useState<Prestador[]>([]);
  const [filteredData, setFilteredData] = useState<Prestador[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPrestador, setSelectedPrestador] = useState<Prestador | null>(null);

  useEffect(() => {
    fetchPrestadores();
  }, []);

  const fetchPrestadores = async () => {
    try {
      const url = '/api/datos/prestador';
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const responseData: Prestador[] = await response.json();
      if (Array.isArray(responseData)) {
        setPrestadores(responseData);
        setFilteredData(responseData);
      } else {
        console.error('La respuesta de la API no es un arreglo:', responseData);
      }
    } catch (error) {
      console.error('Error al obtener los prestadores:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterByName = (value: string) => {
    const filteredData = prestadores.filter((prestador) =>
      prestador.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filteredData);
  };

  const filterByApellido = (value: string) => {
    const filteredData = prestadores.filter((prestador) =>
      prestador.apellido.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filteredData);
  };

  const filterByEspecialidad = (value: string) => {
    const filteredData = prestadores.filter((prestador) =>
      prestador.especialidad.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filteredData);
  };

  const filterByTipo = (value: string) => { // Nuevo filtro por tipo
    if (value === "") {
      setFilteredData(prestadores);
    } else {
      const filteredData = prestadores.filter((prestador) =>
        prestador.tipo.toLowerCase() === value.toLowerCase()
      );
      setFilteredData(filteredData);
    }
  };

  const handleClick = (prestador: Prestador) => {
    setSelectedPrestador(prestador);
  };

  const handleCloseModal = () => {
    setSelectedPrestador(null);
  };

  return (
    <Card className="h-100">
      <Card.Header className="bg-black py-4">
        <div className="flex ms-60">
          <Filters
            filterByName={filterByName}
            filterByApellido={filterByApellido}
            filterByEspecialidad={filterByEspecialidad}
            filterByTipo={filterByTipo}
          />
        </div>
      </Card.Header>
      <Table responsive className="text-nowrap">
        <thead className="table-light">
          <tr>
            <th>Prestadores</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Especialidad</th>
            <th>Teléfono</th>
            <th>Direccion</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={6}>
                <Box sx={{ width: 300 }}>
                  <Skeleton animation="wave" />
                  <Skeleton animation={false} />
                  <Skeleton animation="wave" />
                </Box>
              </td>
            </tr>
          ) : (
            filteredData.map(({ id, name, apellido, imageUrl, phone, phoneopc, especialidad, address, tipo,  email ,puntuacion,  descripcion,checkedphone,especialidad2,especialidad3,coordinatesLat, 
              coordinatesLon}) => (
              <tr key={id}>
                <td>
                  <Stack direction="row" spacing={1}>
                    <Chip
                      onClick={() => handleClick({
                        id, name, apellido, imageUrl, phone, phoneopc, especialidad, address, tipo,
                        descripcion, puntuacion, email,checkedphone,especialidad2,especialidad3,coordinatesLat, 
                        coordinatesLon
                      })}
                      avatar={<Avatar alt="Prestador" src={imageUrl} />}
                      label="Info.."
                      variant="outlined"
                    />
                  </Stack>
                </td>
                <td className="align-middle">{name}</td>
                <td className="align-middle">{apellido}</td>
                <td className="align-middle "><MedicalInformationOutlinedIcon className="mr-2 mb-1" />{especialidad} <ChevronRightOutlinedIcon fontSize="small"/> {especialidad2}<ChevronRightOutlinedIcon fontSize="small"/> {especialidad3}</td>
                <td className="align-middle">
               {checkedphone && (
                                  <>
               <LocalPhoneOutlinedIcon className="mr-2" />{phone}<ChevronRightOutlinedIcon fontSize="small"/>
                                  </>)}
                {phoneopc && (
                                   <>
              <LocalPhoneOutlinedIcon className="mr-2" /> {phoneopc}
                                  </>   )}
                </td>
                <td className="align-middle"><AddLocationOutlinedIcon className="mr-2 mb-1" />{address}</td>
                <td className="align-middle">{tipo === "FIDELIZADO" && <AddTaskSharpIcon className="mr-2 mb-1" />}{tipo}</td> {/* Mostrar el icono si el tipo es "Fidelizado" */}
              </tr>
            ))
          )}
        </tbody>
      </Table>
      {selectedPrestador && (
        <Modal show={true} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Prestador de Obra Social Provincia</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <PrestadorCard {...selectedPrestador} />
          </Modal.Body>
          <Modal.Footer>
            <Button color="secondary" variant="secondary" onClick={handleCloseModal}>Cerrar</Button>
          </Modal.Footer>
        </Modal>
      )}
    </Card>
  );
}

export default Prestadores;