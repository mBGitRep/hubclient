import React from "react";
import { useNavigate } from "react-router-dom";

function Logout({setUser}) {

    const navigate = useNavigate();
    
    const handleLogout = (event) =>{
      event.preventDefault();
      
        fetch("/api/sessions", {
            method:"DELETE",
          })
            .then((res) => res.json())
            .then((res) => {
              if (res.success) {
                setUser(null);
                console.log("Logout successful");
                navigate("/");
              } else {
                console.log("Error logging out");
              }
            });
    }
    return(
        <a href="" onClick={handleLogout}>Logout</a>
    )

    
  };
  
export default Logout;
