import React from 'react'
import {  useRef} from 'react';
import './css/addMenu.css';

function AddMenuItems() {
    const nameRef = useRef();
    const descpRef = useRef();
    const priceRef = useRef();

    const addItem=  async(itemName,description,pricePerItem) => {
        const response = await fetch("/api/menus" , {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({itemName,description,pricePerItem}),
        });
        const result = await response.json()
    };

	return (
        <div className='page'>
        <h1 className= "add-menu-item-title"> Add a menu item </h1>
            <form  className="form-container" 
            onSubmit={(event) => {
                event.preventDefault();
                addItem(nameRef.current.value, descpRef.current.value, priceRef.current.value)
            }}> 
            <div className="form-group">
             <label htmlFor="name">Name:</label>
              <input ref={nameRef} type="text" id="name" />
               </div>
             <div className="form-group">
             <label htmlFor="name">Description:</label>
             <input ref={descpRef} type="text" id="name" />
               </div> 
              <div className="form-group">
               <label htmlFor="price">Price:</label>
               <input ref={priceRef} type="text" id="name" />
                </div>
                 <button type="submit" className="submit-add-button">Submit</button> 
                 </form>
        </div>
    );
}
export default AddMenuItems;
