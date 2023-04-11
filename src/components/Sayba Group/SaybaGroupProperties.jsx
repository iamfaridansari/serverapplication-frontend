import React, { useEffect, useRef, useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import ToggleMenu from "../ToggleMenu";
import { FaPen, FaPlus, FaTimes, FaTrash } from "react-icons/fa";
import states from "../../assets/data/states";
import Loader from "../Loader";
import { useNavigate } from "react-router-dom";

const SaybaGroupProperties = () => {
  const { backendAPI } = useContext(AppContext);
  //
  const navigate = useNavigate();
  const auth = async () => {
    const authtoken = JSON.parse(localStorage.getItem("auth-token"));
    try {
      const res = await fetch(backendAPI + `/auth`, {
        method: "GET",
        headers: {
          "auth-token": `Bearer ${authtoken}`,
        },
      });
      if (res.status !== 200) {
        navigate("/login", { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    auth();
  }, []);
  //
  const [property, setProperty] = useState({
    name: "",
    developer: "",
    city: "",
    state: "",
    possession: "",
    price: "",
    classname: "",
  });
  const handleInput = (e) => {
    const { name, value } = e.target;
    setProperty({
      ...property,
      [name]: value,
    });
  };
  //
  const cityInput = useRef(null);
  const [stateIndex, setStateIndex] = useState(0);
  useEffect(() => {
    states.forEach((item, index) => {
      if (item.state === property.state) {
        setStateIndex(index);
      }
    });
    //
    property.state === ""
      ? cityInput.current.setAttribute("disabled", true)
      : cityInput.current.removeAttribute("disabled");
  }, [property.state]);
  //
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  //
  const amenityTemplate = {
    amenity: "",
  };
  const [amenities, setAmenities] = useState([amenityTemplate]);
  const addAmenity = (e) => {
    e.preventDefault();
    setAmenities([...amenities, amenityTemplate]);
  };
  const amenityChange = (e, index) => {
    const updated = amenities.map((item, ind) =>
      index === ind
        ? Object.assign(item, { [e.target.name]: e.target.value })
        : item
    );
    setAmenities(updated);
  };
  const deleteAmenity = (e, index) => {
    e.preventDefault();
    const updated = amenities.filter((item, ind) => {
      return index !== ind;
    });
    setAmenities(updated);
  };
  //
  const areaTemplate = {
    area: "",
  };
  const [area, setArea] = useState([areaTemplate]);
  const addArea = (e) => {
    e.preventDefault();
    setArea([...area, areaTemplate]);
  };
  const areaChange = (e, index) => {
    const updated = area.map((item, ind) =>
      index === ind
        ? Object.assign(item, { [e.target.name]: e.target.value })
        : item
    );
    setArea(updated);
  };
  const deleteArea = (e, index) => {
    e.preventDefault();
    const updated = area.filter((item, ind) => {
      return index !== ind;
    });
    setArea(updated);
  };
  //
  const configTemplate = {
    config: "",
  };
  const [config, setConfig] = useState([configTemplate]);
  const addConfig = (e) => {
    e.preventDefault();
    setConfig([...config, configTemplate]);
  };
  const configChange = (e, index) => {
    const updated = config.map((item, ind) =>
      index === ind
        ? Object.assign(item, { [e.target.name]: e.target.value })
        : item
    );
    setConfig(updated);
  };
  const deleteConfig = (e, index) => {
    e.preventDefault();
    const updated = config.filter((item, ind) => {
      return index !== ind;
    });
    setConfig(updated);
  };
  //
  const submitProperty = async (e) => {
    e.preventDefault();
    //
    const formData = new FormData();
    formData.append("name", property.name);
    formData.append("developer", property.developer);
    formData.append("state", property.state);
    formData.append("city", property.city);
    formData.append("possession", property.possession);
    formData.append("price", property.price);
    formData.append("classname", property.classname);
    formData.append("amenities", JSON.stringify(amenities));
    formData.append("area", JSON.stringify(area));
    formData.append("config", JSON.stringify(config));
    formData.append("image1", image1);
    formData.append("image2", image2);
    formData.append("image3", image3);
    formData.append("image4", image4);
    //
    try {
      const res = await fetch(backendAPI + "/api/post/sayba/property", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log(data);
      //
      if (res.status === 200) {
        fetchProperties();
        setProperty({
          name: "",
          developer: "",
          city: "",
          state: "",
          possession: "",
          price: "",
          classname: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  //
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchProperties = async () => {
    try {
      setLoading(true);
      const res = await fetch(backendAPI + "/api/get/sayba/property");
      const data = await res.json();
      console.log(data);
      if (res.status === 200) {
        setProperties(data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProperties();
  }, []);
  //
  const deleteProperty = async (item) => {
    const res = await fetch(backendAPI + "/api/delete/sayba/property", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: item._id,
      }),
    });
    const data = await res.json();
    console.log(data);
    fetchProperties();
  };
  return (
    <div className="container-fluid p-lg-2 p-0">
      <div className="d-flex align-items-center justify-content-between gap-2 mb-4">
        <h1>Sayba Group</h1>
        <ToggleMenu />
      </div>
      {/*  */}
      <form className="row align-items-center justify-content-between">
        <div className="col-sm-6 mb-4">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={property.name}
            onChange={handleInput}
          />
        </div>
        <div className="col-sm-6 mb-4">
          <label>Developer</label>
          <input
            type="text"
            className="form-control"
            name="developer"
            value={property.developer}
            onChange={handleInput}
          />
        </div>
        <div className="col-sm-3 mb-4">
          <label>State</label>
          <select
            className="form-control"
            name="state"
            value={property.state}
            onChange={handleInput}
          >
            <option disabled value=""></option>
            {states.map((item, index) => {
              return (
                <option value={item.state} key={index}>
                  {item.state}
                </option>
              );
            })}
          </select>
        </div>
        <div className="col-sm-3 mb-4">
          <label>City</label>
          <select
            className="form-control"
            ref={cityInput}
            name="city"
            value={property.city}
            onChange={handleInput}
          >
            <option disabled value=""></option>
            {states[stateIndex].districts.map((item, index) => {
              return (
                <option value={item} key={index}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
        <div className="col-sm-6 mb-4">
          <label>Posession</label>
          <input
            type="date"
            className="form-control"
            name="possession"
            value={property.possession}
            onChange={handleInput}
          />
        </div>
        <div className="col-sm-6 mb-4">
          <label>Price</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={property.price}
            onChange={handleInput}
          />
        </div>
        <div className="col-sm-6 mb-4">
          <label>Class</label>
          <select
            className="form-control"
            name="classname"
            value={property.class}
            onChange={handleInput}
          >
            <option disabled value=""></option>
            <option value="short">Short</option>
            <option value="long">Long</option>
          </select>
        </div>
        <div className="col-md-3 col-6 mb-4">
          <label>Image1</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setImage1(e.target.files[0])}
          />
        </div>
        <div className="col-md-3 col-6 mb-4">
          <label>Image2</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setImage2(e.target.files[0])}
          />
        </div>
        <div className="col-md-3 col-6 mb-4">
          <label>Image3</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setImage3(e.target.files[0])}
          />
        </div>
        <div className="col-md-3 col-6 mb-4">
          <label>Image4</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setImage4(e.target.files[0])}
          />
        </div>
        <div className="col-12">
          <label>Amenities</label>
          <div className="row align-items-start justify-content-start">
            {amenities.map((item, index) => {
              return (
                <div className="col-md-4 col-sm-6 mb-4" key={index}>
                  <div className="d-flex align-items-center justify-content-start gap-2">
                    <input
                      type="text"
                      className="form-control"
                      name="amenity"
                      value={item.amenity}
                      onChange={(e) => amenityChange(e, index)}
                    />
                    {amenities.length > 1 ? (
                      <button
                        className="button"
                        onClick={(e) => deleteAmenity(e, index)}
                      >
                        <FaTimes />
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              );
            })}
            <div className="col-1">
              <button className="button mb-4" onClick={addAmenity}>
                <FaPlus />
              </button>
            </div>
          </div>
        </div>
        <div className="col-12">
          <label>Area</label>
          <div className="row align-items-start justify-content-start">
            {area.map((item, index) => {
              return (
                <div className="col-md-4 col-sm-6 mb-4" key={index}>
                  <div className="d-flex align-items-center justify-content-start gap-2">
                    <input
                      type="text"
                      className="form-control"
                      name="area"
                      value={item.area}
                      onChange={(e) => areaChange(e, index)}
                    />
                    {area.length > 1 ? (
                      <button
                        className="button"
                        onClick={(e) => deleteArea(e, index)}
                      >
                        <FaTimes />
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              );
            })}
            <div className="col-1">
              <button className="button mb-4" onClick={addArea}>
                <FaPlus />
              </button>
            </div>
          </div>
        </div>
        <div className="col-12">
          <label>Configuration</label>
          <div className="row align-items-start justify-content-start">
            {config.map((item, index) => {
              return (
                <div className="col-md-4 col-sm-6 mb-4" key={index}>
                  <div className="d-flex align-items-center justify-content-start gap-2">
                    <input
                      type="text"
                      className="form-control"
                      name="config"
                      value={item.config}
                      onChange={(e) => configChange(e, index)}
                    />
                    {config.length > 1 ? (
                      <button
                        className="button"
                        onClick={(e) => deleteConfig(e, index)}
                      >
                        <FaTimes />
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              );
            })}
            <div className="col-1">
              <button className="button mb-4" onClick={addConfig}>
                <FaPlus />
              </button>
            </div>
          </div>
        </div>
        <hr />
        <div className="col-12 text-end">
          <button className="button" onClick={submitProperty}>
            Submit
          </button>
        </div>
      </form>

      {loading ? (
        <Loader />
      ) : (
        <>
          {properties.length === 0 ? (
            <p className="text-center">No record to show</p>
          ) : (
            <div className="imagegrid mt-4">
              {properties.map((item, index) => {
                return (
                  <div className="image" key={index}>
                    <div className="desc p-2">
                      <div>
                        <p>{item.name}</p>
                        <p>{item.developer}</p>
                        <p>
                          {item.city} {item.state}
                        </p>
                        <p>{item.possession}</p>
                        <p>{item.price}</p>
                        <p>Images: {item.images.length}</p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between gap-2">
                        <button className="button w-50">
                          <FaPen />
                        </button>
                        <button
                          className="button w-50"
                          onClick={() => deleteProperty(item)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                    <img
                      src={`${backendAPI + "/" + item.images[0].path}`}
                      alt=""
                    />
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SaybaGroupProperties;
