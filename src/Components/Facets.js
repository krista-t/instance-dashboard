import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { toKebab } from "../configuration/fixNames";
const Facets = ({
  facets,
  showBoxes,
  setShowBoxes,
  handleChecked,
}) => {
  const toggle = (i) => {
    setShowBoxes((prevState) => ({
      ...prevState,
      [i]: !Boolean(prevState[i]),
    }));
  };

  return (
    <section className="facets">
      <div className="facets-container">
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
