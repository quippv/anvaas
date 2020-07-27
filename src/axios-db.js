import axios from "axios";

const instance = axios.create({
  baseURL: "https://anvaas-43a4b.firebaseio.com/",
});

export default instance;
