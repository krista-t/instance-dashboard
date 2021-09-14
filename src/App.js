import { useState, useEffect } from "react";
import Header from "./Components/Header";
import Template from "./Components/Template";
import Search from "./Components/Search";
import Facets from "./Components/Facets";
import Footer from "./Components/Footer";
function App() {
  const API_templates = "https://data.windenergy.dtu.dk/api/sesame/v1/get-template-ids"
  const [templates, setTemplates]=useState([]);
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`${API_templates}`);
        const data = await response.json();
        console.log(data)
    setTemplates(data)
      
      } catch (err) {
        console.log(err);
      }
    };
    fetchItems();
    
  }, []);
  const API_facets = "https://data.windenergy.dtu.dk/api/sesame/v1/get-facets?templateID= "
  //SET DEFAULT STATE FOR FACETS REQ
  const [reqType, setReqType] = useState("https%3A%2F%2Frepo.metadatacenter.org%2Ftemplates%2Fc2f771b8-7cd6-445d-8706-f3d8b9ae3134");
  //CHANGE FACET STATE STATE DEPENDING ON TEMPLATE ID
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`${API_facets}${reqType}`);
        const data = await response.json();
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchItems();
  }, [reqType]); 
  //console.log(reqType);
  return (
    <div className="App">
   <Header></Header>
   <Template templates = {templates} reqType = {reqType} setReqType = {setReqType}></Template>
   <Search></Search>
   <Facets></Facets>
   <Footer></Footer>
    </div>
  );
}

export default App;
