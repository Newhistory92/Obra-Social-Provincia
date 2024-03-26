"use client"

import React, { useState } from 'react';
import NavbarVertical from '../../Component/dashbord/navbars/NavbarVertical';
import NavbarTop from '../../Component/dashbord/navbars/NavbarTop';
import Prestadores from "../../Component/TablePrestador";
import Profile from "../../Component/perfil/Perfil";
import { useAppSelector } from "../../hooks/StoreHook"
import { UserProfile } from '@clerk/nextjs';
import FamilyGroup from "../../Component/FamilyGroupComponent"
import Ordenes from "../../Component/Ordenes"
interface Props {
  children: React.ReactNode;
}

const DefaultDashboardLayout: React.FC<Props> = ({ children }) => {
  const [showMenu, setShowMenu] = useState<boolean>(true);
  const [profileActive, setProfileActive] = useState(false);
  const [settingActive, setSettingActive] = useState(false);
  const [familyGroupActive, setFamilyGroupActive] = useState(false);
  const [ordenesActive, setOrdenesActive] = useState(false); // Nuevo estado para Ordenes

  const currentUser = useAppSelector(state => state.user.currentUser);
  const userRole = currentUser?.role;
  
  const ToggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleProfileClick = () => {
    setProfileActive(!profileActive);
    if (settingActive) {
      setSettingActive(false);
    }
  };

  const handleSettingClick = () => {
    setSettingActive(!settingActive);
    if (profileActive) {
      setProfileActive(false);
    }
  };

  const handleFamilyGroupClick = () => {
    setFamilyGroupActive(!familyGroupActive);
    if (profileActive || settingActive) {
      setProfileActive(false);
      setSettingActive(false);
    }
  };

  const handleOrdenesClick = () => {
    setOrdenesActive(!ordenesActive); // Alternar el estado de Ordenes
    if (profileActive || settingActive || familyGroupActive) {
      setProfileActive(false);
      setSettingActive(false);
      setFamilyGroupActive(false);
    }
  };

  return (
    <div id="db-wrapper" className={`${showMenu ? '' : 'toggled'}`}>
      <div className="navbar-vertical navbar">
        <NavbarVertical
         onSettingClick={handleSettingClick}
          onProfileClick={handleProfileClick} 
          onFamilyGroupClick={handleFamilyGroupClick}
          onOrdenesClick={handleOrdenesClick} // Pasar el handler de Ordenes

        />
      </div>
      <div id="page-content">
        <div className="header">
          <NavbarTop
            data={{
              showMenu: showMenu,
              SidebarToggleMenu: ToggleMenu
            }}
          />
        </div>
        {children}
        <div className='px-6 border-top py-3'>
          {profileActive && <Profile />}
          {settingActive && <UserProfile />} 
          {familyGroupActive && <FamilyGroup />}
          {ordenesActive && <Ordenes />} {/* Renderizar Ordenes si está activo */}
          {(userRole === 'USER') && <Prestadores />}
       
        </div>
      </div>
    </div>
  );
};

export default DefaultDashboardLayout;
