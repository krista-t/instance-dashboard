import { useState, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";

const Template = ({ templates, setFacetID }) => {
  //TODO: RESET ALL CHECK BOXES ONHANDLE CHAMGE USE REF

  const [templateVal, setTemplateVal] = useState("");
  useEffect(() => {
    setTemplateVal(Object.values(templates)[0]);
  }, [templates]);

  const [show, setShow] = useState(false);

  const handleChange = (e, key) => {
    setTemplateVal(e.target.textContent);
    setFacetID(key);
    setShow(!show);
  };

  const handleToggle = (e) => {
    console.log(e.target.focus);
    setShow({ show: !show });
  };
  return (
    <section className="template-select">
      <div className="value-container" onClick={(e) => handleToggle(e)}>
        {templateVal}
        <span>
          <FaAngleDown />
        </span>
      </div>
      <div className="list-container">
        {Object.entries(templates).map(([key, value]) => (
          <li
            hidden={!show}
            key={key}
            value={value}
            onClick={(e) => handleChange(e, key)}
          >
            {value}
          </li>
        ))}
      </div>
    </section>
  );
};

export default Template;
