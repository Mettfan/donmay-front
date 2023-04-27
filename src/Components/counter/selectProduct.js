import axios from "axios";

// A mock function to mimic making an async request for data
export function selectProduct(id = 1) {
    return new Promise((resolve) =>
      setTimeout(() =>{
        axios.get('https://branquice.onrender.com/products/?id=' + id).then( response => {
            
            resolve({ data: response})
        })
      }, 500)
    );
  }
  