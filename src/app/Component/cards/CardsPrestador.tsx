import React, { useState } from 'react';
import { Card, Col, Row, } from 'react-bootstrap';
import ProfileHeader from "../perfil/ProfileHeader"
import AddLocationIcon from '@mui/icons-material/AddLocation';
import AddIcCallSharpIcon from '@mui/icons-material/AddIcCallSharp';
import StarPurple500SharpIcon from '@mui/icons-material/StarPurple500Sharp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import DialogSelect from '../DialogSelect';
interface PrestadorProps {
    id: string;
    imageUrl: string;
    name: string;
    apellido: string;
    descripcion: string;
    phone: string;
    phoneopc: string;
    especialidad: string;
    especialidad2:string;
    especialidad3:string;
    address: string;
    puntuacion: Number;
    tipo: string;
    email:string
    // ubicacion: string; // Esta es la información de la ubicación que se usará para mostrar el minimapa
}

const PrestadorCard: React.FC<PrestadorProps> = ({ id, imageUrl, name, apellido, descripcion, phone, phoneopc, address, puntuacion, especialidad,especialidad2,especialidad3, tipo,email }) => {
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => setShowModal(true);

    return (
        <>
            <Col xl={50} lg={15} md={12} xs={12} className="mb-6">
                {/* Card */}
                <Card onClick={handleShowModal}>
                    {/* Card body */}
                    <Card.Body>
                        {/* Card title */}
                        <div className=" mb-6">
                        <ProfileHeader imageUrl={imageUrl} name={name} apellido={apellido} email={email} />
                        </div>
                        <span className="text-uppercase fw-medium text-dark fs-5 ls-2">Un Poco Sobre Mi</span>
                        <p className="mt-2 mb-6">{descripcion}</p>
                        <Row>
                            <Col xs={12} className="mb-5">
                                <h6 className="text-uppercase fs-5 ls-2 ">< AddIcCallSharpIcon/>Teléfono</h6>
                                <p className="mb-0">{phone}{phoneopc}</p>
                            </Col>
                            <Col xs={12} className="mb-5">
                                <h6 className="text-uppercase fs-5 ls-2"> <AddLocationIcon/>Location</h6>
                                <p className="mb-0">{address}</p>
                                {/* Aquí deberías agregar el componente del minimapa utilizando la información de la ubicación */}
                            </Col>
                            <Col xs={12} className="mb-5">
                                <h6 className="text-uppercase fs-5 ls-2">< StarPurple500SharpIcon/>Puntuación</h6>
                                <p className="mb-0">{puntuacion === null ? "Aun no Calificado" : puntuacion.toString()}</p>

                            </Col>
                            <Col xs={12} className="mb-5">
                                <h6 className="text-uppercase fs-5 ls-2"> <CheckCircleIcon />Estado</h6>
                                <p className="mb-0">{tipo}</p>
                            </Col>
                            <Col xs={12} className="mb-5">
                                <h6 className="text-uppercase fs-5 ls-2"> <MedicalInformationIcon/>Especialidad</h6>
                                <p className="mb-0">{especialidad}</p>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        </>
    );
};

export default PrestadorCard;

