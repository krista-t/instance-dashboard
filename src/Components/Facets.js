import { useState} from "react";
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

const Facets = ({facets, facetID}) => {
    console.log(facets)
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
                >{key}<span className = "icon">{!showBoxes ?<FaAngleUp/>:<FaAngleDown/>}</span> 
                
                 </li>)
            
                )}
                
                     </ul> <br/>

                     {/* TODO: dynamically display */}
               {/* {!showBoxes ? (<>
                <input type="checkbox"
                 name = "language" value = "eng" />
                  <label for= "language">eng</label><br/>
                <input type="checkbox"
                 name = "language" value = "eng" />
                  <label for= "language">eng</label><br/>
                <input type="checkbox"
                 name = "language" value = "eng" />
                  <label for= "language">eng</label><br/>

                  </>): null}  */}
                </form>
                </div>
        </section>
    )
}

export default Facets