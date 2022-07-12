import axios from "axios";

export default axios.create({
    baseURL: "https://my-json-server.typicode.com/arnurkuatov/bikes-db",
    headers: {
        "Content-type": "application/json"
    }
});