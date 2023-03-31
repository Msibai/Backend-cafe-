import "./sign-in.css"
import  background from"./images/coffeee.jpg"




const SignUp = () => {

 

return(
    <div className="background-image" style={{backgroundImage: `url(${background})`}}>
        <div className ="create-account-container">
        
        <h1>Back End Café</h1>
      <form className="create-account-form">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" placeholder="Enter name" />
        <label htmlFor="phone-number">Phone number</label>
        <input type="text" id="phone-number" name="phone-number" placeholder="Enter phone number" />
        <label htmlFor="email">Email</label>
        <input type="text" id="email" name="email" placeholder="Enter email" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Enter password" />
        <button type="submit" className="create-create-account">Create Account</button>
      </form>
     
        </div>
        </div>
    )

}

export default SignUp;