"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import menu from "../../../public/menu.svg";
import Logo from "../../../public/Logo.png";
import Button from './Button';
import styles from "./styles/Button.module.css"
// import SignUp from "../sign-in/[[...sign-in]]/page"
// import { UserButton } from "@clerk/nextjs";
import Link from 'next/link';


interface NavbarState {
  isMenuOpen: boolean;
}

class Navbar extends React.Component<{}, NavbarState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      isMenuOpen: false,
    };
  }

  toggleMenu = () => {
    this.setState((prevState) => ({
      isMenuOpen: !prevState.isMenuOpen,
    }));
  };




  
  render() {
    const { isMenuOpen } = this.state;

    return (
      <div className="fixed z-0 top-0 left-0 w-full py-3 sm:px-5 md:px-5 lg:px-5 xl:px-5 bg-black bg-opacity-5 backdrop-blur-lg flex items-center justify-between z-50">
        <div className="icon text-2.8rem text-aliceblue cursor-pointer mr-5" >
          <Image src={Logo} alt="" width={200} height={50} />
        </div>
        <div className="text-right absolute top-full right-0 w-full h-[4rem] bg-black bg-opacity-5 backdrop-blur-lg z-0">
          <div className="flex items-center justify-end">
          <button className={`button text-black text-base text-aliceblue no-underline font-semibold mr-10 ${styles.button}`}>
              CARTILLA
            </button>
            <button className={`button  text-black text-base text-aliceblue no-underline font-semibold mr-10 ${styles.button}`}>
              MEDICAMENTO
            </button>
            <button className={`button  text-black text-base text-aliceblue no-underline font-semibold mr-10 ${styles.button}`}>
              EXPEDIENTE
            </button>
            <div className="menu-container relative">
              <button
                className={`button  text-black text-base text-aliceblue no-underline font-semibold mr-2 ${styles.button}`}
                onClick={this.toggleMenu}
              >
                MENU
              </button>
              <div className={`menu-list absolute bg-black bg-opacity-5 backdrop-blur-lg ${isMenuOpen ? 'block' : 'hidden'}`}>
                <ul className=" text-black ">
                  <li>Formulario Pacientes Crónicos</li>
                  <li>Afiliaciones</li>
                  <li>Farmacias</li>
                  <li>Institucional</li>
                  <li>Prestadores</li>
                  <li>Servicios</li>
                  <li>Programas</li>
                </ul>
              </div>
            </div>
            <div className={`icon text-2.8rem text-aliceblue cursor-pointer mr-5 ${styles.button}`}  
              onClick={this.toggleMenu}>
              <Image src={menu} alt="Menu" width={50} height={20} />
            </div>
          </div>
        </div>
       
        
      </div>
    );
  }
}

export default Navbar;
