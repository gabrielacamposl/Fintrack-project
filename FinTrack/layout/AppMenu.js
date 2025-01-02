import React from 'react';
import AppMenuitem from './AppMenuitem';
import { MenuProvider } from './context/menucontext';

const AppMenu = () => {

  const model = [
  
    {
      label: 'Análisis',
      items: [
        { label: 'Movimientos Bancarios', icon: 'pi pi-dollar', to: '/pages/usuario/mov_bancarios' },

      ]
    },
    {
      label: 'Visualización de Movimientos',
      items: [
        { label: 'Visualización de Gráficos', icon: 'pi pi-book', to: '/pages/usuario/mov_bancarios' }
      ]
    },
   
  ];

  return (
    <MenuProvider>
      <ul className="layout-menu">
        {model.map((item, i) => {
          return !item.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
        })}
      </ul>
    </MenuProvider>
  );
};

export default AppMenu;
