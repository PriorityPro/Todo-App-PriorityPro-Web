import axios from "axios";

export default axios.create({
  baseURL: `http://localhost:5008/api/v1/items/create`,
});