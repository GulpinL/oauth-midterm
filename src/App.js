//import logo from './logo.svg';
import { useState, useEffect } from 'react';
import jwt_decode from "jwt-decode";
import './App.css';

function App() {
  const [user, setUser] = useState({});

  function handleCallbackResponse(response){
    console.log("Encoded JWT ID token: "+response.credential);
    var userObject =jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }

  function handleSignOut(){
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }

  useEffect(()=>{
      /*global google*/
      google.accounts.id.initialize({
        client_id:"166244307267-5nqmrkvug5isrni7pv2pietceivt1tsc.apps.googleusercontent.com",
        callback: handleCallbackResponse
      });

      google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        {theme: "outline",size :"large"}
      );

      google.accounts.id.prompt();
  },[]);
  //If we have no user: sign in button
  //If we have a user: show the log out

  return (
    <div className="App">
      <div id ="signInDiv"></div>
      {
        Object.keys(user).length !=0 && 
        <button onClick={(e)=>handleSignOut(e)}>Sign out</button>
      }
      
      { user &&
      <div>
        <img src={user.picture}></img>
        <h3>{user.name}</h3>
      </div>
      }
    </div>
  );
}

export default App;
