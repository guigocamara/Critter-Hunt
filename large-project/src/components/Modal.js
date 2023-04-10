
import React, { useState } from "react";
import "./Modal.css";

export default function Modal() {
  // const address = document.getElementById("address-line-1").value;
  // const city = document.getElementById("city").value;
  // const state = document.getElementById("state").value;
  // const zipCode = document.getElementById("zip-code").value;
  // const critterName = document.getElementById("critter-name").value;


  const printValues = () => {
    console.log("address");
    console.log("city");
    console.log("state");
    console.log("zipCode");
    console.log("critterName")
  };


  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <>
      <button onClick={toggleModal} class="block text-lg pt-25 pb-25 pr-50 pl-50 mt-100 mb-0 mx-auto">
      Open
      </button>

      {modal && (
        <div class="w-screen h-screen top-0 left-0 right-0 bottom-0  place-content-center">
          <div onClick={toggleModal} class="w-screen h-screen top-0 left-0 right-0 bottom-0 fixed bg-emerald-50/50"></div>
          <div class="absolute top-1/2  left-1/2 bg-green-900/50">
            <h2>Address Information</h2>
            <br></br>
            <input id="address-line-1" placeholder="Address Line 1"></input>
            <br></br>
            <br></br>
            <input id="city" placeholder="City"></input>
            <br></br>
            <br></br>       
            <input id="state" placeholder="State"></input>   
            <br></br>
            <br></br>
            <input id="zip-code" placeholder="Zip Code"></input>
            <br></br>
            <br></br>
            <input id="critter-name" placeholder="Critter Name"></input>
            <br></br>
            <br></br>
            <button class="bottom-auto" onClick={() => {toggleModal(); printValues();}}>ENTER</button>
          </div>
        </div>
      )}
    </>
  );

  
}