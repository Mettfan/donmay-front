import axios from "axios";

// A mock function to mimic making an async request for data
export function selectProductByBarcode(codigo = '0') {
    return new Promise((resolve) =>
      setTimeout(() =>{
        axios.get('https://branquice.onrender.com/products/?Código=' + codigo).then( response => {
            
            resolve({ data: response})
        })
      }, 500)
    );
  }
  