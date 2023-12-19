import React from "react";
import Aside from './Aside';
import Nav from './Nav';
import Main from './Main';

const Master = ({AsideData}) => {
    return (
        <div className="App layout overflow-hidden">
            <Nav />
           <Aside  AsideData = {AsideData}/>   
           <Main />   
           
        </div>  
    );
};

export default Master;