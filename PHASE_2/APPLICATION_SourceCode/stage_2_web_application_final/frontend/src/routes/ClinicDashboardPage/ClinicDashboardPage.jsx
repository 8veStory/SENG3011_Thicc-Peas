import { useState } from 'react'
import React from 'react';
import { v4 as uuid } from 'uuid';
import "./ClinicDashBoardPage.css";
import Checkbox from '@material-ui/core/Checkbox';
import NavBar from '../../components/NavBar/NavBar';
import { Redirect, useHistory } from 'react-router-dom';
// TODO: Get rid of these inventory and bookings arrays. Instead, get this data
// by making an API request to the back-end.
var inventory = [
  {
    Amount: 20,
    Type: 'Test',
    Disease: 'Covid',
    remove: false
  },
  {
    Amount: 50,
    Type: 'Vaccine',
    Disease: 'Covid',
    remove: false
  },
  {
    Amount: 50,
    Type: 'Vaccine',
    Disease: 'Covid',
    remove: false
  }
]
function TenFunction(props) {


  const ten_count = props.ten_count;
  const setten_count = props.setten_count;
  const leng = props.leng;


  function decreateCount() {
    setten_count(ten_count - 1);
  }
  function incrementCount() {
    setten_count(ten_count + 1);
  }
  if (ten_count === 0 && leng <= 10) {
    return (null);
  }
  if (ten_count === 0) {
    return (
      <div>
        <button type="button" className="clearbtn" onClick={
          incrementCount
        }>next ten</button>
      </div>
    );
  } else if ((leng - ten_count * 10) > 10 && ten_count > 0) {
    return (
      <div>
        <button type="button" className="clearbtn" onClick={incrementCount}>next ten</button>
        <button type="button" className="clearbtn" onClick={
          decreateCount
        }>last ten</button>
      </div>
    );
  } else {
    return (
      <div>
        <button type="button" className="clearbtn" onClick={
          decreateCount
        }>last ten</button>
      </div>
    );
  }

}
function select_count(book) {
  var count = 0;
  var i;
  for (i = 0; i < book.length; i++) {
    if (book[i].remove === true) {
      count++;
    }
  }
  return count;
}
function ClearButtion(props) {
  var inv = props.inv;
  var setInv = props.setInv;
  function clearBook() {
    var i = 0;
    var count = 0;
    var newArr = [];
    for (i = 0; i < inv.length; i++) {
      if (inv[i].remove !== true) {
        newArr[count] = inv[i];
        count++;
      }
    }
    setInv(newArr);
  }


  if (select_count(inv) !== 0) {
    return (
      <div>
        <button type="button" className="clearbtn" onClick={
          clearBook
        }>Delete</button>
      </div>
    );
  } else {
    return null;
  }
}
// function UniqInv(props){
//   var inv = props.inv;
//   var setInv = props.setInv;

//   function HandleSubmit(e){
//       e.preventDefault();
//       console.log(inv[0].Amount);

//       var newArr = [{
//         Amount: inv[0].Amount,
//         Type: inv[0].Type,
//         Disease: inv[0].Disease,
//         remove: inv[0].remove
//       }];
//       console.log(newArr);
//       console.log(inv);
//       var i = 0;
//       var j = 0;
//       var count = 1;
//       for(i = 1;i < inv.length;i++){
//         console.log(inv[i]);
//         for(j = 0;j < newArr.length;j++){
//           console.log(newArr);


//           if(inv[i].Type === newArr[j].Type && inv[i].Disease === newArr[j].Disease){
//             newArr[j].Amount = newArr[j].Amount + inv[i].Amount;
//             continue;
//           }else{
//             newArr[count] = {
//               Amount: inv[i].Amount,
//               Type: inv[i].Type,
//               Disease: inv[i].Disease,
//               remove: inv[i].remove
//             };
//             count++;
//             continue;
//           }
//         }
//       }
//       console.log(newArr);

//       setInv(newArr);

