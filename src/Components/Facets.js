//import { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const Facets = ({ facets, showBoxes, setShowBoxes }) => {
  //Object.keys(facets[key]).map((item) => {console.log(facets[key][item]["rdfs:label"])})
  //DO NOT SHOW CHECKBOXES ON INITIAL RENDER

  const toggle = (i) => {
    if (showBoxes === i) {
      return setShowBoxes(null);
    }
    setShowBoxes(i);
  };
  return (
    <section className="facets">
      <div className="facets-container">
        <form>
          <ul className="facets-title-container">
            {Object.keys(facets).map((key, i) => (
              <div key={i}>
                <li onClick={() => toggle(i)} value={key}>
                  {key}
                  <span className="icon">
                    {showBoxes === i ? <FaAngleUp /> : <FaAngleDown />}
                  </span>
                </li>
                <br />
                {Object.keys(facets[key]).map((item) => {
                  let boxVal = facets[key][item]["rdfs:label"];
                  return (
                    <div key={boxVal}>
                      {showBoxes === i ? (
                        <div>
                          <input type="checkbox" name={boxVal} value={boxVal} />
                          <label forhtml={boxVal}>{boxVal}</label>
                          <br />
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            ))}
          </ul>
        </form>
      </div>
    </section>
  );
};
export default Facets;
