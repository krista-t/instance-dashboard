import { useState} from "react";
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

const Facets = ({facets, facetID}) => {
    
    //DO NOT SHOW CHECKBOXES ON INITIAL RENDER
    const [showBoxes, setShowBoxes]= useState(true);
const toggle =()=> setShowBoxes(!showBoxes);
    return (
        <section className = "facets">
            <div className="facets-container">
                <form>
                <ul className="facets-title-container"> 
                {Object.keys(facets).map((key,i) => 
                  (<li key={i} value={key}  onClick={()=> toggle(!showBoxes)}
                   >{key}<span className = "icon">{!showBoxes ?<FaAngleUp/>:<FaAngleDown/>}</span> <br/>
  {/* TODO: consditionally render */}
                    {Object.keys(facets[key]).map((item,i)=>
                        {let boxVal = facets[key][item]["rdfs:label"]
                        console.log(boxVal)
                         return(
                           <div>
                 {!showBoxes ? (<>
                <input type="checkbox" key ={i}
                 name = {boxVal} value = {boxVal} />
                  <label for= {boxVal}>{boxVal}</label><br/>
                  </>): null} 
                          </div>)} 
                    )}   
                  </li>) 
                 )}
                </ul>
                </form>
          </div>
        </section>
    )
}

export default Facets