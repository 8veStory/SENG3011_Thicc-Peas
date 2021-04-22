import { useState } from 'react'
import React from 'react';

import "./ClinicBookingPage.css";
import Checkbox from '@material-ui/core/Checkbox';
import { v4 as uuid } from 'uuid';

// TODO: Get rid of these inventory and bookings arrays. Instead, get this data
// by making an API request to the back-end.

function select_count(book){
    var count = 0;
    var i;
    for(i = 0;i < book.length;i++){
        if(book[i].remove === true){
            count++;
        }
    }
    return count;
}
var bookings = [
    {
        id: 1,
        name: 'John Doe',
        Type: 'Vaccine',
        Disease: 'Covid',
        remove: false
    },
    {
        id: 2,
        name: 'John Doe',
        Type: 'Vaccine',
        Disease: 'Covid',
        remove: false
    },
    {
        id: 3,
        name: 'John Doe',
        Type: 'Vaccine',
        Disease: 'Covid',
        remove: false
    },
    {
        id: 4,
        name: 'John Doe',
        Type: 'Vaccine',
        Disease: 'Covid',
        remove: false
    },
    {
        id: 5,
        name: 'John Doe',
        Type: 'Vaccine',
        Disease: 'Covid',
        remove: false
    },
    {
        id: 6,
        name: 'John Doe',
        Type: 'Vaccine',
        Disease: 'Covid',
        remove: false
    },
    {
        id: 7,
        name: 'John Doe',
        Type: 'Vaccine',
        Disease: 'Covid',
        remove: false
    },
    {
        id: 8,
        name: 'John Doe',
        Type: 'Vaccine',
        Disease: 'Covid',
        remove: false
    }
];
function ClearButtion(props) {
    var book = props.book;
    var setBook = props.setBook;
    function clearBook(){
        var i = 0;
        var count = 0;
        var newArr = [];
        for(i = 0;i < book.length;i++){
            if(book[i].remove !== true){
                newArr[count] = book[i];
                count++;
            }
        }
        setBook(newArr);
    }

    
    if(select_count(book) !== 0){
        return(
            <div>
            <button type="button" className="clearbtn" onClick={
                clearBook
              }>Clear</button>
            </div>
        );
    }else{
        return null;
    }
}
function TenFunction(props) {
    
    
  const ten_count = props.ten_count;
  const setten_count = props.setten_count;
  const leng = props.leng;

    
  function decreateCount(){
        setten_count(ten_count - 1);
    }
    function incrementCount(){
        setten_count(ten_count + 1);
    }
  if(ten_count === 0 && leng <= 10){
      return(null);
  }
  if (ten_count === 0) {
    return (
        <div>
        <button type="button" className="clearbtn" onClick={
            incrementCount
        }>next ten</button>
        </div>
    );
  }else if((leng - ten_count * 10) > 10 && ten_count > 0){
      return (
          <div>
        <button type="button" className="clearbtn" onClick={incrementCount}>next ten</button>
        <button type="button" className="clearbtn" onClick={
            decreateCount
        }>last ten</button>
        </div>
    );
  }else{
     return (
         <div>
        <button type="button" className="clearbtn" onClick={
            decreateCount
        }>last ten</button>
        </div>
    ); 
  }
  
}
function SubmitButton(props){
    var book = props.book;
    var amo = props.amo;
    var type = props.type;
    var disease = props.disease;
    var setBook = props.setBook;

    function HandleSubmit(e){
      //e.preventDefault();
 
        
        setBook([...book,{
          id: book.length + 1,
            name: amo,
            Type: type,
            Disease: disease,
            remove: false
        }]);
    }
    return(
        <div>
            <button  className="addbtn" onClick={HandleSubmit}>Add</button>
        </div>
    );
}
export default function ClinicBooking(props) {
  // React state

  const [book, setBook] = useState(bookings);
  const [disease, setDis] = useState('');
  const [type, setType] = useState('Test');
  const [amo, setAmo] = useState(0);
    const [ten_count, setten_count] = useState(0);
    const handleChange = (event,item,index) => {

        let newArr = [...book];
        newArr[index].remove = event.target.checked;
        setBook(newArr);
    };
    
    
  return (
    <div>
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="localOutbreak.html">Local Outbreaks</a></li>
        <li styles="float:right"><a className="auth" href="loginPage.html">Login</a></li>
        <li styles="float:right"><a className="auth" href="signUpPage.html">Sign Up</a></li>
      </ul>
      <h1 className="title">Clinic Dashboard</h1>
      <div className="clinic-container">
        <div className="clinic-column clinic-columnleft">
          <h2 className="clinic-heading">Recent Bookings</h2>

          <table className="clinic-table">
            <tbody key={uuid()}>
                <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Type</th>
                <th>Disease</th>
                </tr>
            </tbody>
            {book.map((item, index) => {
                console.log(book);
                
                console.log(index);
                var uid = uuid();
                console.log(uid);
                
              
                if(index >= (ten_count * 10) && index < (10 + ten_count * 10)){

                    
                    return (
                        <tbody key={uid}>
                            <tr >
                            <td className="clinic-tablerow">{item.id}</td>
                            <td className="clinic-tablerow">{item.name}</td>
                            <td className="clinic-tablerow">{item.Type}</td>
                            <td className="clinic-tablerow">{item.Disease}</td>
                            <td className="clinic-tablerow">
                                <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} checked={item.remove} onChange={(evt) => handleChange(evt, item,index)}  />
                            </td>
                            
                            </tr>
                        </tbody>
                    );
                }else{
                    
                    return(null);
                }
              
            })}

          </table>


        <TenFunction ten_count={ten_count} setten_count={setten_count} leng={bookings.length}/>
                
   
         
          
        </div>
        

        <div className="clinic-column clinic-columnright">
          <h2 className="clinic-heading">Add to Booking</h2>

          <div className="clinic-inventorybox">
            <form id="add-to-inv-form">
              <label htmlFor="disease"><b>Disease</b></label>
              <input type="text" placeholder="Enter Disease" name="disease" onChange={e => setDis(e.target.value)} required></input>
              <label htmlFor="Type"><b>Type</b></label>
              <select name="type" id="type" onChange={e => setType(e.target.value)}>
                <option value="Test">Test</option>
                <option value="Vaccine">Vaccine</option>
              </select>
              <label htmlFor="amount"><b>Name</b></label>
              <input type="text"  name="amount" onChange={e => setAmo(e.target.value)} required></input>
              <ClearButtion book={book} setBook={setBook}/>
              
              <SubmitButton book={book} type={type} setBook={setBook} amo={amo} disease={disease}/>
              <h5> {select_count(book)} bookings selected</h5>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}