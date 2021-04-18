import { useState } from 'react'
import React from 'react';

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
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="localOutbreak.html">Local Outbreaks</a></li>
        <li styles="float:right"><a class="auth" href="loginPage.html">Login</a></li>
        <li styles="float:right"><a class="auth" href="signUpPage.html">Sign Up</a></li>
      </ul>
      <h1 class="title">Clinic Dashboard</h1>
      <div class="clinic-container">
        <div class="clinic-column clinic-columnleft">
          <h2 class="clinic-heading">Recent Bookings</h2>

          <table class="clinic-table">
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
                  <td class="clinic-tablerow">{item.id}</td>
                  <td class="clinic-tablerow">{item.name}</td>
                  <td class="clinic-tablerow">{item.Type}</td>
                  <td class="clinic-tablerow">{item.Disease}</td>
                </tr>
              );
            })}

          </table>
        </div>
        <div class="clinic-column clinic-columnmiddle">
          <h2 class="clinic-heading">Inventory</h2>

          <table class="clinic-table" id="inventory-table">
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
                  <td class="clinic-tablerow">{item.Disease}</td>
                  <td class="clinic-tablerow">{item.Type}</td>
                  <td class="clinic-tablerow">{item.Amount}</td>
                </tr>
              );
            })}

          </table>
        </div>

        <div class="clinic-column clinic-columnright">
          <h2 class="clinic-heading">Add to Inventory</h2>

          <div class="clinic-inventorybox">
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
              <button type="button" class="clearbtn" onClick={
                () => clearInv(setInv)
              }>Clear</button>
              <button type="submit" class="addbtn" onClick={
                () => addInv(inv, setInv, { Amount: amo, Type: type, Disease: disease })
              }>Add</button>
            </form>
          </div>

        </div>

      </div>
    </body>
  );
}