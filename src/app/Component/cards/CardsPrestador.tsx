import React, { useState } from 'react';
import { Card, Col, Row, Modal, Button } from 'react-bootstrap';

interface PrestadorProps {
    id:string,
    imageUrl: string;
    name: string;
    apellido: string;
    descripcion: string;
    phone: string;
    phoneopc: string;
    especialidad:string,
    address: string;
    // ubicacion: string; // Esta es la información de la ubicación que se usará para mostrar el minimapa
}

const PrestadorCard: React.FC<PrestadorProps> = ({ id, imageUrl, name, apellido, descripcion, phone, phoneopc, address,  }) => {
    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    return (
        <Col xl={6} lg={12} md={12} xs={12} className="mb-6">
            {/* Card */}
            <Card>
                {/* Card body */}
                <Card.Body>
                    {/* Card title */}
                    <Card.Title as="h4">{name} {apellido}</Card.Title>
                    <span className="text-uppercase fw-medium text-dark fs-5 ls-2">Descripción</span>
                    <p className="mt-2 mb-6">{descripcion}</p>
                    <Row>
                        <Col xs={12} className="mb-5">
                            <h6 className="text-uppercase fs-5 ls-2">Teléfono</h6>
                            <p className="mb-0">{phone}{phoneopc}</p>
                        </Col>
                        <Col xs={12} className="mb-5">
                            <h6 className="text-uppercase fs-5 ls-2">Dirección</h6>
                            <p className="mb-0">{address}</p>
                            {/* Aquí deberías agregar el componente del minimapa utilizando la información de la ubicación */}
                        </Col>
                    </Row>
                    <Button variant="primary" onClick={handleShowModal}>Ver detalles</Button>
                </Card.Body>
            </Card>

            {/* Modal */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{name} {apellido}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={imageUrl} alt={name} className="img-fluid mb-3" />
                    <p><strong>Descripción:</strong> {descripcion}</p>
                    <p><strong>Teléfono:</strong> {phone}{phoneopc}</p>
                    <p><strong>Dirección:</strong> {address}</p>
                    {/* Aquí deberías agregar el componente del minimapa utilizando la información de la ubicación */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Cerrar</Button>
                </Modal.Footer>
            </Modal>
        </Col>
    );
};

export default PrestadorCard;
