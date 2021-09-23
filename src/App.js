import { useState, useEffect } from "react";
import Header from "./Components/Header";
import Template from "./Components/Template";
import Search from "./Components/Search";
import Facets from "./Components/Facets";
import Instances from "./Components/Instances";
import Footer from "./Components/Footer";

//GET TEMPLATE IDs
function App() {
  const API_templates =
    "https://data.windenergy.dtu.dk/api/sesame/v1/get-template-ids";
  const [templates, setTemplates] = useState([]);
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`${API_templates}`);
        const data = await response.json();
        //console.log(data)
        setTemplates(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchItems();
  }, []);

  //GET FACETS IDs
  const API_facets =
    "https://data.windenergy.dtu.dk/api/sesame/v1/get-facets?templateID= ";
  //STATE FOR FACETS
  const [facets, setFacets] = useState([]);
  //SET DEFAULT STATE FOR FACETS REQuest
  const [facetID, setFacetID] = useState(
    "https%3A%2F%2Frepo.metadatacenter.org%2Ftemplates%2Fc2f771b8-7cd6-445d-8706-f3d8b9ae3134"
  );
  //CHANGE FACET STATE STATE DEPENDING ON TEMPLATE ID
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`${API_facets}${facetID}`);
        const data = await response.json();
        //console.log(data);
        setFacets(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchItems();
  }, [facetID]);

  //GET INSTANCES IDs
  const API_instance =
    "https://data.windenergy.dtu.dk/api/sesame/v1/get-instances?templateID= ";
  //STATE FOR INSTANCES
  const [instance, setInstance] = useState([]);
  //SET DEFAULT STATE FOR INSTANCE REQuest
  const [instanceID, setInstanceID] = useState(
    "https%3A%2F%2Frepo.metadatacenter.org%2Ftemplates%2Fc2f771b8-7cd6-445d-8706-f3d8b9ae3134"
  );
  //CHANGE FACET STATE STATE DEPENDING ON TEMPLATE ID
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`${API_instance}${instanceID}`);
        const data = await response.json();
        //console.log(data);
        setInstance(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchItems();
  }, [instanceID]);

  return (
    <div className="App">
      <Header></Header>
      <Template
        templates={templates}
        facetID={facetID}
        setFacetID={setFacetID}
        setInstanceID={setInstanceID}
      ></Template>
      <Search instance={instance}></Search>
      <Facets facets={facets}></Facets>
      <Instances instance={instance}></Instances>
      <Footer></Footer>
    </div>
  );
}

export default App;
