import { Card, CardBody, CardFooter, Typography, Button} from "@material-tailwind/react";
import { useEffect } from 'react';
import axios from 'axios';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SwichtStyle from "../styles/Switchstyle";
import React from 'react';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import StarPurple500SharpIcon from '@mui/icons-material/StarPurple500Sharp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import PlaceIcon from '@mui/icons-material/Place';
import { UserProfile } from "@clerk/nextjs";
import DialogSelect from '../DialogSelect';
import MapComponent from "../MapComponent"
import  {getFormattedAddress} from "../../api/Maps/MapApi"

interface UserCardProps {
  id:string,
  role: string;
  dependencia?: string;
  dni?: string;
  phone?: string;
  phoneopc?: string;
  matricula?: string;
  especialidad?: string;
  especialidad2?: string; 
  especialidad3?: string;
  puntuacion?: string;
  descripcion?: string;
  tipo?: string;
  numeroOperador?: string;
  address?: string;
}

const UserCard: React.FC<UserCardProps> = ({
  id,
  role,
  dependencia,
  dni,
  phone,
  phoneopc,
  matricula,
  especialidad,
  especialidad2,
  especialidad3,
  puntuacion,
  descripcion,
  tipo,
  numeroOperador,
  address,
}) => {
  const [especialidad2Seleccionada, setEspecialidad2Seleccionada] = React.useState<string | null>(null);
  const [especialidad3Seleccionada, setEspecialidad3Seleccionada] = React.useState<string | null>(null);
  const [fromModalOpen, setFromModalOpen] =  React.useState(false);
  const [from, setFrom] = React.useState<string | null>(null);
  const [ciudadOrigen, setCiudadOrigen] =  React.useState<string | null>(null);
  const [paisOrigen, setPaisOrigen] =  React.useState<string | null>(null);
  const [addressInfo, setAddressInfo] = React.useState<{ address: string | null, coordinates: google.maps.LatLngLiteral | null }>({ address: null, coordinates: null });
  const [hasChanges, setHasChanges] = React.useState(false);
console.log(addressInfo)


useEffect(() => {
  if (hasChanges) {
    // Lógica para realizar el PUT a '/api/handlerprestador'
    const postData = {
      // Datos a enviar en el cuerpo del PUT
      // Ejemplo:
      id,
      especialidad2Seleccionada,
      especialidad3Seleccionada,
      from,
      ciudadOrigen,
      paisOrigen,
      addressInfo,
    };
  console.log(postData)
    axios.put('/api/handlerprestador', postData)
      .then((response) => {
        // Manejar la respuesta si es necesario
        console.log('PUT request successful:', response.data);
        // Restablecer el estado de hasChanges
        setHasChanges(false);
      })
      .catch((error) => {
        // Manejar errores si es necesario
        console.error('Error en el PUT request:', error);
      });
  }
}, [hasChanges]); // Este efecto se ejecuta cuando el estado hasChanges cambia


  const handleEspecialidadSelect = (especialidad: string) => {
    console.log("Especialidad seleccionada:", especialidad);
    if (especialidad2Seleccionada === null) {
        setEspecialidad2Seleccionada(especialidad);
        setHasChanges(true)
    } else if (especialidad3Seleccionada === null) {
        setEspecialidad3Seleccionada(especialidad);
        setHasChanges(true)
    }
};
const [checked, setChecked] = React.useState(false);

const handleChangePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
  setChecked(event.target.checked);
  setHasChanges(true)
};

const fromHandler = () => {
  setFromModalOpen(true);
};
const closeModal = async (fromSelected: google.maps.LatLngLiteral) => {
  setFromModalOpen(false);
  const locationInfo = await getFormattedAddress(fromSelected);

  if (typeof locationInfo === 'string') {
    console.error("Error al obtener la dirección:", locationInfo);
    // Manejar el error
  } else {
    setAddressInfo({ address: locationInfo.results, coordinates: locationInfo.coordinates });
    const fromArray = locationInfo.results.split(',');
    const extractCity = (str: string) => str.replace(/[\d\s\W]+/g, '').trim();
    const city = extractCity(fromArray[1]);
    setCiudadOrigen(city);
    setPaisOrigen(fromArray[fromArray.length - 1]);
    setFrom(fromArray[0]);
    setHasChanges(true)
  }
};

