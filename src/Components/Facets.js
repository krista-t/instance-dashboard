import { Fragment } from "react";
import { useState, useEffect } from "react";
import {
  FaAngleDown,
  FaAngleUp,
  FaFilter,
} from "react-icons/fa";
import { toKebab } from "../configuration/fixNames";
const Facets = ({
  facets,
  showBoxes,
  setShowBoxes,
  handleChecked,
  setFilter,
}) => {
  //mobile view sidebar
  const [mobile, setMobile] = useState(false);
  // show/hide facet list in mobile
  const [showFacets, setShowFacets] = useState(false);
  useEffect(() => {
    if (window.innerWidth < 800) {
      setMobile(true);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 800) {
        setMobile(true);
        console.log("mobile");
      } else {
        setMobile(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //open accordion
  function toggle(i) {
    setShowBoxes((prevState) => ({
      ...prevState,
      [i]: !Boolean(prevState[i]),
    }));
  }
  //reset filters
  const resetFilters = () => {
    setFilter({});
    setShowBoxes({});
  };
  return (
    <section className="facets">
      {mobile && (
        <button
          className="mobile-btn"
          onClick={() => setShowFacets(true)}>
          <FaFilter
            style={{
              fontSize: "1.2rem",
            }}></FaFilter>
          <span>FILTER</span>
        </button>
      )}
      {!mobile && (
        <div className="facets-container">
          {Object.keys(facets).length !== 0 ? (
            <p className="filters">
              filter by:{" "}
              <span className="reset">
                <button onClick={() => resetFilters()}>
                  {" "}
                  reset filters
                </button>
              </span>
            </p>
          ) : null}

          <form>
            <ul className="facets-title-container">
              {Object.keys(facets).map((key, i) => {
                return (
                  <div key={i} id={key}>
                    <li
                      onClick={() => toggle(i)}
                      value={toKebab(key)}>
                      {toKebab(key)}
                      <span className="icon">
                        {showBoxes[i] ? (
                          <FaAngleUp />
                        ) : (
                          <FaAngleDown />
                        )}
                      </span>
                    </li>
                    <br />
                    {Object.keys(facets[key]).map(
                      (termID) => {
                        let termLabel =
                          facets[key][termID]["rdfs:label"];
                        return (
                          <div key={termLabel} id={termID}>
                            {showBoxes[i] ? (
                              <div>
                                <input
                                  type="checkbox"
                                  name={termLabel}
                                  value={termLabel}
                                  onChange={(e) => {
                                    handleChecked(e);
                                  }}
                                />
                                <label forhtml={termLabel}>
                                  {termLabel}
                                </label>
                                <br />
                              </div>
                            ) : null}
                          </div>
                        );
                      }
                    )}
                  </div>
                );
              })}
            </ul>
          </form>
        </div>
      )}
    </section>
  );
};
export default Facets;
