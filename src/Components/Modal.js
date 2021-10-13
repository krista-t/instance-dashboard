import ReactDom from "react-dom";
import { BiXCircle } from "react-icons/bi";
import {
  getOpenViewURL,
  getCedarURL,
} from "../configuration/cedarUtils";
import {
  defaultKeywords,
  isPrimitive,
  iterateObject,
} from "../configuration/iterateObj";
const Modal = ({
  open,
  children,
  onClose,
  instance,
  isSelected,
}) => {
  if (!open) return null;
  let detailedList = [];

  if (isSelected != null) {
    instance.map((instance) => delete instance["@context"]);
    isPrimitive();
    instance.map((i) => {
      let detailData = iterateObject(
        instance[isSelected],
        defaultKeywords
      );
      detailedList.push(detailData);

      return detailData;
    });
  }
  let uri = detailedList[isSelected]["@id"];
  let openViewLink = getOpenViewURL(uri);
  let cedarLink = getCedarURL(uri);

  return ReactDom.createPortal(
    <>
      <div className="modal">
        <div className="inner-modal">
          <p className="close" onClick={onClose}>
            <BiXCircle />
          </p>
          <div className="content-wrapper">
            <div className="modal-data">
              <p>
                TITLE:{" "}
                <span>
                  {detailedList[isSelected]["title"]}{" "}
                </span>
              </p>
              <p>
                AUTHORS:{" "}
                <span>
                  {
                    detailedList[isSelected][
                      "pav:createdBy"
                    ]
                  }
                </span>
              </p>
              <p>
                DESCRIPTION:&nbsp;
                <span>
                  {detailedList[isSelected]["description"]}
                </span>
              </p>
              <p>
                CREATED ON:{" "}
                <span>
                  {
                    detailedList[isSelected][
                      "pav:createdOn"
                    ]
                  }
                </span>
              </p>
              <p>
                LAST UPDATED ON:{" "}
                <span>
                  {
                    detailedList[isSelected][
                      "pav:lastUpdatedOn"
                    ]
                  }
                </span>
              </p>
              {detailedList[isSelected]["subject"] ? (
                <p>
                  SUBJECT:{" "}
                  <span>
                    {detailedList[isSelected]["subject"] +
                      " "}
                  </span>
                </p>
              ) : null}

              {detailedList[isSelected]["variable"] ? (
                <p>
                  VARIABLE:{" "}
                  <span>
                    {detailedList[isSelected]["variable"] +
                      " "}
                  </span>
                </p>
              ) : null}
              {detailedList[isSelected]["variable"] ? (
                <p>
                  VARIABLE:{" "}
                  <span>
                    {detailedList[isSelected]["variable"] +
                      " "}
                  </span>
                </p>
              ) : null}
              {detailedList[isSelected]["otherVariable"] ? (
                <p>
                  OTHER VARIABLE:{" "}
                  <span>
                    {detailedList[isSelected]["variable"] +
                      " "}
                  </span>
                </p>
              ) : null}
              {detailedList[isSelected][
                "externalCondition"
              ] ? (
                <p>
                  EXTERNAL CONDITION:{" "}
                  <span>
                    {detailedList[isSelected][
                      "externalCondition"
                    ] + " "}
                  </span>
                </p>
              ) : null}
              {detailedList[isSelected]["activity"] ? (
                <p>
                  ACTIVITY:{" "}
                  <span>
                    {detailedList[isSelected]["activity"] +
                      " "}
                  </span>
                </p>
              ) : null}
            </div>
            <span className="modal-btns">
              {" "}
              <button>
                <a
                  href={cedarLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  {" "}
                  See in Cedar
                </a>
              </button>{" "}
              <button>
                {" "}
                <a
                  href={openViewLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  See in OpenView
                </a>
              </button>
            </span>
          </div>

          {/* {children} */}
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Modal;
