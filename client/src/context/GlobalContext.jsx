import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GlobalContext = createContext(null);

export const GlobalProvider = ({ children }) => {
  // useState for all variables
  const [auth, setAuth] = useState(false);
  const [isadmin, setIsadmin] = useState(false);
  const [iscustomer, setIscustomer] = useState(false);
  const [user,setUser] = useState("");
  const navigate = useNavigate();

  

  const submitLogin = async (email, password) => {

    const response = await fetch("/api/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const result= await response.json();
    if(result){
    setAuth(true);
    setUser(result.user.name);
}

    if((result.user.admin) || (result.user.restaurantWorker)){
        setIsadmin(true);
        navigate('/dashboard')
    }
    else if(!result.user.admin && !result.user.restaurantWorker){
        setIscustomer(true);
        navigate("/myaccount", { state: { id: result.user._id } });
      }	
	}
  
 
  const logout = async () => {
    const response = await fetch("/api/login", {
      method: "delete",
    });
    const result = await response.json();
    setAuth(false);
  };


  return (
    <GlobalContext.Provider
      value={{
        auth,
        submitLogin,
        logout,
        isadmin,
        iscustomer,
        user

      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
