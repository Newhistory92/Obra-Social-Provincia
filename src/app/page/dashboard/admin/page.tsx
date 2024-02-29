"use client"

import { useState } from 'react';
import '../../../styles/theme.scss'
import NavbarVertical from '../../../Component/dashbord/navbars/NavbarVertical';
import NavbarTop from '../../../Component/dashbord/navbars/NavbarTop';
import Tables from "../../../Component/tables"
interface Props {
    children: React.ReactNode; // Especifica el tipo de children
    // Otros campos de props si los tienes
}

const DefaultDashboardLayout = (props: Props) => {
    const [showMenu, setShowMenu] = useState<boolean>(true); // Especifica que showMenu es de tipo boolean
    const ToggleMenu = () => {
        return setShowMenu(!showMenu);
    };  
    return (        
        <div id="db-wrapper" className={`${showMenu ? '' : 'toggled'}`}>
            <div className="navbar-vertical navbar">
                <NavbarVertical
                    showMenu={showMenu}
                    onClick={(value: boolean) => setShowMenu(value)} // Especifica que value es de tipo boolean
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
                {props.children}
                <div className='px-6 border-top py-3'>
                    <Tables/>
                </div>
            </div>
        </div>
    );
};
export default DefaultDashboardLayout;