const closeMapModal = () => {
  setFromModalOpen(false);

};


const handleLocalStateChange = () => {
  setHasChanges(true);
};
  

  return (
    <>
      <Card className="mt-6 w-full md:w-96">
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Typography variant="h3" color="blue-gray" textGradient className="mb-2">
                Descripción
              </Typography>
              <Typography variant="h6">{descripcion}</Typography>
            </div>
            <div>
              {role === "user" && (
                <>
                  <Typography variant="h3" color="blue-gray" className="mb-2">
                    Información de Usuario
                  </Typography>
                  <Typography>Dependencia: {dependencia}</Typography>
                  <Typography>DNI: {dni}</Typography>
                  <Typography>Phone: {phone}</Typography>
                  <Typography>Address: {address}</Typography>
                </>
              )}
              {role === "provider" && (
                <>
                  <Typography variant="h4" color="blue-gray" className="mb-2">
                    Información del Prestador
                  </Typography>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Typography><AssignmentIndIcon/>Matrícula: {matricula}</Typography>
                      <FormGroup>
                      <Typography><AddIcCallIcon/>Telefono:
                       {phone}
                      <FormControlLabel required control={<SwichtStyle 
                       checked={checked}
                       onChange={handleChangePhone}
                       />}   label="Publicar Telefono"
                        />
                       </Typography>
                      </FormGroup>
                      <Typography><PhoneAndroidIcon/>Telefono Publico: {phoneopc}
                      <Box  component="form"
                      sx={{'& > :not(style)': { m: 1, width: '15ch' },}}
                      noValidate
                      autoComplete="off">
                         <TextField id="standard-basic" label="N° de Telefono" variant="standard" />
                      </Box>
                      </Typography>
                      <Typography>< StarPurple500SharpIcon/>Puntuación: {puntuacion}</Typography>
                    </div>
                    <div>
                      <Typography> <MedicalInformationIcon/>Especialidad: {especialidad}</Typography>
                      <Typography> <MedicalInformationIcon/>Especialidad:<DialogSelect onOk={(especialidad: string) => handleEspecialidadSelect(especialidad)} />
                       {especialidad2Seleccionada}</Typography>
                      <Typography> <MedicalInformationIcon/>Especialidad:<DialogSelect onOk={(especialidad: string) => handleEspecialidadSelect(especialidad)}/>
                       {especialidad3Seleccionada}</Typography>
                      
                      <Typography><CheckCircleIcon />Estado: {tipo}</Typography>
                    </div>
                  </div>
                  <Typography><PlaceIcon/>
                 
                  Address: {from} {ciudadOrigen}{paisOrigen}
                  
                  <div className="mt-5">
      <button className= "rounded  text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium  text-sm px-2 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2"
       onClick={fromHandler}> < EditLocationAltIcon className="mx-2"/>Seleccionar dirección</button>

      {fromModalOpen && (
        <div>
          <MapComponent
            closeMapModal={closeMapModal}
            closeModal={closeModal}
          />
        </div>
      )}
    </div></Typography>
                   </>
                   )}
              {role === "employee" && (
                <>
                  <Typography variant="h3" color="blue-gray" className="mb-2">
                    Información de Empleado
                  </Typography>
                  <Typography>Phone: {phone}</Typography>
                  <Typography>Número Operador: {numeroOperador}</Typography>
                  <Typography>Address: {address}</Typography>
                </>
              )}
            </div>
          </div>
        </CardBody>
        <CardFooter className="pt-0">
        <Button
    className={hasChanges ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 hover:bg-gray-500"}
    onClick={handleLocalStateChange}
        >Confiirmar Cambios</Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default UserCard;
