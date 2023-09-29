import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../Redux/authSlice";

const OAuth = () => {
    const navigate=useNavigate()
    const dispatch = useDispatch();
    const oAuthSubmit = (decode) => {
        
        const { name, email } = decode;
    
        axios
          .post(
            "http://localhost:5000/api/oauthsignup",
            { name, email },
            {
              withCredentials: true,
            }
          )
          .then((response) => {
            console.log('response:::',response.data);
            dispatch(login(response.data));
    
            localStorage.setItem("userData", JSON.stringify(response.data));
    
            
            navigate("/");
          })
          .catch((error) => {
            console.error("Error registering user", error);
          });
      };
  return (
    <div>
      <div className="d-flex justify-content-center mt-4">
        <GoogleOAuthProvider clientId="490750818881-tco452omen7tnvhk48o7371vhev4071b.apps.googleusercontent.com">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              var decoded = jwt_decode(credentialResponse.credential);
              oAuthSubmit(decoded);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </GoogleOAuthProvider>
      </div>
    </div>
  );
};

export default OAuth;
