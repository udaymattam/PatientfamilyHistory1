import axios from "axios";

export default axios.create({
    baseURL: "https://fhir-open.cerner.com/r4",
  headers: {
      "Content-type": "application/json+fhir"
  }
});