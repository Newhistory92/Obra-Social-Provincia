"use client"

import React, { useState } from 'react';
import NavbarVertical from '../../Component/dashbord/navbars/NavbarVertical';
import NavbarTop from '../../Component/dashbord/navbars/NavbarTop';
import Prestadores from "../../Component/TablePrestador";
import Profile from "../../Component/perfil/Perfil";

interface Props {
  children: React.ReactNode;
}

const DefaultDashboardLayout: React.FC<Props> = ({ children }) => {
  const [showMenu, setShowMenu] = useState<boolean>(true);
  const [profileActive, setProfileActive] = useState(false);

  const ToggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleProfileClick = () => {
    setProfileActive(!profileActive); // Cambiar el estado de profileActive
  };

  return (
    <div id="db-wrapper" className={`${showMenu ? '' : 'toggled'}`}>
      <div className="navbar-vertical navbar">
        <NavbarVertical
          showMenu={showMenu}
          onClick={() => setShowMenu(!showMenu)}
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
          <Prestadores/>
        </div>
      </div>
    </div>
  );
};

export default DefaultDashboardLayout;
