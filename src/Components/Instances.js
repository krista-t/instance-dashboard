//import { useState, useEffect } from "react";
const Instances = ({ instance, search, filter }) => {
  let instancesSummary = [];
  let defaultKeywords = [
    "schema:name",
    "schema:description",
    "pav:createdBy",
    "pav:lastUpdatedOn",
    "rdfs:label",
    "subject",
    "variable",
  ];

  //const [searchParam] = useState([`${defaultKeywords}`]);
  //console.log(searchParam);

  instance.map((instance) => delete instance["@context"]);
  //search template json by keywords
  function iterateObject(obj, keywords, result = {}) {
    for (let key in obj) {
      if (typeof obj[key] == "object" && !Array.isArray(obj[key])) {
        iterateObject(obj[key], keywords, result);
      } else {
        if (keywords.includes(key)) {
          if (Array.isArray(obj[key])) {
            let terms = [];
            let term = [];
            for (let i = 0; i < obj[key].length; i++) {
              term = obj[key][i]["rdfs:label"];
              terms.push(term);
            }
            result[key] = terms;
          } else {
            result[key] = obj[key];
          }
        }
      }
    }
    return result;
  }

  let summaryData;
  for (let i = 0; i < instance.length; i++) {
    // console.log(instance[i]);
    summaryData = iterateObject(instance[i], defaultKeywords, {});
    instancesSummary.push(summaryData);
  }

  function searchList(instancesSummary) {
    const searchQ = instancesSummary[0] && Object.keys(instancesSummary[0]);
    //const searchQ = instancesSummary && Object.keys(instancesSummary[0]);
    return instancesSummary.filter((i) =>
      searchQ.some(
        (q) => i[q].toString().toLowerCase().indexOf(search.toLowerCase()) > -1
      )
    );
  }
  // instancesSummary = instancesSummary.filter(
  //   (i) =>
  //     i["pav:lastUpdatedOn"].toLowerCase().includes(search.toLowerCase()) ||
  //     i["schema:description"].toLowerCase().includes(search.toLowerCase()) ||
  //     i["schema:name"]
  //       .toLowerCase()
  //       .includes(
  //         search.toLowerCase() ||
  //     i["subject"].toLowerCase().includes(search.toLowerCase()) ||
  //     i["variable"]
  //             .toString()
  //             .toLowerCase()
  //             .includes(search.toLowerCase())
  //       )

  //   // i["subject"]
  //   //   .toString()
  //   //   .toLowerCase()
  //   //   .includes(filter.toString().toLowerCase()) ||
  //   // i["variable"]
  //   //   .toString()
  //   //   .toLowerCase()
  //   //   .includes(filter.toString().toLowerCase())
  // );

  return (
    <section className="instances">
      {searchList(instancesSummary).map((data, i) => (
        <div key={i} className="content">
          <h2>{data["schema:name"]}</h2>
          {/* <h5>AUTHOR: {data["pav:createdBy"]}</h5> */}
          <h4>LAST UPDATED: {data["pav:lastUpdatedOn"]}</h4>
          <p>{data["schema:description"]}</p>
          <p>Subjects: {data["subject"]}</p>
          <p>Variables: {data["variable"]}</p>
        </div>
      ))}
    </section>
  );
};

export default Instances;
