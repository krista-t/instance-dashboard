import { useState, useEffect } from "react";
import Header from "./Components/Header";
import Template from "./Components/Template";
function App() {
  const API_templates = "https://data.windenergy.dtu.dk/api/sesame/v1/get-template-ids"
  const [templates, setTemplates]=useState([]);
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`${API_templates}`);
        const data = await response.json();
    setTemplates(data)
      
      } catch (err) {
        console.log(err);
      }
    };
    fetchItems();
    
  }, []);

  return (
    <div className="App">
   <Header></Header>
   <Template templates = {templates} 
   ></Template>
    </div>
  );
}

export default App;
