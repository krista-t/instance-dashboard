export let defaultKeywords = [
  "title",
  "publisher",
  "catalogDescription",
  "catalogTitle",
  "description",
  "pav:lastUpdatedOn",
  "subject",
  "variable",
  "externalCondition",
  "@id",
  "rdfs:label",
];
export function isPrimitive(val) {
  if (typeof val == "object" || typeof val == "function") {
    return false;
  } else {
    return true;
  }
}

export function iterateObject(obj, keywords, result = {}) {
  for (let key in obj) {
    // In case of nested objects
    if (
      typeof obj[key] == "object" &&
      !Array.isArray(obj[key]) &&
      !("@value" in obj[key])
    ) {
      iterateObject(obj[key], keywords, result);
    }
    if (keywords.includes(key)) {
      // 1. When value is pure primitve value
      if (isPrimitive(obj[key])) {
        result[key] = obj[key];
      }
      // 2. When values are from controlled vocabulary
      else if (Array.isArray(obj[key])) {
        let term = [];
        let terms = [];
        for (let i = 0; i < obj[key].length; i++) {
          term = obj[key][i]["rdfs:label"];
          terms.push(term);
        }
        result[key] = terms;
      }
      // 3. When value is provided under key @value
      else if (
        typeof obj[key] === "object" &&
        obj[key] !== null &&
        !Array.isArray(obj[key]) &&
        "@value" in obj[key]
      ) {
        result[key] = obj[key]["@value"];
      }
    }
  }
  return result;
}
