import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Logo from "../../../../../public/logoshare.png";
import Image from 'next/image';
import { useUser } from '@clerk/nextjs';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import { useAppSelector } from "../../../hooks/StoreHook";

interface Props {
  onProfileClick: () => void;
  onSettingClick: () => void;
  onFamilyGroupClick: () => void;
  onOrdenesClick: () => void; // Agregar función de click para Ordenes
}

const NavbarVertical: React.FC<Props> = ({ onProfileClick, onSettingClick, onFamilyGroupClick, onOrdenesClick }) => {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [familyGroupOpen, setFamilyGroupOpen] = useState(false);
  const [odenes, setordenes] = useState(false);
  const currentUser = useAppSelector(state => state.user.currentUser);
  const userRole = currentUser?.role;
  const handleClick = () => {
    setOpen(!open);
  };

  const handleProfileClick = () => {
    if (profileOpen) {
      setProfileOpen(false);
    } else {
      onProfileClick();
    }
    setOpen(false);
  };

  const handleSettingClick = () => {
    if (profileOpen) {
      setProfileOpen(false);
      onSettingClick();
    } else {
      onSettingClick();
    }
    setOpen(false);
  };

  const handleFamilyGroupClick = () => {
    if (familyGroupOpen) {
      setFamilyGroupOpen(false);
    } else {
      onFamilyGroupClick();
    }
    setOpen(false);
  };

  const handleOrdenesClick = () => {
    if(odenes){

      setordenes(false); // Llamar a la función de click para Ordenes
    }else {
      onOrdenesClick ();
      }
    setOpen(false);
  };

  return (
    <div className='navbar-vertical'>
      <List style={{ maxHeight: "100vh", width: '100%', maxWidth: 360 }} component="nav">
        <div className="nav-scroller ml-5 navbar-brand">
          <Image src={Logo} alt="" width={90} height={60} />
        </div>
        <div className="navbar-heading nav-item">
          {user ? `Bienvenido ${user.fullName}` : ""}
        </div>
        <div className="slimScrollDiv">
          <div className="navbar-heading navbar navbar-brand">
            MENU
          </div>
          <ListItemButton className="nav-item  navbar" onClick={handleClick}>
            <ListItemText className="nav-link ms-5" primary="Datos Personales" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton onClick={handleProfileClick} sx={{ pl: 4 }}>
                <AccountCircleIcon/>
                <ListItemText className="nav-link" primary="Perfil" />
              </ListItemButton>
              
              <ListItemButton onClick={handleSettingClick} sx={{ pl: 4 }}>
                <SettingsIcon/>
                <ListItemText className="nav-link" primary="Configuración" />
              </ListItemButton>

              {userRole === 'USER' && ( // Mostrar el botón del grupo familiar solo si el usuario es USER
                <ListItemButton onClick={handleFamilyGroupClick} sx={{ pl: 4 }}>
                  <Diversity3Icon/>
                  <ListItemText className="nav-link" primary="Grupo Familiar" />
                </ListItemButton>
              )}
            </List>
          </Collapse>
          {/* Botón de Ordenes fuera de Datos Personales */}
          {userRole === 'USER' && (
            <ListItemButton onClick={handleOrdenesClick} sx={{ pl: 4 }}>
              <ContentPasteGoIcon/>
              <ListItemText className="nav-link" primary="Ordenes" />
            </ListItemButton>
          )}
        </div>
      </List>
    </div>
  );
}

export default NavbarVertical;

























// import React, { Fragment, useState, useContext } from "react";
// import Link from "next/link";
// import { ListGroup, Accordion, Card, Badge, useAccordionButton, AccordionContext } from "react-bootstrap";
// import SimpleBar from "simplebar-react";
// import { useMediaQuery } from "react-responsive";
// import { useUser } from '@clerk/nextjs';
// import Logo from "../../../../../public/logoshare.png"
// import Image from "next/image";

// const NavbarVertical = (props) => {
  
