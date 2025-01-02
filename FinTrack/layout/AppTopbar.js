import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { classNames } from 'primereact/utils';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import React, { Component, forwardRef, useContext, useImperativeHandle, useRef, useState } from 'react';
import { LayoutContext } from './context/layoutcontext';
import styles from '../styles/styles.module.css';
import * as components from '../pages/components';
import Image from 'next/image';
import logo from '../imagenes/login/FTl.jpg';
import logoN from '../imagenes/login/FT.jpg';

const AppTopbar = forwardRef((props, ref) => {
  const router = useRouter();
  const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar } = useContext(LayoutContext);
  const menubuttonRef = useRef(null);
  const topbarmenuRef = useRef(null);
  const topbarmenubuttonRef = useRef(null);

  useImperativeHandle(ref, () => ({
    menubutton: menubuttonRef.current,
    topbarmenu: topbarmenuRef.current,
    topbarmenubutton: topbarmenubuttonRef.current
  }));

  //----------------------| Modal confirmacion antes de salir |----------------------
  const aceptarDesicion = () => {
    localStorage.removeItem('token');
    console.log("Acepto")
    router.push('/')
  }

  const rechazarDesicion = () => {
    console.log("Nego")
  }

  const confirmarDesicion = () => {
    confirmDialog({
      message: '¿Estás seguro de cerrar la sesión?',
      header: 'Terminar sesión.',
      icon: 'pi pi-info-circle',
      position: 'top',
      accept: aceptarDesicion,
      reject: rechazarDesicion
    });
  };

  return (
    <div className="layout-topbar" style={{ backgroundColor: '#13121A' }} >
      <ConfirmDialog />
      {/* <Link href="/pages/dashboard" className="layout-topbar-logo">
        
        <span style={{
          background: 'linear-gradient(to right, #bf9000, #bf9000, #bf9000, #bf9000, #bf9000, #b8a143, #b8a143, #b8a143, #b7993b, #b7993b, #b7993b, #e9c550, #e9c550, #e9c550, #e4bf4d, #e4bf4d, #e4bf4d, #f2d054, #f2d054, #f2d054)',
          WebkitBackgroundClip: 'text', 
          color: 'transparent'
        }}>FinTrack</span>
      </Link>  */}
      <Image src={logoN} className={styles['logo']} alt="Mi imagen" priority={true} style={{ width: '50px', height: '50px' }} />
      <components.Title4>FinTrack</components.Title4>

      <button ref={menubuttonRef} type="button" className="p-link layout-menu-button layout-topbar-button" onClick={onMenuToggle}>
        <i className="pi pi-bars" style={{ color: '#fff' }}/>
      </button>

      <button
        ref={topbarmenubuttonRef}
        type="button"
        className="p-link layout-topbar-menu-button layout-topbar-button"
        onClick={showProfileSidebar}>
        <i className="pi pi-ellipsis-v" style={{ color: '#fff' }}/>
      </button>

      <div ref={topbarmenuRef} className={classNames('layout-topbar-menu', { 'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible })}>

        <button type="button" className="p-link layout-topbar-button" onClick={() => { router.push('/pages/usuario/perfil') }}>
          <i className="pi pi-user" style={{ color: '#fff' }}></i>
          <span>Perfil</span>
        </button>

        <button type="button" className="p-link layout-topbar-button" onClick={confirmarDesicion}>
          <i className="pi pi-sign-out" style={{ color: '#fff' }}></i>
          <span>Salir</span>
        </button>

      </div>
    </div>
  );
});

export default AppTopbar;
