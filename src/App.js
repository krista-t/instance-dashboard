import { useState, useEffect } from "react";
import {
  Route,
  Switch,
  BrowserRouter,
} from "react-router-dom";
import Header from "./Components/Header";
import Template from "./Components/Template";
import Search from "./Components/Search";
import Facets from "./Components/Facets";
import Instances from "./Components/Instances";
import Modal from "./Components/Modal";
import Dashboard from "./Components/Dashboard";
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
  const defaultTemplateID =
    "https://repo.metadatacenter.org/templates/2230186e-2890-4d38-9206-ded583fccafd";
  //STATE FOR FACETS
  const [facets, setFacets] = useState([]);
  //SET DEFAULT STATE FOR FACETS REQuest
  const [facetID, setFacetID] = useState(defaultTemplateID);

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
    defaultTemplateID
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
  // const [filter, setFilter] = useState([]);
  const [filter, setFilter] = useState([]);
  //MODAL HOOK
  const [isOpen, setIsOpen] = useState(false);
  //SELECTED TITLE FOR MODAL
  const [isSelected, setIsSelected] = useState(null);

  const handleChecked = (e) => {
    const checked = e.target.checked;
    const termID = e.target.value;
    const parentID =
      e.target.parentElement.parentElement.parentElement.id;
    setFilter((prev) =>
      checked
        ? [...prev, [parentID, termID]]
        : prev.filter(function (el) {
            return el[1] !== termID;
          })
    );
  };
  const handleModal = (i) => {
    setIsOpen(true);
    setIsSelected(i);
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Header></Header>
        <Switch>
          <Route exact path="/">
            <Template
              templates={templates}
              facetID={facetID}
              setFacetID={setFacetID}
              setInstanceID={setInstanceID}
              showBoxes={showBoxes}
              setShowBoxes={setShowBoxes}
              setFilter={setFilter}></Template>
            <Search
              instance={instance}
              search={search}
              setSearch={setSearch}></Search>
            <Facets
              facets={facets}
              showBoxes={showBoxes}
              setShowBoxes={setShowBoxes}
              handleChecked={handleChecked}
              filter={filter}
              setFilter={setFilter}></Facets>
            <Instances
              instance={instance}
              search={search}
              facets={facets}
              handleChecked={handleChecked}
              filter={filter}
              handleModal={handleModal}
              setIsSelected={setIsSelected}></Instances>
            <Modal
              open={isOpen}
              onClose={() => setIsOpen(false)}
              instance={instance}
              isSelected={isSelected}
              handleModal={handleModal}></Modal>
          </Route>
          <Route exact path="/dashboard">
            <Dashboard facets={facets}></Dashboard>
          </Route>
        </Switch>
      </BrowserRouter>
      <Footer></Footer>
    </div>
  );
}

export default App;
