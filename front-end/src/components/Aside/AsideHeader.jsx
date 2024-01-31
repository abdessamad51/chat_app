import React from "react";

const AsideHeader = ({content}) => {
    return (
       <div className="mb-8">  
         <h2 className="fw-bold m-0">{content}</h2>
      </div>
    );
}

export default AsideHeader;