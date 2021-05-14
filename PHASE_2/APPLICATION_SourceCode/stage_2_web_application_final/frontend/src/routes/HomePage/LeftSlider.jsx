import React from 'react';

import './LeftSlider.css';
import forwardArrow from './../../images/arrow-forward.svg';

import Check from './../CheckSymptomsPage/CheckSymptomsPage';
import VaccineFinder from '../VaccineFinder/VaccineFinder';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import LocalOutbreaks from '../LocalOutbreaks/LocalOutbreaks';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function LeftSlider(props) {
  let sliderClasses = 'left-slider';
  if (props.show) {
    sliderClasses = 'left-slider open';
  }

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <nav className={sliderClasses}>
      <div className="layout">
        <div className="individual-pages">
          <div className={classes.root} style={{height: '100%', backgroundColor: "#F1F7FF"}}>
            <Tabs
              orientation="vertical"
              // variant="scrollable"
              variant="fullWidth"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              className={classes.tabs}
              TabIndicatorProps={{style: {background:'#346EEB'}}}
            >
              <Tab label="Vaccine Finder" {...a11yProps(0)} />
              <Tab label="Symptom Checker" {...a11yProps(1)} />
            </Tabs>
            {/* <TabPanel value={value} index={0} style={{height: '100%', width: 'auto', backgroundColor: '#DCE9FB'}}> */}
            <TabPanel value={value} index={0} style={{height: '100%', width: '100%'}}>
              <VaccineFinder/>
            </TabPanel>
            <TabPanel value={value} index={1} style={{height: '100%', width: '100%'}}>
              Symptom Checker
              <Check/>
            </TabPanel>
          </div>
        </div>
        <div className="forward-arrow" onClick={props.hide}>
          <img src={forwardArrow}/>
        </div>
      </div>
    </nav>
  );
}
