import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GlobalContext = createContext(null);

export const GlobalProvider = ({ children }) => {
  // useState for all variables
  const authFromSession = sessionStorage.getItem("auth") || false
  const isadminFromSession = sessionStorage.getItem("isadmin") || false
  const isworkerFromSession = sessionStorage.getItem("isworker") || false
  const iscustomerFromSession = sessionStorage.getItem("iscustomer") || false
  const userNameFromSession = sessionStorage.getItem("userName") || ""

  const [auth, setAuth] = useState(authFromSession);
  const [isworker, setIsworker] = useState(isworkerFromSession);
  const [ isadmin, setIsadmin] = useState(isadminFromSession);
  const [iscustomer, setIscustomer] = useState(iscustomerFromSession);
  const [userName, setUserName] = useState(userNameFromSession);

   const [user,setUser] = useState("");
   const [menus, setMenus] = useState([]);

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
    setUser(result.user);
	setUserName(result.user.name);
    sessionStorage.setItem("userName",result.user.name)
    sessionStorage.setItem("auth",auth)

}

    if(result.user.admin){
        setIsadmin(true);
        sessionStorage.setItem("isadmin",isadmin)
        navigate('/dashboard')
    }
    else if(result.user.restaurantWorker){
      setIsworker(true);
      sessionStorage.setItem("isworker",isworker)

      navigate('')
    }
    else if(!result.user.admin && !result.user.restaurantWorker){
        setIscustomer(true);
        sessionStorage.setItem("iscustomer",iscustomer)
        navigate("/myaccount", { state: { id: result.user._id } });
      }	
	}
  
 
  const logout = async () => {
    const response = await fetch("/api/login", {
      method: "delete",
    });
    const result = await response.json();
    setAuth(false);
	sessionStorage.clear();
    
  };
 
  const fetchMenuItems = async () => {
    const response = await fetch("/api/menus");
    const data = await response.json();
    setMenus(data);
  };
  

  useEffect(() => {

  fetchMenuItems();
}, []);



  return (
    <GlobalContext.Provider
      value={{
        auth,
        submitLogin,
        logout,
        isadmin,
        isworker,
        iscustomer,
        user,
        menus,
		userName

      }}
    >
      {children}
    </GlobalContext.Provider>
  );

};

export default GlobalContext;
