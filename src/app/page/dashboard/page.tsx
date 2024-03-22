"use client"

import React, { useState } from 'react';
import NavbarVertical from '../../Component/dashbord/navbars/NavbarVertical';
import NavbarTop from '../../Component/dashbord/navbars/NavbarTop';
import Prestadores from "../../Component/TablePrestador";
import Profile from "../../Component/perfil/Perfil";
import { useAppSelector } from "../../hooks/StoreHook"
import { UserProfile } from '@clerk/nextjs';
interface Props {
  children: React.ReactNode;
}

const DefaultDashboardLayout: React.FC<Props> = ({ children }) => {
  const [showMenu, setShowMenu] = useState<boolean>(true);
  const [profileActive, setProfileActive] = useState(false);
  const [settingActive, setSettingActive] = useState(false);
  const currentUser = useAppSelector(state => state.user.currentUser);
  // console.log(currentUser )
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
  return (
    <div id="db-wrapper" className={`${showMenu ? '' : 'toggled'}`}>
      <div className="navbar-vertical navbar">
        <NavbarVertical
         onSettingClick={handleSettingClick}
          onProfileClick={handleProfileClick} // Pasar la función para manejar el clic del perfil
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
          {profileActive && <Profile />} {/* Renderizar el perfil solo si profileActive es true */}
          {settingActive && <UserProfile />} 
          {userRole === 'USER' && <Prestadores />} 
        </div>
      </div>
    </div>
  );
};

export default DefaultDashboardLayout;