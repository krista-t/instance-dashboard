import { useState} from "react";
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

const Facets = () => {
    //DO NOT SHOW CHECKBOXES ON INITIAL RENDER
    const [showBoxes, setShowBoxes]= useState(true);
const toggle =()=> setShowBoxes(!showBoxes);
    return (
        <section className = "facets">
            <div className="facets-container">
                <form>
                <div className="facets-title-container">
                {/* TODO:conditional redner */}
                <p 
                 onClick={()=> toggle(!showBoxes)}
                >title languages <span className = "icon">{!showBoxes ?<FaAngleUp/>:<FaAngleDown/>}</span> 
                </p> 
                    </div> <br/>
               {/* TODO:conditional render */}
               {!showBoxes ? (<>
                <input type="checkbox"
                 name = "language" value = "eng" />
                  <label for= "language">eng</label><br/>
                <input type="checkbox"
                 name = "language" value = "eng" />
                  <label for= "language">eng</label><br/>
                <input type="checkbox"
                 name = "language" value = "eng" />
                  <label for= "language">eng</label><br/>

                  </>): null} 
                </form>
                </div>
        </section>
    )
}

export default Facets