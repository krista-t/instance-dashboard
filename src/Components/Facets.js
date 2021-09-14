import { useState} from "react";
//import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

const Facets = () => {
    //DO NOT SHOW CHECKBOXES ON INITIAL RENDER
    const [showBoxes, setShowBoxes]= useState(true);
//const toggle =()=> setShowBoxes(!showBoxes);
    return (
        <section className = "facets">
            <div className="facets-container">
                <form>
                <div className="facets-title-container">
                {/* TODO:conditional redner */}
                    </div> <br/>
               {/* TODO:conditional render */}

                </form>
                </div>
        </section>
    )
}

export default Facets