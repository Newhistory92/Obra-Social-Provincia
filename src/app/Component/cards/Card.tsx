import { Card, CardBody, CardFooter, Typography, Button} from "@material-tailwind/react";
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
import PlaceIcon from '@mui/icons-material/Place';
import { UserProfile } from "@clerk/nextjs";
import DialogSelect from '../DialogSelect';
import MapComponent from "../MapComponent"
import  {getFormattedAddress} from "../../api/Maps/MapApi"

interface UserCardProps {
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





  const handleEspecialidadSelect = (especialidad: string) => {
    console.log("Especialidad seleccionada:", especialidad);
    if (especialidad2Seleccionada === null) {
        setEspecialidad2Seleccionada(especialidad);
    } else if (especialidad3Seleccionada === null) {
        setEspecialidad3Seleccionada(especialidad);
    }
};
const [checked, setChecked] = React.useState(false);

const handleChangePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
  setChecked(event.target.checked);
};

const fromHandler = () => {
  setFromModalOpen(true);
};
const closeModal = async (fromSelected: google.maps.LatLngLiteral) => {
  setFromModalOpen(false);
  const fromLocation = await getFormattedAddress(fromSelected);
  const fromArray = fromLocation.split(',');
  const extractCity = (str:string) => str.replace(/[\d\s\W]+/g, '').trim();
  const city = extractCity(fromArray[1]);
  setCiudadOrigen(city);
  setPaisOrigen(fromArray[fromArray.length -1]);
  setFrom(fromArray[0]);
};

const closeMapModal = () => {
  setFromModalOpen(false);
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
                 
                  Address: {address}
                  
                  <div>
      <button onClick={fromHandler}>Seleccionar dirección</button>

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
          <Button>Edit</Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default UserCard;
