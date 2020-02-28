import axios from "axios";

const instance = axios.create({
  baseURL: "https://todo-list-app-a53d9.firebaseio.com/"
});

export default instance;
