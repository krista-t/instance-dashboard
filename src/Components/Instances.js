import { useEffect } from "react";
import {
	defaultKeywords,
	getIntancesSummary,
} from "../configuration/iterateObj";

import {
	facetedSearch,
	freeTextSearch,
} from "../configuration/instanceSearchUtils";

import { sliceTxt } from "../configuration/sliceTxt";
const Instances = ({
	instance,
	search,
	filter,
	handleModal,
	setLength,
}) => {
	let instancesSummary = getIntancesSummary(
		instance,
		defaultKeywords
	);
	let filteredList = facetedSearch(
		filter,
		instancesSummary
	);
	let newList = freeTextSearch(search, filteredList);
	let newListLength = newList.length;

	useEffect(() => {
		setLength(newListLength);
	}, [newListLength, setLength]);
	return (
		<section className="instances">
			{newList.map((data, i) => (
				<div
					key={i}
					className="content"
					onClick={() => handleModal(i)}>
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
