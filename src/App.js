import { useState, useEffect } from "react";
import Header from "./Components/Header";
import Template from "./Components/Template";
import Search from "./Components/Search";
import Facets from "./Components/Facets";
import Instances from "./Components/Instances";
import Modal from "./Components/Modal";
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
    "https://repo.metadatacenter.org/templates/2059d13b-b0f2-4325-84ee-0f69785829d5"
  );

  //CHANGE FACET STATE STATE DEPENDING ON TEMPLATE ID
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(
          `${API_facets}${facetID}`
        );
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
    "https://repo.metadatacenter.org/templates/2059d13b-b0f2-4325-84ee-0f69785829d5"
  );
  //CHANGE FACET STATE STATE DEPENDING ON TEMPLATE ID
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(
          `${API_instance}${instanceID}`
        );
        const data = await response.json();
        //console.log(data);
        setInstance(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchItems();
  }, [instanceID]);

  const [showBoxes, setShowBoxes] = useState({});
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState([]);
  //MODAL HOOK
  const [isOpen, setIsOpen] = useState(false);
  //SELECTED TITLE FOR MODAL
  const [isSelected, setIsSelected] = useState(null);
  const handleChecked = (e, i) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setFilter((prev) =>
      //if it´s checked copy prev val and add new in arr, else filter previous, and remove what is unchecked
      checked
        ? [...prev, value]
        : prev.filter((v) => v !== value)
    );
  };
  const handleModal = (i) => {
    setIsOpen(true);
    setIsSelected(i);
  };
  return (
    <div className="App">
      <Header></Header>
      <Template
        templates={templates}
        facetID={facetID}
        setFacetID={setFacetID}
        setInstanceID={setInstanceID}
        showBoxes={showBoxes}
        setShowBoxes={setShowBoxes}
        setFilter={setFilter}
      ></Template>
      <Search
        instance={instance}
        search={search}
        setSearch={setSearch}
      ></Search>
      <Facets
        facets={facets}
        showBoxes={showBoxes}
        setShowBoxes={setShowBoxes}
        handleChecked={handleChecked}
        filter={filter}
        setFilter={setFilter}
      ></Facets>
      <Instances
        instance={instance}
        search={search}
        facets={facets}
        handleChecked={handleChecked}
        filter={filter}
        handleModal={handleModal}
        setIsSelected={setIsSelected}
      ></Instances>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        instance={instance}
        isSelected={isSelected}
        handleModal={handleModal}
      ></Modal>
      <Footer></Footer>
    </div>
  );
}

export default App;
