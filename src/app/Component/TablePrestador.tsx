import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { Card, Table, Dropdown, Image } from 'react-bootstrap';
import { MoreVertical } from 'react-feather';

const Prestadores = () => {
    const [prestadores, setPrestadores] = useState([]);

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
            const responseData = await response.json();
            if (Array.isArray(responseData)) {

                setPrestadores(responseData);
            } else {
                console.error('La respuesta de la API no es un arreglo:', responseData);
            }
        } catch (error) {
            console.error('Error al obtener los prestadores:', error);
        }
    };

    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        (<Link
            href=""
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
            className="text-muted text-primary-hover">
            {children}
        </Link>)
    ));

    CustomToggle.displayName = 'CustomToggle';

    const ActionMenu = () => {
        return (
            <Dropdown>
                <Dropdown.Toggle as={CustomToggle}>
                    <MoreVertical size="15px" className="text-muted" />
                </Dropdown.Toggle>
                <Dropdown.Menu align={'end'}>
                    <Dropdown.Item eventKey="1">
                        Action
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="2">
                        Another action
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="3">
                        Something else here
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        );
    };

    return (
        <Card className="h-100">
          <Card.Header className="bg-white py-4">
            <h4 className="mb-0">Prestadores</h4>
          </Card.Header>
          <Table responsive className="text-nowrap">
            <thead className="table-light">
              <tr>
                <th>Nombre</th>
                <th>Apellido</th> 
                <th>Especialidad</th>
                <th>Teléfono</th>
                <th>Direccion</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {prestadores.map(({ id, name, apellido, imageUrl, phone, phonesec, especialidad, direccion }, key) => {
                return (
                  <tr key={id}>
                    <td className="align-middle ms-3 lh-1">
                           <div>{name}</div>
                      <div className="d-flex align-items-center">
                        
                        <div>
                          <Image src={imageUrl} alt="" className="avatar-md avatar rounded-circle" />
                        </div>
                       
                      </div>
                    </td>
                    <td className="align-middle">{apellido}</td>
                    <td className="align-middle">{especialidad}</td>
                    <td className="align-middle">{phone}</td>
                    <td className="align-middle">{phonesec}</td>
                    <td className="align-middle">{direccion}</td>
                    <td className="align-middle">
                      <ActionMenu />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </Card>
      )
      
}

export default Prestadores;








// // import node module libraries
// import React from "react";
// import Link from 'next/link';
// import { Card, Table, Dropdown, Image } from 'react-bootstrap';
// import { MoreVertical } from 'react-feather';

// // import required data files


// const Teams = () => {

//     const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
//         (<Link
//             href=""
//             ref={ref}
//             onClick={(e) => {
//                 e.preventDefault();
//                 onClick(e);
//             }}
//             className="text-muted text-primary-hover">
//             {children}
//         </Link>)
//     ));

//     CustomToggle.displayName = 'CustomToggle';

//     const ActionMenu = () => {
//         return (
//             <Dropdown>
//                 <Dropdown.Toggle as={CustomToggle}>
//                     <MoreVertical size="15px" className="text-muted" />
//                 </Dropdown.Toggle>
//                 <Dropdown.Menu align={'end'}>
//                     <Dropdown.Item eventKey="1">
//                         Action
//                     </Dropdown.Item>
//                     <Dropdown.Item eventKey="2">
//                         Another action
//                     </Dropdown.Item>
//                     <Dropdown.Item eventKey="3">
//                         Something else here
//                     </Dropdown.Item>
//                 </Dropdown.Menu>
//             </Dropdown>
//         );
//     };

//     return (
//         <Card className="h-100">
//             <Card.Header className="bg-white py-4">
//                 <h4 className="mb-0">Teams </h4>
//             </Card.Header>
//             <Table responsive className="text-nowrap">
//                 <thead className="table-light">
//                     <tr>
//                         <th>Name</th>
//                         <th>Role</th>
//                         <th>Last Activity</th>
//                         <th></th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {TeamsData.map((item, index) => {
//                         return (
//                             <tr key={index}>
//                                 <td className="align-middle">
//                                     <div className="d-flex align-items-center">
//                                         <div>
//                                             <Image src={item.image} alt="" className="avatar-md avatar rounded-circle" />
//                                         </div>
//                                         <div className="ms-3 lh-1">
//                                             <h5 className=" mb-1">{item.name}</h5>
//                                             <p className="mb-0">{item.email}</p>
//                                         </div>
//                                     </div>
//                                 </td>
//                                 <td className="align-middle">{item.role}</td>
//                                 <td className="align-middle">{item.lastActivity}</td>
//                                 <td className="align-middle">
//                                     <ActionMenu />
//                                 </td>
//                             </tr>
//                         )
//                     })}
//                 </tbody>
//             </Table>
//         </Card>
//     )
// }

// export default Teams