//     }
//   return(
//         <div>
//             <button  className="addbtn" onClick={HandleSubmit}>uniq</button>
//         </div>
//     );
// }
function SubmitButton(props) {
  var inv = props.inv;
  var amo = props.amo;
  var type = props.type;
  var disease = props.disease;
  var setInv = props.setInv;

  function HandleSubmit(e) {
    e.preventDefault();

    if (!amo || !type || !disease) {
      return;
    }

    setInv([...inv, {
      id: inv.length + 1,
      Amount: amo,
      Type: type,
      Disease: disease,
      remove: false
    }]);
  }
  return (
      <div>
          <input type="submit" className="addbtn" onClick={HandleSubmit} value="Add"></input>
      </div>
  );
}
export default function ClinicDashboard(props) {
  const history = useHistory();
  const clinicID = props.location.state ? props.location.state.clinicID : props.clinicID;

  console.log(history);
  console.log(props);
  console.log(clinicID);

  // React state
  const [inv, setInv] = useState(inventory);

  const [disease, setDis] = useState('');
  const [type, setType] = useState('');
  const [amo, setAmo] = useState(0);
  const [ten_count, setten_count] = useState(0);

  const handleChange = (event, item, index) => {
    let newArr = [...inv];
    newArr[index].remove = event.target.checked;
    setInv(newArr);
  };
  const addInv = (inv, setInv, add_item) => {
    setInv([...inv, add_item]);
  }

  const clearInv = (setInv) => {
    setInv([]);
  }

  const toTitleCase = (str) => {
    return str.replace(
      /\w\S*/g,
      function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

  if (!clinicID) {
    history.push('/');
  }

  return (
    <div>
      <NavBar clinicID={clinicID}></NavBar>

      <h1 className="title">Clinic Inventory</h1>
      <div className="clinic-main-container">

        <div className="clinic-container clinic-inventory-container">
          <h2 className="clinic-heading">Inventory</h2>

          <table className="clinic-table" id="inventory-table">
            <tbody key={uuid()}>
              <tr>
                <th>Disease</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Select</th>
              </tr>
            </tbody>
            {inv.map((item, index) => {

              if (index >= (ten_count * 10) && index < (10 + ten_count * 10)) {
                return (
                  <tbody key={index}>
                    <tr >
                      <td className="clinic-tablerow">{item.Disease}</td>
                      <td className="clinic-tablerow">{item.Type}</td>
                      <td className="clinic-tablerow">{item.Amount}</td>
                      <td className="clinic-tablerow">
                        <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} checked={item.remove} onChange={(evt) => handleChange(evt, item, index)} />
                      </td>
                    </tr>
                  </tbody>
                );


              } else {

                return (null);
              }

            })}
          </table>

          {/* <TenFunction ten_count={ten_count} setten_count={setten_count} leng={inv.length}/> */}
        </div>

        <div className="clinic-container clinic-add-inventory-container">
          <h2 className="clinic-heading">Add to Inventory</h2>

          <div className="clinic-inventorybox">
            <form id="add-to-inv-form">
              <label htmlFor="disease"><b>Disease</b></label>
              <select name="disease" id="disease" onChange={e => setDis(e.target.value)}>
                <option disabled selected value>Select a disease</option>
                <option value="COVID-19">COVID-19</option>
                <option value="Measles">Measles</option>
                <option value="Flu">Flu</option>
                <option value="Hepatitis">Hepatitis B</option>
                <option value="Rotavirus">Rotavirus</option>
                <option value="Meningococcal">Meningococcal ACWY</option>
                <option value="Penumonococcal">Penumonococcal</option>
                <option value="Pertussis">Pertussis</option>
                <option value="Tetanus">Tetanus</option>
                <option value="Diphtheria">Diphtheria</option>
                <option value="Shingles (herpes zoster">Shingles (Herpes Zoster)</option>
                <option value="Polio">Polio</option>
                <option value="Mumps">Mumps</option>
                <option value="Rubella">Rubella</option>
              </select>

              <label htmlFor="Type"><b>Type</b></label>
              <select name="type" id="type" onChange={e => setType(e.target.value)}>
                <option value="Test">Test</option>
                <option value="Vaccine">Vaccine</option>
              </select>

              <label htmlFor="amount"><b>Amount</b></label>
              <input required type="number" placeholder="1234" name="amount" onChange={e => setAmo(e.target.value)} required></input>
              <ClearButtion inv={inv} setInv={setInv} />
              <SubmitButton inv={inv} type={type} setInv={setInv} amo={amo} disease={disease} />

              <h5> {select_count(inv)} inventory selected</h5>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}