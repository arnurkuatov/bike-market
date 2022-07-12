import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import BikeDataService from "../../services/BikeService";
import {deleteBike, updateBike} from "../../redux/slices/bikeSlice";

import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Bike = () => {
    const params = useParams();
    const navigate = useNavigate();
    const initialBikeState = {
        id: null,
        name: "",
        price: "",
        size: ""
    };
    const [currentBike, setCurrentBike] = useState(initialBikeState);
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();

    const getBike = id => {
        BikeDataService.get(id)
            .then(response => {
                setCurrentBike(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getBike(params.id);
    }, [params.id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentBike({ ...currentBike, [name]: value });
    };

    const updateStatus = status => {
        const data = {
            id: currentBike.id,
            name: currentBike.name,
            price: currentBike.price,
            size: currentBike.size
        };

        dispatch(updateBike({ id: currentBike.id, data }))
            .unwrap()
            .then(response => {
                setCurrentBike({ ...currentBike, published: status });
                setMessage("Статус успешно обновлен!");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const updateContent = () => {
        dispatch(updateBike({ id: currentBike.id, data: currentBike }))
            .unwrap()
            .then(response => {
                console.log(response);
                setMessage("Данные велосипеда была успешно обновлена!");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const removeBike = () => {
        dispatch(deleteBike({ id: currentBike.id }))
            .unwrap()
            .then(() => {
                navigate('/bikes')
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>
            {currentBike ? (
                <div className="edit-form">
                    <h4>Велик</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Название</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={currentBike.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">Цена</label>
                            <input
                                type="text"
                                className="form-control"
                                id="price"
                                name="price"
                                value={currentBike.price}
                                onChange={handleInputChange}
                            />
                        </div>
                    </form>
                        <button
                            className="badge badge-primary mr-2"
                            onClick={() => updateStatus(true)}
                        >
                            Добавить товар
                        </button>
                    <button className="badge badge-danger mr-2" onClick={removeBike}>
                        Удалить
                    </button>

                    <button
                        type="submit"
                        className="badge badge-success"
                        onClick={updateContent}
                    >
                        Обновить
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                </div>
            )}
        </div>
    );
};

export default Bike;
