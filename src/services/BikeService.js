import http from "./http-common";


const getAll = () => {
    return http.get("/bikes");
};

const get = id => {
    return http.get(`/bikes/${id}`);
};

const create = data => {
    return http.post("/bikes", data);
};

const update = (id, data) => {
    return http.put(`/bikes/${id}`, data);
};

const remove = id => {
    return http.delete(`/bikes/${id}`);
};

const findByTitle = title => {
    return http.get(`/bikes?title=${title}`);
};

const BikeService = {
    getAll,
    get,
    create,
    update,
    remove,
    findByTitle
};

export default BikeService;