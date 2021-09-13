const Template = ({templates,setReqType}) => { 
   
    return (
           <div className="template-select">
            <select name="template">
        {Object.entries(templates).map(([key,value]) => 
         <option key={key} value={value} onClick={() => setReqType(key)}>
         {value}
       </option>
          )}   
      </select>
            </div>   
       
    )
}

export default Template