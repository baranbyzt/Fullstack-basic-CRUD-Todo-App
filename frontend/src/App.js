import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(0);
  const [itemList, setItemList] = useState([]);

  const addEmployee = () => {""
    Axios.post("http://localhost:3000/createitem", {
      description: description,
      category: category,
    
    }).then(() => {
      setItemList([
        ...itemList,
        {
          description: description,
          category: category,
       
        },
      ]);
    });
  };

  const getEmployees = () => {
    Axios.get("http://localhost:3000/getitems").then((response) => {
      setItemList(response.data);
    });
  };

  const deleteEmployee = (id) => {
    Axios.post(`http://localhost:3000/deleteitem/${id}`).then((response) => {
      setItemList(
        itemList.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };

  return (
    <div classdescription="App">
      <div className="inputs">
   <div>
   <label>description:</label>
        <input
          type="text"
          className="input"
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
   </div>
      <div>
      <label>category:</label>
        <input
          type="text"
          className="input"
          onChange={(event) => {
            setCategory(event.target.value);
          }}
        />
      </div>
         <button onClick={addEmployee}>Add Item</button>
        <button onClick={getEmployees}>Show All Employees</button>
      </div>
      <div className="itemWrapper"> 
    

        {itemList.map((val, key) => {
          return (
            <div className="items">
              <div>
                <h3>description: {val.description}</h3>
                <h3>category: {val.category}</h3>
              </div>
              <div>
                <button 
                  onClick={() => {
                    deleteEmployee(val.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
