import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { toKebab } from "../configuration/fixNames";
const Facets = ({
  facets,
  showBoxes,
  setShowBoxes,
  handleChecked,
  setFilter,
}) => {
  const toggle = (i) => {
    setShowBoxes((prevState) => ({
      ...prevState,
      [i]: !Boolean(prevState[i]),
    }));
  };
  //reset filters
  const resetFilters = () => {
    //uncheckRef.current.checked = false;
    setFilter([]);
    setShowBoxes({});
  };
  return (
    <section className="facets">
      <div className="facets-container">
        {Object.keys(facets).length !== 0 ? (
          <p className="filters">
            filter by:{" "}
            <span>
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
                <div key={i}>
                  <li
                    onClick={() => toggle(i, key)}
                    value={toKebab(key)}
                  >
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
                  {Object.keys(facets[key]).map((item) => {
                    let boxVal =
                      facets[key][item]["rdfs:label"];
                    return (
                      <div key={boxVal}>
                        {showBoxes[i] ? (
                          <div>
                            <input
                              type="checkbox"
                              name={boxVal}
                              value={boxVal}
                              onChange={(e) =>
                                handleChecked(e, i)
                              }
                            />
                            <label forhtml={boxVal}>
                              {boxVal}
                            </label>
                            <br />
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
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
