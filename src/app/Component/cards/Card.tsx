import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
   
  export default function SimpleCard() {
    return (
      <Card className="mt-6 w-96">
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            Descripcion
          </Typography>
          <Typography>
          Experimentado médico comprometido con la excelencia en la atención y el 
          bienestar del paciente. Con sólida formación, empatía y habilidades de comunicación,
           ofrezco un enfoque personalizado y compasivo para cada necesidad médica.
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <Button>Edit</Button>
        </CardFooter>
      </Card>
    );
  }