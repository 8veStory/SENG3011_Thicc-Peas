import { useState } from 'react'
import React from 'react';

import "./ClinicDashBoardPage.css";

// TODO: Get rid of these inventory and bookings arrays. Instead, get this data
// by making an API request to the back-end.
var inventory = [
  {
    Amount: 20,
    Type: 'Test',
    Disease: 'Covid'
  },
  {
    Amount: 50,
    Type: 'Vaccine',
    Disease: 'Covid'
  }, {
    Amount: 15,
    Type: 'Vaccine',
    Disease: 'Flu'
  }
]

var bookings = [
  {
    id: 1,
    name: 'John Doe',
    Type: 'Vaccine',
    Disease: 'Covid'
  },
  {
    id: 2,
    name: 'Jane Doe',
    Type: 'Test',
    Disease: 'Malaria'
  }, {
    id: 3,
    name: 'Sue Doe',
    Type: 'Test',
    Disease: 'Malaria'
  },
  {
    id: 4,
    name: 'Mike Doe',
    Type: 'Vaccine',
    Disease: 'Flu'
  },
  {
    id: 5,
    name: 'Max Owen',
    Type: 'Test',
    Disease: 'Covid'
  },
]

export default function ClinicDashboard(props) {
  // React state
  const [inv, setInv] = useState(inventory);
  const [book, setBook] = useState(bookings);
  const [disease, setDis] = useState('');
  const [type, setType] = useState('Test');
  const [amo, setAmo] = useState(0);

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

  return (
    <body>
      <h1 className="title">Clinic Dashboard</h1>
      <div className="clinic-container">
        <div className="clinic-column clinic-columnleft">
          <h2 className="clinic-heading">Recent Bookings</h2>

          <table className="clinic-table">
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Type</th>
              <th>Disease</th>
            </tr>
            {book.map((item, index) => {
              console.log(index);

              return (
                <tr key={index}>
                  <td className="clinic-tablerow">{item.id}</td>
                  <td className="clinic-tablerow">{item.name}</td>
                  <td className="clinic-tablerow">{item.Type}</td>
                  <td className="clinic-tablerow">{item.Disease}</td>
                </tr>
              );
            })}

          </table>
        </div>
        <div className="clinic-column clinic-columnmiddle">
          <h2 className="clinic-heading">Inventory</h2>

          <table className="clinic-table" id="inventory-table">
            <tr>
              <th>Disease</th>
              <th>Type</th>
              <th>Amount</th>
            </tr>
            {inv.map((item, index) => {
              console.log(index);
              console.log(item);
              return (
                <tr key={index}>
                  <td className="clinic-tablerow">{item.Disease}</td>
                  <td className="clinic-tablerow">{item.Type}</td>
                  <td className="clinic-tablerow">{item.Amount}</td>
                </tr>
              );
            })}

          </table>
        </div>

        <div className="clinic-column clinic-columnright">
          <h2 className="clinic-heading">Add to Inventory</h2>

          <div className="clinic-inventorybox">
            <form id="add-to-inv-form">
              <label for="disease"><b>Disease</b></label>
              <input type="text" placeholder="Enter Disease" name="disease" required></input>
              <label for="Type"><b>Type</b></label>
              <select name="type" id="type">
                <option value="Test">Test</option>
                <option value="Vaccine">Vaccine</option>
              </select>
              <label for="amount"><b>Amount</b></label>
              <input type="number" placeholder="1234" name="amount" required></input>
              <button type="button" className="clearbtn" onClick={
                () => clearInv(setInv)
              }>Clear</button>
              <button type="submit" className="addbtn" onClick={
                () => addInv(inv, setInv, { Amount: amo, Type: type, Disease: disease })
              }>Add</button>
            </form>
          </div>

        </div>

      </div>
    </body>
  );
}