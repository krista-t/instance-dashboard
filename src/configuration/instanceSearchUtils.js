/* Creates filter array from filterCriteriaObject. filterCriteriaObject is generated in 
the user interaction with facets menu, an example of this object is:
{'subject': ['Design Conditions'], 'variable': ['wind_speed']}
where keys are facets names, while values are provided as an array of terms that
are selected per facet
. */

function createFilterArrayCriteria(filterCriteriaObject) {
  let filterCriteriaArray = [];

  Object.keys(filterCriteriaObject).forEach((key) => {
    for (
      let i = 0;
      i < filterCriteriaObject[key].length;
      i++
    ) {
      filterCriteriaArray.push([
        key,
        filterCriteriaObject[key][i],
      ]);
    }
  });

  return filterCriteriaArray;
}

/* Filters instances based on the filter criteria generated through 
the user interaction with the front-end. Beware that this function calls
createFilterArray to wrangle filterCriteriaObject in the form that consecutive
filtering operations require. This function is adaptation of the solution:
https://stackoverflow.com/a/31170726
. */

export function facetedSearch(
  filterCriteriaObject,
  instances
) {
  // let filterCriteriaArray = createFilterArrayCriteria(filterCriteriaObject);
  let filterCriteriaArray = filterCriteriaObject;
  return instances.filter(function (instance) {
    for (let i = 0; i < filterCriteriaArray.length; i++) {
      if (
        Array.isArray(instance[filterCriteriaArray[i][0]])
      ) {
        // Case 1: values for key are provided in an Array
        if (
          !instance[filterCriteriaArray[i][0]].includes(
            filterCriteriaArray[i][1]
          )
        ) {
          return false;
        }

        // Case 2: single value per key
      } else {
        if (
          instance[filterCriteriaArray[i][0]] !=
          filterCriteriaArray[i][1]
        ) {
          return false;
        }
      }
    }
    return true;
  });
}

export function freeTextSearch(
  inputText,
  instancesFiltered
) {
  const searchQ =
    instancesFiltered[0] &&
    Object.keys(instancesFiltered[0]);

  return instancesFiltered.filter((i) => {
    return searchQ.some(
      (q) =>
        i[q]
          .toString()
          .toLowerCase()
          .indexOf(inputText.toLowerCase()) > -1
    );
  });
}