//   const { user } = useUser();
//   const isMobile = useMediaQuery({ maxWidth: 767 });
//   const [iframeSrc, setIframeSrc] = useState(null);

//   const CustomToggle = ({ children, eventKey, icon }) => {
//     const { activeEventKey } = useContext(AccordionContext);
//     const decoratedOnClick = useAccordionButton(eventKey, () => {
//       console.log("CustomToggle clicked!");
//       console.log("activeEventKey:", activeEventKey);
//     });
//     const isCurrentEventKey = activeEventKey === eventKey;
//     return (
//       <li className="nav-item">
//         <Link
//           href="#"
//           className="nav-link "
//           onClick={decoratedOnClick}
//           data-bs-toggle="collapse"
//           data-bs-target="#navDashboard"
//           aria-expanded={isCurrentEventKey ? true : false}
//           aria-controls="navDashboard"
//         >
//           {icon ? <i className={`nav-icon fe fe-${icon} me-2`}></i> : ""}{" "}
//           {children}
//         </Link>
//       </li>
//     );
//   };



//   return (
//     <Fragment>
//       <SimpleBar style={{ maxHeight: "100vh" }}>
//         <div className="nav-scroller ml-5">
//           <Link href="/" className="navbar-brand ml-5">
//             <Image src={Logo} alt="" width={90} height={60} />
//           </Link>
//         </div>
//         {/* User Info */}
//         <Card bsPrefix="nav-item">
//           <div className="navbar-heading">{user ? `Bienvenido ${user.fullName}` : ""}</div>
//         </Card>
//         {/* Menu */}
//         <Accordion defaultActiveKey="0" as="ul" className="navbar-nav flex-column">
//           <Card bsPrefix="nav-item">
//             <div className="navbar-heading">MENU</div>
//           </Card>
//           <CustomToggle eventKey="1" icon="layers">
//             Datos Personales
//           </CustomToggle>
//           <Accordion.Collapse eventKey="1" as="li" bsPrefix="nav-item">
//             <ListGroup as="ul" bsPrefix="" className="nav flex-column">
//               <ListGroup.Item as="li" bsPrefix="nav-item">
//               <Link href="/pages/profile">
//                   <p className="nav-link">Perfil</p>
//                 </Link>
//               </ListGroup.Item>
//               <ListGroup.Item as="li" bsPrefix="nav-item">
//               <Link href="/pages/settings">
//                   <p className="nav-link">Configuración</p>
//                 </Link> 
                
//               </ListGroup.Item>
//             </ListGroup>
//           </Accordion.Collapse>
//           <CustomToggle eventKey="2" icon="layers">
//             Prestadores
//           </CustomToggle>
//           <Accordion.Collapse eventKey="2" as="li" bsPrefix="nav-item">
//             <ListGroup as="ul" bsPrefix="" className="nav flex-column">
//               <ListGroup.Item as="li" bsPrefix="nav-item">
//                 {/* {generateLink({ link: "/providers/table", name: "Tabla" })} */}
//               </ListGroup.Item>
//             </ListGroup>
//           </Accordion.Collapse>
//           <CustomToggle eventKey="3" icon="layers">
//             Contactanos
//           </CustomToggle>
//           <Accordion.Collapse eventKey="3" as="li" bsPrefix="nav-item">
//             <ListGroup as="ul" bsPrefix="" className="nav flex-column">
//               <ListGroup.Item as="li" bsPrefix="nav-item">
//                 {/* {generateLink({ link: "/contact", name: "Contacto" })} */}
//               </ListGroup.Item>
//             </ListGroup>
//           </Accordion.Collapse>
//         </Accordion>
//         {/* end of Dashboard Menu */}
//         {iframeSrc && (
//           <iframe src={iframeSrc} style={{ width: "100%", height: "100vh", border: "none" }} />
//         )}
//       </SimpleBar>
//     </Fragment>
//   );
// };

// export default NavbarVertical;
