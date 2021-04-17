import { SwipeableDrawer } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import clsx from 'clsx';

import './SideMenu.css';
import SideMenuContent from './components/SideMenuContent/SideMenuContent';

export default function SideMenu() {
  const useStyles = makeStyles({
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
  });
  const classes = useStyles();

  // React state
  const [state, setState] = React.useState({
    left: false,
  });

  // Helper methods
  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom"
      })}
      role="presentation"
    >
      <SideMenuContent/>
    </div>
  );

  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>

      <React.Fragment key={"left"} >
        <div id="sidepane-min" className="sidebar-min">
          <button id="obutton" className="openbtn" onClick={toggleDrawer("left", true)}>&#9776;</button>
        </div>
        <SwipeableDrawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
          onOpen={toggleDrawer("left", true)}
        >
          {list("left")}
        </SwipeableDrawer>
      </React.Fragment>

    </div>
  );
}