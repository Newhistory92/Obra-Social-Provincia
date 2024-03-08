"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Logo from "../../../public/Logo.png";
import styles from "./styles/Button.module.css";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Menu from './menu';
import Link from 'next/link';
import Prestadores from './TablePrestador';
import { useUser ,UserButton,} from '@clerk/clerk-react';

type OnLogoClick = () => void;

const Navbar = ({ onLogoClick }: { onLogoClick: OnLogoClick }) => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const { isSignedIn } = useUser();

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  const renderAuthButtons = () => {
    if (isSignedIn) {
      return (
        <Stack direction="row" spacing={2}>
          <Link href="/page/dashboard/afiliado" passHref>
            <Button variant="outlined" className={`icon text-2.8rem text-aliceblue cursor-pointer mr-5 ${styles.button}`}>
              Panel
            </Button>
          </Link>
          <UserButton/>
        </Stack>
      );
    } else {
      return (
        <Stack direction="row" spacing={2}>
          <Link href="/sign-in" passHref>
            <Button variant="outlined" className={`icon text-2.8rem text-aliceblue cursor-pointer mr-5 ${styles.button}`}>
              Iniciar sesión
            </Button>
          </Link>
          <Link href="/sign-up" passHref>
            <Button variant="outlined" className={`icon text-2.8rem text-aliceblue cursor-pointer mr-5 ${styles.button}`}>
              Registrarse
            </Button>
          </Link>
        </Stack>
      );
    }
  };

  return (
    <div className="fixed z-0 top-0 left-0 w-full py-3 sm:px-5 md:px-5 lg:px-5 xl:px-5 bg-black bg-opacity-5 backdrop-blur-lg flex items-center justify-between ">
      <div className="icon text-2.8rem text-aliceblue cursor-pointer mr-5" onClick={onLogoClick}>
        <Link href={'/'}>
          <Image src={Logo} alt="" width={200} height={50} />
        </Link>
      </div>
      <div className="flex items-center justify-end mb-5 w-full lg:w-auto">
        {renderAuthButtons()}
      </div>
      <div className="text-right absolute top-full right-0 w-full h-[4rem] bg-black bg-opacity-5 backdrop-blur-lg z-0">
        <div className="flex items-center justify-end">
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={activeTab}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <TabList onChange={handleTabChange} aria-label="lab API tabs example">
                    <Tab label="CARTILLA" value="cartilla" />
                    <Tab label="MEDICAMENTO" value="medicamento" />
                    <Tab label="EXPEDIENTE" value="expediente" />
                    <Tab label="MENU" value="menu" />
                  </TabList>
                </div>
              </Box>
              <TabPanel value="cartilla">
              <Prestadores/>
              </TabPanel>
              <TabPanel value="medicamento">
                Contenido de MEDICAMENTO
              </TabPanel>
              <TabPanel value="expediente">
                <iframe
                  src="https://sj.sanjuan.gob.ar/?uid=CUMV-VIEW-ExpedientesComponent"
                  title="Expediente"
                  width="100%"
                  height="600"
                  frameBorder="0"
                ></iframe>
              </TabPanel>
              <TabPanel value="menu">
                <Menu />
              </TabPanel>
            </TabContext>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

