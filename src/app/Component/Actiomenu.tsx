import React, { MouseEvent } from 'react';
import { Dropdown } from 'react-bootstrap';
import { MoreVertical } from 'react-feather';

interface ActionMenuProps {
    userId: string; // ID del usuario
    onUpdateRole: (newRole: string) => void; // Función que actualiza el rol
}

const ActionMenu: React.FC<ActionMenuProps> = ({ userId, onUpdateRole }) => {
    
    const handleRoleChange = async (newRole: string) => {
        try {
            // Aquí se enviaría una solicitud PUT a la API para actualizar el rol
            const response = await fetch(`/api/datos/operador/${userId}`, { // Incluir el userId en la URL de la solicitud
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ role: newRole }),
            });

            if (response.ok) {
                onUpdateRole(newRole);
            } else {
                console.error('Error al actualizar el rol del usuario');
            }
        } catch (error) {
            console.error('Error al actualizar el rol del usuario:', error);
        }
    };


    return (
        <Dropdown>
            <Dropdown.Toggle as={CustomToggle}>
                <MoreVertical size="15px" className="text-muted" />
            </Dropdown.Toggle>
            <Dropdown.Menu align={'end'}>
                <Dropdown.Item onClick={() => handleRoleChange('Admin')}>
                    Admin
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleRoleChange('AuditorM')}>
                    AuditorM
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleRoleChange('Notificador')}>
                    Notificador
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleRoleChange('Prensa')}>
                    Prensa
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleRoleChange('Bioquimico')}>
                    Bioquimico
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

const CustomToggle = React.forwardRef<HTMLSpanElement, { children?: React.ReactNode, onClick?: (event: MouseEvent<HTMLSpanElement>) => void }>(
    ({ children, onClick }, ref) => (
        <span
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick?.(e);
            }}
        >
            {children}
        </span>
    )
);

export default ActionMenu;
