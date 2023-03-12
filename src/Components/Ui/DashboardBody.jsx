import "../../css/Dashboard.css"
import React, { useState } from 'react';

function DasboardBoady() {
    const [selectedElemnet,setSelectedElemnet] = useState(null)
    const elementsArray = new Array(20).fill(20).map((item,index) => (
            <div 
                className="dashboard__body__elements" 
                onClick={()=>extendElements(index)}
                style={{"min-height": selectedElemnet === index ? "300px" :"90px"}}
                >
                    {index} 
            </div>
        ))

    function extendElements(id){
        selectedElemnet === id ? setSelectedElemnet(null) : setSelectedElemnet(id)
    }
    return ( 
        <div className="dashboard__body">
            {elementsArray}
        </div>
     );
}

export default DasboardBoady;