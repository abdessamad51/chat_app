import React from "react";
import Nav from './Nav/Nav.js';
import Aside from './Aside/Aside.js';
import Main from './Main/Main.js';

const Master = ({page}) => {
    return (
        <>
            <Nav /> 
            <Aside  content = {page}/>     
            <Main />      
        </>  
    );
};

export default Master;