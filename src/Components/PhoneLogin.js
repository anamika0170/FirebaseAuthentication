import React, { useState, useEffect } from "react";
import { auth, firebase, db } from "./firebase";
import {
  FormLabel,
  Input,
  Button,
  Link,
} from "@chakra-ui/react";

import { useNavigate } from 'react-router';

const PhoneLogin = () => {
  const navigate = useNavigate();

  const [mobile, setMobile] = useState("");
  const [otp, setOTP] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [final, setfinal] = useState(null);
  const [currentUser, setcurrentUser] = useState('')

  const handleClick = () => {
    setIsDisabled(!isDisabled)
  }

  const onSignInSubmit = (e) => {
    e.preventDefault();

    if (mobile === "" || mobile.length < 10) return (
      alert("Please Enter valid Number")
    )
    let verify = new firebase.auth.RecaptchaVerifier("recaptcha-container");
    auth
      .signInWithPhoneNumber(`+91${mobile}`, verify)
      .then((result) => {
        setfinal(result);
        alert("OTP sended!")
      })
    db.collection("UsersLoginData").doc(currentUser.uid)
      .set({ mobile: mobile })
      .then((docRef) => {
        console.log("Added successfully!")
        getData()
      })
      .catch((err) => {
        alert(err);
        alert("Please Enter Vaild Number ")
      });
  };

  const onSubmitOtp = (e) => {
    e.preventDefault();
    if (otp === "" || otp.length < 6) return;
    final
      .confirm(otp)
      .then((result) => {
        console.log("otp confirm!", result.user)
        localStorage.setItem("user", JSON.stringify(result.user))
        alert("Authentication Successfully!!!")
        navigate('/home')
      })
      .catch((err) => {
        alert("Please Enter vaild OTP");
      });
  };

  function getData() {
    db.collection("userLogin")
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
    getData()
  });


  return (
    <center>
      <div style={{ width: "600px", height: "auto", border: "1px solid gray", borderRadius: "10px", padding: "20px", marginTop: "150px" }}>
        <h1 style={{ textAlign: "center" }}>Login</h1>

        <form onSubmit={onSignInSubmit}>
          <div id="recaptcha-container"></div>
          <FormLabel htmlFor='first-name'>Enter NUmber</FormLabel>
          <Input type="number" name={mobile} onChange={(e) => setMobile(e.target.value)} required placeholder="Enter Number" />

          <Button colorScheme='teal' type="submit" style={{ marginTop: "20px" }} onClick={handleClick}>Request OTP</Button>
          <Link href="/registration" style={{ textDecoration: "none" }}><Button colorScheme='teal' style={{ marginTop: "20px", marginLeft: "20px", textDecoration: "none" }} >Registration</Button></Link>
        </form>

        <form onSubmit={onSubmitOtp}>
          <FormLabel htmlFor='first-name'>Enter OTP</FormLabel>
          <Input id="otp" placeholder='Enter OTP' type="number" name={otp} onChange={(e) => setOTP(e.target.value)} required disabled={isDisabled} />
          <Button colorScheme='teal' type="submit" style={{ marginTop: "20px" }} disabled={isDisabled} >Submit</Button>
        </form>
      </div>
    </center>
  )

}

export default PhoneLogin