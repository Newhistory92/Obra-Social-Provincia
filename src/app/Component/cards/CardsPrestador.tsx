import React, { useState } from 'react';
import { Card, Col, Row, Modal, Button } from 'react-bootstrap';
import ProfileHeader from "../../sub-components/profile/ProfileHeader"

interface PrestadorProps {
    id: string;
    imageUrl: string;
    name: string;
    apellido: string;
    descripcion: string;
    phone: string;
    phoneopc: string;
    especialidad: string;
    address: string;
    puntuacion: Number;
    tipo: string;
    email:string
    // ubicacion: string; // Esta es la información de la ubicación que se usará para mostrar el minimapa
}

const PrestadorCard: React.FC<PrestadorProps> = ({ id, imageUrl, name, apellido, descripcion, phone, phoneopc, address, puntuacion, especialidad, tipo,email }) => {
    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    return (
        <>
            <Col xl={6} lg={12} md={12} xs={12} className="mb-6">
                {/* Card */}
                <Card onClick={handleShowModal}>
                    {/* Card body */}
                    <Card.Body>
                        {/* Card title */}
                 
                        <ProfileHeader imageUrl={imageUrl} name={name} apellido={apellido} email={email} />
                   
                       
                        <span className="text-uppercase fw-medium text-dark fs-5 ls-2">Un Poco de Mi</span>
                        <p className="mt-2 mb-6">{descripcion}</p>
                        <Row>
                            <Col xs={12} className="mb-5">
                                <h6 className="text-uppercase fs-5 ls-2">Teléfono</h6>
                                <p className="mb-0">{phone}{phoneopc}</p>
                            </Col>
                            <Col xs={12} className="mb-5">
                                <h6 className="text-uppercase fs-5 ls-2">Location</h6>
                                <p className="mb-0">{address}</p>
                                {/* Aquí deberías agregar el componente del minimapa utilizando la información de la ubicación */}
                            </Col>
                            <Col xs={12} className="mb-5">
                                <h6 className="text-uppercase fs-5 ls-2">Puntuación</h6>
                                <p className="mb-0">{puntuacion === null ? "Aun no clasificado" : puntuacion.toString()}</p>

                            </Col>
                            <Col xs={12} className="mb-5">
                                <h6 className="text-uppercase fs-5 ls-2">Estado</h6>
                                <p className="mb-0">{tipo}</p>
                            </Col>
                            <Col xs={12} className="mb-5">
                                <h6 className="text-uppercase fs-5 ls-2">Especialidad</h6>
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

