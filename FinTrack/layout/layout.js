import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEventListener, useUnmountEffect } from 'primereact/hooks';
import { classNames, DomHandler } from 'primereact/utils';
import React, { useContext, useEffect, useRef } from 'react';
import AppFooter from './AppFooter';
import AppSidebar from './AppSidebar';
import AppTopbar from './AppTopbar';
import AppConfig from './AppConfig';
import { LayoutContext } from './context/layoutcontext';
import PrimeReact from 'primereact/api';

const Layout = (props) => {
  const { layoutConfig, layoutState, setLayoutState } = useContext(LayoutContext);
  const topbarRef = useRef(null);
  const sidebarRef = useRef(null);

  const router = useRouter();
  const [bindMenuOutsideClickListener, unbindMenuOutsideClickListener] = useEventListener({
    type: 'click',
    listener: (event) => {
      const isOutsideClicked = !(sidebarRef.current.isSameNode(event.target) || sidebarRef.current.contains(event.target) || topbarRef.current.menubutton.isSameNode(event.target) || topbarRef.current.menubutton.contains(event.target));

      if (isOutsideClicked) {
        hideMenu();
      }
    }
  });

  const [bindProfileMenuOutsideClickListener, unbindProfileMenuOutsideClickListener] = useEventListener({
    type: 'click',
    listener: (event) => {
      const isOutsideClicked = !(
        topbarRef.current.topbarmenu.isSameNode(event.target) ||
        topbarRef.current.topbarmenu.contains(event.target) ||
        topbarRef.current.topbarmenubutton.isSameNode(event.target) ||
        topbarRef.current.topbarmenubutton.contains(event.target)
      );

      if (isOutsideClicked) {
        hideProfileMenu();
      }
    }
  });

  const hideMenu = () => {
    setLayoutState((prevLayoutState) => ({ ...prevLayoutState, overlayMenuActive: false, staticMenuMobileActive: false, menuHoverActive: false }));
    unbindMenuOutsideClickListener();
    unblockBodyScroll();
  };

  const hideProfileMenu = () => {
    setLayoutState((prevLayoutState) => ({ ...prevLayoutState, profileSidebarVisible: false }));
    unbindProfileMenuOutsideClickListener();
  };

  const blockBodyScroll = () => {
    DomHandler.addClass('blocked-scroll');
  };

  const unblockBodyScroll = () => {
    DomHandler.removeClass('blocked-scroll');
  };

  useEffect(() => {
    if (layoutState.overlayMenuActive || layoutState.staticMenuMobileActive) {
      bindMenuOutsideClickListener();
    }

    layoutState.staticMenuMobileActive && blockBodyScroll();
  }, [layoutState.overlayMenuActive, layoutState.staticMenuMobileActive]);

  useEffect(() => {
    if (layoutState.profileSidebarVisible) {
      bindProfileMenuOutsideClickListener();
    }
  }, [layoutState.profileSidebarVisible]);

  useEffect(() => {
    router.events.on('routeChangeComplete', () => {
      hideMenu();
      hideProfileMenu();
    });
  }, []);

  PrimeReact.ripple = true;

  useUnmountEffect(() => {
    unbindMenuOutsideClickListener();
    unbindProfileMenuOutsideClickListener();
  });

  const containerClass = classNames('layout-wrapper', {
    'layout-overlay': layoutConfig.menuMode === 'overlay',
    'layout-static': layoutConfig.menuMode === 'static',
    'layout-static-inactive': layoutState.staticMenuDesktopInactive && layoutConfig.menuMode === 'static',
    'layout-overlay-active': layoutState.overlayMenuActive,
    'layout-mobile-active': layoutState.staticMenuMobileActive,
    'p-input-filled': layoutConfig.inputStyle === 'filled',
    'p-ripple-disabled': !layoutConfig.ripple
  });


  const estiloDelFondo = {
    backgroundImage: 'url("https://i.pinimg.com/736x/d8/5e/51/d85e51f6ecd887757843ad99d8a41bf9.jpg  ")', // Cambia la ruta por la de tu imagen
    backgroundSize: 'cover', // Puedes ajustar esto según tus preferencias
    backgroundPosition: 'center', // Puedes ajustar esto según tus preferencias
    // Otros estilos que desees agregar
  };



  return (
    <React.Fragment>
      <Head>
        <title>{`FinTrack - ${props.title}`}</title>
        <meta charSet="UTF-8" />
        <meta name="description" content={`${props.description}`} />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href={`/FT.ico`} type="image/x-icon"></link>
      </Head>

      <div className={containerClass} style={estiloDelFondo}>
        <AppTopbar ref={topbarRef} />
        <div ref={sidebarRef} className="layout-sidebar">
          <AppSidebar />
        </div>
        <div className="layout-main-container">
          <div className="layout-main">{props.children}</div>
          <AppFooter />
        </div>
        <AppConfig />
        <div className="layout-mask"></div>
      </div>
      
    </React.Fragment>
  );
};

export default Layout;
