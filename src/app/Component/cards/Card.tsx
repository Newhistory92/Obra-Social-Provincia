import { Card, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import StarPurple500SharpIcon from '@mui/icons-material/StarPurple500Sharp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PlaceIcon from '@mui/icons-material/Place';
import { UserProfile } from "@clerk/nextjs";
interface UserCardProps {
  role: string;
  dependencia?: string;
  dni?: string;
  phone?: string;
  phoneopc?: string;
  matricula?: string;
  especialidad?: string;
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
  puntuacion,
  descripcion,
  tipo,
  numeroOperador,
  address,
}) => {

    return (
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
                      <Typography><AddIcCallIcon/>Phone: {phone}</Typography>
                      <Typography>< StarPurple500SharpIcon/>Puntuación: {puntuacion}</Typography>
                    </div>
                    <div>
                      <Typography> <MedicalInformationIcon/>Especialidad: {especialidad}</Typography>
                      <Typography><PhoneAndroidIcon/>Phone opcional: {phoneopc}</Typography>
                      <Typography><CheckCircleIcon />Estado: {tipo}</Typography>
                    </div>
                  </div>
                  <Typography><PlaceIcon/>Address: {address}</Typography>
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
          <Button>Edit
        

          </Button>
        </CardFooter>
      </Card>
    );
  };
  
  export default UserCard;