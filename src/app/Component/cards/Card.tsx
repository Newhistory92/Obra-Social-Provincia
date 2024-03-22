import { Card, CardBody, CardFooter, Typography, Button} from "@material-tailwind/react";
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
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import DialogSelect from '../DialogSelect';
import MapComponent from "../MapComponent"
import  {getFormattedAddress} from "../../api/Maps/MapApi"
import { setCurrentUser, setLoading, setErrorMessage } from "../../reducers/userSlice";
import { useAppDispatch } from "../../hooks/StoreHook";
import Description from "../perfil/Description";
import { ToastContainer, toast } from 'react-toastify';


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
  checkedphone:boolean,
  prestador:string
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
  checkedphone,
}) => {
  const dispatch = useAppDispatch();

  const [especialidad2Seleccionada, setEspecialidad2Seleccionada] = React.useState<string | null>(null);
  const [especialidad3Seleccionada, setEspecialidad3Seleccionada] = React.useState<string | null>(null);
  const [fromModalOpen, setFromModalOpen] =  React.useState(false);
  const [from, setFrom] = React.useState<string | null>(null);
  const [ciudadOrigen, setCiudadOrigen] =  React.useState<string | null>(null);
  const [paisOrigen, setPaisOrigen] =  React.useState<string | null>(null);
  const [addressInfo, setAddressInfo] = React.useState<{ address: string | null, coordinates: google.maps.LatLngLiteral | null }>({ address: null, coordinates: null });
  const [hasChanges, setHasChanges] = React.useState(false);
// console.log(addressInfo)
const [checked, setChecked] = React.useState(checkedphone);
const [telefonoPublico, setTelefonoPublico] = React.useState<string | null>(null);
const [description, setDescription] =React.useState<string | null>(null);

const handleConfirmChanges = async () => {
  dispatch(setLoading(true))
  try {
    const postData = {
      id,
      especialidad2Seleccionada,
      especialidad3Seleccionada,
      from,
      ciudadOrigen,
      paisOrigen,
      addressInfo,
      telefonoPublico,
      checked,
      description
    };
    console.log("datos actualizados", postData);

    const response = await axios.put('/api/handlerprestador', postData);

    if (response.status === 200) {
      // Si la respuesta es exitosa, puedes realizar las acciones necesarias, como mostrar un mensaje de éxito.
      console.log('PUT request successful:', response.data);
      dispatch(setCurrentUser(response.data.updatedPrestador));
      toast.success("Datos Cofirmados con Existo ");
      setHasChanges(false);
    } else {
      // Manejar errores si la respuesta no es exitosa
      console.error('Error en el PUT request:', response.data);
      dispatch(setLoading(false))
    }
  } catch (error) {
    // Manejar errores si hay una excepción
    toast.error("Ocurrio un problema, Comunicate con Nosotros");
    console.error('Error en el PUT request:', error);
     dispatch(setLoading(false))
  }
};

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

const handleTelefonoPublicoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setTelefonoPublico(event.target.value);
  setHasChanges(true);
};
const handleCancelChanges = () => {
  setEspecialidad2Seleccionada(null);
  setEspecialidad3Seleccionada(null);
  setHasChanges(false);
};
const handleDescriptionSave = (newDescription: string) => {
  setDescription(newDescription);
  setHasChanges(true);
};


  return (
<>
  <Card className="mt-6 w-full md:w-96">
    <CardBody>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {role === "PROVIDER" && (
          <div>
            <Typography variant="h3" color="blue-gray" textGradient className="mb-2">
              Descripción
            </Typography>
            <Description initialDescription={descripcion || ''} onSave={handleDescriptionSave} />
            {description && (
            <Typography variant="h6">{description}</Typography>
          )}
          </div>
        )}
        <div>
          {role === "PROVIDER" && (
            <>
              <Typography variant="h4" color="blue-gray" className="mb-2">
                Información del Prestador
              </Typography>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Typography><AssignmentIndIcon/>Matrícula: {matricula}</Typography>
                  <FormGroup>
                    <Typography><AddIcCallIcon/>Telefono: {phone}</Typography>
                    <FormControlLabel 
                      required 
                      control={<SwichtStyle checked={checked} onChange={handleChangePhone} />}   
                      label="Publicar Telefono"
                    />
                  </FormGroup>
                  <Typography><PhoneAndroidIcon/>Telefono Publico: {phoneopc}</Typography>
                  <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '15ch' }, }} noValidate autoComplete="off">
                    <TextField id="standard-basic" label="N° de Telefono" variant="standard" onChange={handleTelefonoPublicoChange} />
                  </Box>
                  <Typography><StarPurple500SharpIcon/>Puntuación: {puntuacion}</Typography>
                </div>
                <div>
                      <Typography> <MedicalInformationIcon/>Especialidad: {especialidad}</Typography>

                      <Typography> <MedicalInformationIcon/>Especialidad: {especialidad2}</Typography>
                      <Typography>
                        
                      <DialogSelect onOk={(especialidad: string) => handleEspecialidadSelect(especialidad)} />
                      {especialidad2Seleccionada} <button> <DeleteOutlinedIcon  onClick={handleCancelChanges}
                         /> </button> </Typography>

                      <Typography> <MedicalInformationIcon/>Especialidad: {especialidad3}</Typography>
                      <Typography>

                      <DialogSelect onOk={(especialidad: string) => handleEspecialidadSelect(especialidad)} />
                      {especialidad3Seleccionada} <button> <DeleteOutlinedIcon  onClick={handleCancelChanges}
                         /> </button> </Typography>
                  
                      
                      <Typography><CheckCircleIcon />Estado: {tipo}</Typography>
                    </div>

              </div>
              <Typography><PlaceIcon/>Address: {from} {ciudadOrigen}{paisOrigen}</Typography>
              <div className="mt-5">
                <button className= "rounded  text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium  text-sm px-2 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2"
                  onClick={fromHandler}> < EditLocationAltIcon className="mr-1"/>Seleccionar dirección
                </button>
                {fromModalOpen && (
                  <div>
                    <MapComponent closeMapModal={closeMapModal} closeModal={closeModal} />
                  </div>
                )}
              </div>
            </>
          )}
          {role !== "PROVIDER" && (
            <div>
              {role === "USER" && (
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
          )}
        </div>
      </div>
    </CardBody>
    <CardFooter className="pt-0">
      <Button
        className={hasChanges ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 hover:bg-gray-500"}
        onClick={ handleConfirmChanges}
        disabled={!hasChanges}
      >Confirmar Cambios</Button>
    </CardFooter>
  </Card>
  <ToastContainer />
</>

  );
};

export default UserCard;



// import { Card, CardBody, CardFooter, Typography, Button} from "@material-tailwind/react";
// import axios from 'axios';
// import FormGroup from '@mui/material/FormGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import SwichtStyle from "../styles/Switchstyle";
// import React from 'react';
// import AddIcCallIcon from '@mui/icons-material/AddIcCall';
// import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
// import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
// import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
// import StarPurple500SharpIcon from '@mui/icons-material/StarPurple500Sharp';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
// import PlaceIcon from '@mui/icons-material/Place';
// import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
// import { UserProfile } from "@clerk/nextjs";
// import DialogSelect from '../DialogSelect';
// import MapComponent from "../MapComponent"
// import  {getFormattedAddress} from "../../api/Maps/MapApi"
// import { setCurrentUser, setLoading, setErrorMessage } from "../../reducers/userSlice";
// import { useAppDispatch } from "../../hooks/StoreHook";
// import Description from "../perfil/Description";
// import { ToastContainer, toast } from 'react-toastify';
// import tiposprestador from "../../../TipoPrestador.json"
// import { Fab } from '@mui/material';
// import NavigationIcon from '@mui/icons-material/Navigation';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// interface UserCardProps {
//   id:string,
//   role: string;
//   dependencia?: string;
//   dni?: string;
//   phone?: string;
//   phoneopc?: string;
//   matricula?: string;
//   especialidad?: string;
//   especialidad2?: string; 
//   especialidad3?: string;
//   puntuacion?: string;
//   descripcion?: string;
//   tipo?: string;
//   numeroOperador?: string;
//   address?: string;
//   checkedphone:boolean,
//   prestador:string
// }


// const UserCard: React.FC<UserCardProps> = ({
//   id,
//   role,
//   dependencia,
//   dni,
//   phone,
//   phoneopc,
//   matricula,
//   especialidad,
//   especialidad2,
//   especialidad3,
//   puntuacion,
//   descripcion,
//   tipo,
//   numeroOperador,
//   address,
//   checkedphone,
//   prestador
// }) => {
//   const dispatch = useAppDispatch();

//   const [especialidad2Seleccionada, setEspecialidad2Seleccionada] = React.useState<string | null>(null);
//   const [especialidad3Seleccionada, setEspecialidad3Seleccionada] = React.useState<string | null>(null);
//   const [fromModalOpen, setFromModalOpen] =  React.useState(false);
//   const [from, setFrom] = React.useState<string | null>(null);
//   const [ciudadOrigen, setCiudadOrigen] =  React.useState<string | null>(null);
//   const [paisOrigen, setPaisOrigen] =  React.useState<string | null>(null);
//   const [addressInfo, setAddressInfo] = React.useState<{ address: string | null, coordinates: google.maps.LatLngLiteral | null }>({ address: null, coordinates: null });
//   const [hasChanges, setHasChanges] = React.useState(false);
// // console.log(addressInfo)
// const [checked, setChecked] = React.useState(checkedphone);
// const [telefonoPublico, setTelefonoPublico] = React.useState<string | null>(null);
// const [description, setDescription] =React.useState<string | null>(null);
// const [selectedPrestador, setSelectedPrestador] = React.useState<string | null>(null);

//   // Función para manejar la selección de un tipo de prestador en el acordeón
//   const handlePrestadorSelect = (prestador: string) => {
//     setSelectedPrestador(prestador);
//   };

// const handleConfirmChanges = async () => {
//   dispatch(setLoading(true))
//   try {
//     const postData = {
//       id,
//       especialidad2Seleccionada,
//       especialidad3Seleccionada,
//       from,
//       ciudadOrigen,
//       paisOrigen,
//       addressInfo,
//       telefonoPublico,
//       checked,
//       description
//     };
//     console.log("datos actualizados", postData);

//     const response = await axios.put('/api/handlerprestador', postData);

//     if (response.status === 200) {
//       // Si la respuesta es exitosa, puedes realizar las acciones necesarias, como mostrar un mensaje de éxito.
//       console.log('PUT request successful:', response.data);
//       dispatch(setCurrentUser(response.data.updatedPrestador));
//       toast.success("Datos Cofirmados con Existo ");
//       setHasChanges(false);
//     } else {
//       // Manejar errores si la respuesta no es exitosa
//       console.error('Error en el PUT request:', response.data);
//       dispatch(setLoading(false))
//     }
//   } catch (error) {
//     // Manejar errores si hay una excepción
//     toast.error("Ocurrio un problema, Comunicate con Nosotros");
//     console.error('Error en el PUT request:', error);
//      dispatch(setLoading(false))
//   }
// };

//   const handleEspecialidadSelect = (especialidad: string) => {
//     console.log("Especialidad seleccionada:", especialidad);
//     if (especialidad2Seleccionada === null) {
//         setEspecialidad2Seleccionada(especialidad);
//         setHasChanges(true)
//     } else if (especialidad3Seleccionada === null) {
//         setEspecialidad3Seleccionada(especialidad);
//         setHasChanges(true)
//     }
// };

// const handleChangePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
//   setChecked(event.target.checked);
//   setHasChanges(true)
// };

// const fromHandler = () => {
//   setFromModalOpen(true);
// };
// const closeModal = async (fromSelected: google.maps.LatLngLiteral) => {
//   setFromModalOpen(false);
//   const locationInfo = await getFormattedAddress(fromSelected);

//   if (typeof locationInfo === 'string') {
//     console.error("Error al obtener la dirección:", locationInfo);
//     // Manejar el error
//   } else {
//     setAddressInfo({ address: locationInfo.results, coordinates: locationInfo.coordinates });
//     const fromArray = locationInfo.results.split(',');
//     const extractCity = (str: string) => str.replace(/[\d\s\W]+/g, '').trim();
//     const city = extractCity(fromArray[1]);
//     setCiudadOrigen(city);
//     setPaisOrigen(fromArray[fromArray.length - 1]);
//     setFrom(fromArray[0]);
//     setHasChanges(true)
//   }
// };

// const closeMapModal = () => {
//   setFromModalOpen(false);

// };

// const handleTelefonoPublicoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//   setTelefonoPublico(event.target.value);
//   setHasChanges(true);
// };
// const handleCancelChanges = () => {
//   setEspecialidad2Seleccionada(null);
//   setEspecialidad3Seleccionada(null);
//   setHasChanges(false);
// };
// const handleDescriptionSave = (newDescription: string) => {
//   setDescription(newDescription);
//   setHasChanges(true);
// };

// const handleNavigate = () => {
//   // Implementa la funcionalidad de navegación aquí
// };

//   return (
//     <>
//       <Card className="mt-6 w-full md:w-96">
//         <CardBody>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <Typography variant="h3" color="blue-gray" textGradient className="mb-2">
//                 Descripción
//               </Typography>
            
//               <Description initialDescription={descripcion || ''} onSave={handleDescriptionSave}   />
//               <Typography variant="h6">{description}</Typography>
//             </div>
//             <div>
//               {role === "user" && (
//                 <>
//                   <Typography variant="h3" color="blue-gray" className="mb-2">
//                     Información de Usuario
//                   </Typography>
//                   <Typography>Dependencia: {dependencia}</Typography>
//                   <Typography>DNI: {dni}</Typography>
//                   <Typography>Phone: {phone}</Typography>
//                   <Typography>Address: {address}</Typography>
//                 </>
//               )}
//               {role === "PROVIDER" && (
//                 <>
//                   <Typography variant="h4" color="blue-gray" className="mb-2">
//                     Información del Prestador<Fab variant="extended" className="ms-2" onClick={handleNavigate}>
//             <NavigationIcon sx={{ mr: 1 }} />
//             Tipo
//           </Fab>
//                   </Typography>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <Typography><AssignmentIndIcon/>Matrícula: {matricula}</Typography>
//                       <FormGroup>
//                       <Typography><AddIcCallIcon/>Telefono:
//                        {phone}
//                       <FormControlLabel required control={<SwichtStyle 
//                        checked={checked}
//                        onChange={handleChangePhone}
//                        />}   label="Publicar Telefono"
//                         />
//                        </Typography>
//                       </FormGroup>
//                       <Typography><PhoneAndroidIcon/>Telefono Publico: {phoneopc}
//                       <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '15ch' }, }} noValidate autoComplete="off">
//                     <TextField id="standard-basic" label="N° de Telefono" variant="standard" onChange={handleTelefonoPublicoChange} />
//                   </Box>
//                       </Typography>
//                       <Typography>< StarPurple500SharpIcon/>Puntuación: {puntuacion}</Typography>
//                     </div>
//                     <div>
//                       <Typography> <MedicalInformationIcon/>Especialidad: {especialidad}</Typography>

//                       <Typography> <MedicalInformationIcon/>Especialidad: {especialidad2}</Typography>
//                       <Typography>
                        
//                       <DialogSelect onOk={(especialidad: string) => handleEspecialidadSelect(especialidad)} />
//                       {especialidad2Seleccionada} <button> <DeleteOutlinedIcon  onClick={handleCancelChanges}
//                          /> </button> </Typography>

//                       <Typography> <MedicalInformationIcon/>Especialidad: {especialidad3}</Typography>
//                       <Typography>

//                       <DialogSelect onOk={(especialidad: string) => handleEspecialidadSelect(especialidad)} />
//                       {especialidad3Seleccionada} <button> <DeleteOutlinedIcon  onClick={handleCancelChanges}
//                          /> </button> </Typography>
                  
                      
//                       <Typography><CheckCircleIcon />Estado: {tipo}</Typography>
//                     </div>
//                   </div>
//                   <Typography><PlaceIcon/>
                 
//                   Address: {from} {ciudadOrigen}{paisOrigen}
                  
//                   <div className="mt-5">
//       <button className= "rounded  text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium  text-sm px-2 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2"
//        onClick={fromHandler}> < EditLocationAltIcon className="mr-1"/>Seleccionar dirección</button>

//       {fromModalOpen && (
//         <div>
//           <MapComponent
//             closeMapModal={closeMapModal}
//             closeModal={closeModal}
//           />
//         </div>
//       )}
//     </div></Typography>
//                    </>
//                    )}
//               {role === "employee" && (
//                 <>
//                   <Typography variant="h3" color="blue-gray" className="mb-2">
//                     Información de Empleado
//                   </Typography>
//                   <Typography>Phone: {phone}</Typography>
//                   <Typography>Número Operador: {numeroOperador}</Typography>
//                   <Typography>Address: {address}</Typography>
//                 </>
//               )}
//             </div>
//           </div>
//         </CardBody>
//         <CardFooter className="pt-0">
//         <Button
//     className={hasChanges ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 hover:bg-gray-500"}
//     onClick={ handleConfirmChanges}
//     disabled={!hasChanges}
//         >Confiirmar Cambios</Button>
//         </CardFooter>
//       </Card>
//       <ToastContainer />
//     </>
//   );
// };

// export default UserCard;