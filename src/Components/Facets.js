import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { toKebab } from "../configuration/fixNames";
const Facets = ({
  facets,
  showBoxes,
  setShowBoxes,
  handleChecked,
  setFilter,
}) => {
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
    </section>
  );
};
export default Facets;
