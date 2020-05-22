import axios from "axios";

export default axios.create({

  // Web build
  // baseURL: "https://paikkatietokanta.net/api/",
  
  // Localhost: 
   baseURL: "http://localhost:8080/api/",

  headers: {
    "Content-type": "application/json"
  }
});