import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {retrieveBike} from "../../redux/slices/bikeSlice";
import {addProduct} from "../../redux/slices/cartSlice";

const BikeBlockList = () => {
    const [currentBike, setCurrentBike] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchTitle, setSearchTitle] = useState("");

    const bikes = useSelector(state => state.bikes);
    const dispatch = useDispatch();

    const onChangeSearchTitle = e => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    };

    const initFetch = useCallback(() => {
        dispatch(retrieveBike());
    }, [dispatch])

    useEffect(() => {
        initFetch()
    }, [initFetch])

    const refreshData = () => {
        setCurrentBike(null);
        setCurrentIndex(-1);
    };

    const setActiveBike = (bike, index) => {
        setCurrentBike(bike);
        setCurrentIndex(index);
    };


    const findByTitle = () => {
        refreshData();
        dispatch(findByTitle({ title: searchTitle }));
    };

    const addBikeCart = () => {
        const {id, name, price, size} = currentBike
        const item = {
            id,
            name,
            price,
            size
        }
        dispatch(addProduct(item))
    }

    return (
        <div className="list row">
            <div className="col-md-8">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by title"
                        value={searchTitle}
                        onChange={onChangeSearchTitle}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByTitle}
                        >
                            ??????????
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <h4>???????????? ??????????????????????</h4>

                <ul className="list-group">
                    {bikes &&
                        bikes.map((item, index) => (
                            <li
                                className={
                                    "list-group-item " + (index === currentIndex ? "active" : "")
                                }
                                onClick={() => setActiveBike(item, index)}
                                key={index}
                            >
                                {item.name}
                            </li>
                        ))}
                </ul>
            </div>
            <div className="col-md-6">
                {currentBike ? (
                    <div>
                        <h4>??????????????????</h4>
                        <div>
                            <label>
                                <strong>????????????????:</strong>
                            </label>{" "}
                            {currentBike.name}
                        </div>
                        <div>
                            <label>
                                <strong>????????:</strong>
                            </label>{" "}
                            {currentBike.price} ????
                        </div>
                        <div>
                            <label>
                                <strong>???????????? ????????????:</strong>
                            </label>{" "}
                            {currentBike.size}
                        </div>
                        <button
                            onClick={addBikeCart}
                            className="btn btn-success"
                        >
                            ???????????????? ?? ??????????????
                        </button>
                        <br />
                        <Link
                            to={"/bikes/" + currentBike.id}
                            className="badge badge-warning"
                        >
                            ??????????????????????????
                        </Link>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>???????????????????? ?????????????? ???? ???????????? ????????????????????, ?????????? ?????????????? ????????????????</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BikeBlockList;
