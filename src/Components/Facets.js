import { useState} from "react";
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

const Facets = ({facets}) => {
    
    //DO NOT SHOW CHECKBOXES ON INITIAL RENDER
    const [showBoxes, setShowBoxes]= useState(false);
    const toggle = i => {
        if (showBoxes === i) {
          return setShowBoxes(null);
        }
        setShowBoxes(i);
      };
    return (
        <section className = "facets">
            <div className="facets-container">
                <form>
                <ul className="facets-title-container"> 
                {Object.keys(facets).map((key,i) => 
                (<div>
                  <li onClick = {()=> toggle(i)} key = {i} value = {key} 
                  >{key}<span className = "icon">{ showBoxes === i ?<FaAngleUp/>:<FaAngleDown/>}</span>
                  </li><br/>
                {Object.keys(facets[key]).map((item)=>
                        {let boxVal = facets[key][item]["rdfs:label"]
                         return(
                           <div>           
                 {showBoxes === i ? 
                 (<> <input type="checkbox" 
                 name = {boxVal} value = {boxVal} />
                  <label forhtml= {boxVal}>{boxVal}</label><br/>
                  </>)
                  : null}  
                    </div>)} 
                    )}   
                  </div>) 
                 )}
               </ul>
               </form>
           </div>
        </section>
    )
}
export default Facets
