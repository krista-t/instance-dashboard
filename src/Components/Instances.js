import {
  defaultKeywords,
  isPrimitive,
  iterateObject,
} from "../configuration/iterateObj";
import { sliceTxt } from "../configuration/sliceTxt";
const Instances = ({
  instance,
  search,
  filter,
  handleModal,
}) => {
  let instancesSummary = [];
  instance.map((instance) => delete instance["@context"]);
  isPrimitive();
  let summaryData;
  for (let i = 0; i < instance.length; i++) {
    summaryData = iterateObject(
      instance[i],
      defaultKeywords,
      {}
    );
    instancesSummary.push(summaryData);
  }

  function searchList(instancesSummary) {
    const searchQ =
      instancesSummary[0] &&
      Object.keys(instancesSummary[0]);
    const filtered = filter.map((f) => f.toLowerCase());
    // eslint-disable-next-line array-callback-return
    return instancesSummary.filter((i) => {
      if (filtered.includes(search)) {
        return searchQ.some(
          (q) =>
            i[q]
              .toString()
              .toLowerCase()
              .indexOf(search.toLowerCase()) > -1
        );
      }
      if (!filter.length) {
        return searchQ.some(
          (q) =>
            i[q]
              .toString()
              .toLowerCase()
              .indexOf(search.toLowerCase()) > -1
        );
      }

      // TODO: configure for facets
      if (filter) {
        return (
          i["subject"].some(
            (s) => filter.indexOf(s) > -1
          ) ||
          i["variable"].some((v) => filter.indexOf(v) > -1)
        );
      }
    });
  }
  return (
    <section className="instances">
      {searchList(instancesSummary).map((data, i) => (
        <div
          key={i}
          className="content"
          onClick={() => handleModal(i)}
        >
          <h2>
            {data["title"]}
            {data["catalogTitle"]}
          </h2>
          {/* <h5>AUTHOR: {data["pav:createdBy"]}</h5> */}
          <h4>LAST UPDATED: {data["pav:lastUpdatedOn"]}</h4>
          <p className="description">
            {/* {data["description"].length <= 350
              ? data["description"]
              : `${data["description"].slice(0, 350)}...`} */}

            {sliceTxt(data["description"])}
            {sliceTxt(data["catalogDescription"])}
          </p>{" "}
          {/* {data["subject"] ? (
            <p>
              SUBJECT: <span>{data["subject"] + " "}</span>
            </p>
          ) : null} */}
          {/* TODO: move to modal */}
          {/* {data["variable"] ? (
            <p>
              VARIABLE:
              <span>{"" + data["variable"] + " "}</span>
            </p>
          ) : null} */}
        </div>
      ))}
    </section>
  );
};

export default Instances;
