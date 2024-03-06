import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import HowToRegSharpIcon from '@mui/icons-material/HowToRegSharp';
import ApartmentSharpIcon from '@mui/icons-material/ApartmentSharp';
import MedicalServicesSharpIcon from '@mui/icons-material/MedicalServicesSharp';
import AssignmentSharpIcon from '@mui/icons-material/AssignmentSharp';
import MedicationLiquidSharpIcon from '@mui/icons-material/MedicationLiquidSharp';
import WheelchairPickupSharpIcon from '@mui/icons-material/WheelchairPickupSharp';

export default function Menu() {
  const [openIndex, setOpenIndex] = React.useState(-1);

  const handleClick = (index:number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton onClick={() => handleClick(0)}>
        <ListItemIcon>
          <AssignmentSharpIcon />
        </ListItemIcon>
        <ListItemText primary="Formulario Pacientes Crónicos" />
        {openIndex === 0 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openIndex === 0} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary="Contenido de Formulario Pacientes Crónicos" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton onClick={() => handleClick(1)}>
        <ListItemIcon>
          <HowToRegSharpIcon />
        </ListItemIcon>
        <ListItemText primary="Afiliaciones" />
        {openIndex === 1 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openIndex === 1} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary="Contenido de Afiliaciones" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton onClick={() => handleClick(2)}>
        <ListItemIcon>
          <MedicationLiquidSharpIcon />
        </ListItemIcon>
        <ListItemText primary="Farmacias" />
        {openIndex === 2 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openIndex === 2} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary="Contenido de Farmacias" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton onClick={() => handleClick(3)}>
        <ListItemIcon>
          <ApartmentSharpIcon />
        </ListItemIcon>
        <ListItemText primary="Institucional" />
        {openIndex === 3 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openIndex === 3} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary="Contenido de Institucional" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton onClick={() => handleClick(4)}>
        <ListItemIcon>
          <WheelchairPickupSharpIcon />
        </ListItemIcon>
        <ListItemText primary="Prestadores" />
        {openIndex === 4 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openIndex === 4} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary="Contenido de Prestadores" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton onClick={() => handleClick(5)}>
        <ListItemIcon>
          <MedicalServicesSharpIcon />
        </ListItemIcon>
        <ListItemText primary="Servicios" />
        {openIndex === 5 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openIndex === 5} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary="Contenido de Servicios" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton onClick={() => handleClick(6)}>
        <ListItemIcon>
          <WheelchairPickupSharpIcon />
        </ListItemIcon>
        <ListItemText primary="Programas" />
        {openIndex === 6 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openIndex === 6} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary="Contenido de Programas" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}
