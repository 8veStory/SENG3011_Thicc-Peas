import React from 'react';

import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import Checkbox from '@material-ui/core/Checkbox';

import './CheckSymptomsPage.css';

export default function Check() {
  const [state, setState] = React.useState({
    hot: true,
    Fatigue: false,
    cough: false,
  });
  const [HIV_state, set_HIVState] = React.useState({
    fever: true,
    laryngitis: false,
    viral_rash: false,
  });
  const { hot, Fatigue, cough } = state;
  const handle_covid_Change = (event) => {
    console.log(event);

    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const { fever, laryngitis, viral_rash } = HIV_state;
  const handle_HIV_Change = (event) => {
    console.log(event.target);

    set_HIVState({ ...HIV_state, [event.target.name]: event.target.checked });
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [HIVanchorEl, setHIVAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    console.log(event.currentTarget);

    setAnchorEl(event.currentTarget);
  };
  const handleHIVClick = (event) => {


    setHIVAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleHIVClose = () => {
    setHIVAnchorEl(null);
  };
  const covid = [hot, Fatigue, cough].filter((v) => v).length >= 2;
  const HIV = [fever, laryngitis, viral_rash].filter((v) => v).length >= 2;
  const covid_onclick = () => {
    if (covid === true) {
      alert("You may have COVID-19. Please use the Vaccine Finder to find a test or vaccine.");
    } else {
      alert("You do not appear to be suffering from a majority COVID-19 symptoms. You are most likely safe.");
    }
  }
  const HIVonclick = () => {
    if (HIV === true) {
      alert("You may have HIV. Please use the Vaccine Finder to find a test near you.");
    } else {
      alert("You do not appear to be suffering from a majority HIV symptoms. You are most likely safe.");
    }
  }


  return (
    <div id="parent">

      <div className="child">
        <Button aria-controls="covid-menu" aria-haspopup="true" onClick={handleClick}>
          check covid-19
        </Button>
        <Menu
          id="covid-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <FormControl component="fieldset" >
            <FormLabel component="legend">If you feel</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={hot} onChange={handle_covid_Change} name="hot" />}
                label="hot"
              />
              <FormControlLabel
                control={<Checkbox checked={Fatigue} onChange={handle_covid_Change} name="Fatigue" />}
                label="Fatigue"
              />
              <FormControlLabel
                control={<Checkbox checked={cough} onChange={handle_covid_Change} name="cough" />}
                label="cough"
              />
            </FormGroup>
            <Button variant="contained" color="primary" onClick={covid_onclick}>
              Check
            </Button>
          </FormControl>
        </Menu>
      </div>
      <div className="child">
        <Button aria-controls="HIV-menu" aria-haspopup="true" onClick={handleHIVClick}>
          check HIV
        </Button>
        <Menu
          id="HIV-menu"
          anchorEl={HIVanchorEl}
          keepMounted
          open={Boolean(HIVanchorEl)}
          onClose={handleHIVClose}
        >
          <FormControl component="fieldset" >
            <FormLabel component="legend">If you feel</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={fever} onChange={handle_HIV_Change} name="fever" />}
                label="Ultra-high fever (above 39 degrees)"
              />
              <FormControlLabel
                control={<Checkbox checked={laryngitis} onChange={handle_HIV_Change} name="laryngitis" />}
                label="laryngitis"
              />
              <FormControlLabel
                control={<Checkbox checked={viral_rash} onChange={handle_HIV_Change} name="viral_rash" />}
                label="Whole body viral rash"
              />
            </FormGroup>
            <Button variant="contained" color="primary" onClick={HIVonclick}>
              Check
            </Button>
          </FormControl>
        </Menu>
      </div>


    </div>


  );
}