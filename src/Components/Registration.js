import React, { useState, useEffect } from "react";
import { firebase, db } from "./firebase";
import {
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from 'react-router';


const Registration = () => {

  const navigate = useNavigate();

  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  const [currentUser, setcurrentUser] = useState({});
  const [email, setEmail] = useState({});
  const [password, setPassword] = useState({});
  const [final, setfinal] = useState(null);

  const handleClick = () => {
    if (name === "" || email === "" || password === "" || mobile === "")
      return (
        alert("Please Enter All Fields")
      )
    alert("Registration Successfully!!!!!")
    navigate("/");
  }




  const updateProfile = (e) => {
    e.preventDefault()
    console.log("formdata", name, email, password, mobile, currentUser.uid,)
    db.collection("UserRegistration").doc()
      .set({ name: name, email: email, password: password, mobile: mobile })
      .then((docRef) => {
        console.log("Added successfully!")
        getProfileData()
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });

  }



  function getProfileData() {
    db.collection("users")
      .doc(currentUser.uid)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.data()) {
          console.log("user details:", querySnapshot.data())
          localStorage.set("user_details", JSON.stringify(querySnapshot.data()))
        }
      });
  }



  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setcurrentUser(user);

  }, []);

  useEffect(() => {
    getProfileData()
  }, [currentUser]);



  return (
    <div style={{ backgroudColor: "rgb(26,32,44)" }}>
      <center>
        <div style={{ width: "600px", height: "auto", border: "1px solid gray", borderRadius: "10px", padding: "20px", marginTop: "100px" }}>
          <form onSubmit={updateProfile}>
            <div id="recaptcha-container"></div>
            <h1 style={{ textAlign: "center" }}>Registration</h1>
            <FormLabel htmlFor='first-name'>Enter Full Name</FormLabel>
            <Input type="text" name={name} onChange={(e) => setName(e.target.value)} required placeholder="Enter Full Name" />

            <FormLabel htmlFor='first-name' style={{ marginTop: "20px" }}>Enter Email</FormLabel>
            <Input type="email" name={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Enter Number" />

            <FormLabel htmlFor='first-name' style={{ marginTop: "20px" }}>Password</FormLabel>
            <Input type="password" name={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Enter Number" />

            <FormLabel htmlFor='first-name' style={{ marginTop: "20px" }}>Enter Number</FormLabel>
            <Input type="number" name={mobile} onChange={(e) => setMobile(e.target.value)} required placeholder="Enter Number" />

            <Button colorScheme='teal' type="submit" style={{ marginTop: "20px", marginLeft: "20px" }} onClick={handleClick} >Submit</Button>
          </form>
        </div>
      </center>
    </div>
  )

}

export default Registration