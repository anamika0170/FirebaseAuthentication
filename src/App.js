import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PhoneLogin from './Components/PhoneLogin';
import Registration from './Components/Registration';
import { ChakraProvider } from '@chakra-ui/react';
import Home from './Components/Home';

function App() {
  return (
    <div className="App">
     <ChakraProvider>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<PhoneLogin/>}>
        </Route>
        <Route path='/registration' element={ <Registration/>} />
        <Route path='/home' element={ <Home/>} />
      </Routes>
    </BrowserRouter>
   
     </ChakraProvider>
    </div>
  );
}

export default App;
