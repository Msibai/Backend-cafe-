import React from 'react'
import { useState, useRef} from 'react';
import './css/addMenu.css';

function AddMenuItems() {
    const nameRef = useRef();
    const descpRef = useRef();
    const priceRef = useRef();
    const [err, setErr] = useState("");

    const addItem=  async(itemName,description,pricePerItem) => {
       try{
        const response = await fetch("/api/menus" , {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({itemName,description,pricePerItem}),
        });
        const result = await response.json()

        if( result.error ){
            setErr(result.error)
        }
        else {
            setErr(result.message)
            console.log(err)
        }

    } catch (error){
        console.log(result)
        
    }
}

	return (
        <div className='page'>
        <h1 className= "add-menu-item-title"> Add a menu item </h1>
        {(err != "") ? ( <div className="error"> <h2>{err}</h2></div>) : ""}
            <form  className="form-container" 
            onSubmit={(event) => {
                event.preventDefault();
                addItem(nameRef.current.value, descpRef.current.value, priceRef.current.value)
            } }> 
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
                 <button type="submit" className="submit-add-button" >Submit</button> 
                 </form>

                 
        </div>
    );
}
export default AddMenuItems;

