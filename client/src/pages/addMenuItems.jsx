import React from 'react'
import {  useRef} from 'react';

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
        <>
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
             <input ref={descpRef} type="text" id="name" />
               </div> 
              <div className="form-group">
               <label htmlFor="price">Price:</label>
               <input ref={priceRef} type="text" id="name" />
                </div>
                 <button type="submit" className="submit-edit-button">Submit</button> 
                 </form>
        </>
    );
}
export default AddMenuItems;
