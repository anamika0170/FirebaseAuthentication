import React from 'react'
import {
    Button,
    Link
} from '@chakra-ui/react';

const Home = () => {

    return(
        <div>
            <Link href="/" style={{textDecoration:"none"}}><Button colorScheme='teal' style={{ marginLeft:"90%", marginTop:"50px",textDecoration:"none"}}>Logout</Button></Link>
        <center>
            <div style={{ width: "600px", height: "auto", border: "1px solid gray", borderRadius: "10px", padding: "20px", marginTop: "200px" }}>
        <h1 style={{fontSize:"100px"}}>Welcome User</h1>
        </div>
        </center>
        </div>
        
    )
}

export default Home