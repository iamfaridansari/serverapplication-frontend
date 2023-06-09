import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import {
  brand,
  category,
  color,
} from "../../assets/data/faridsclosetproductsdata";
import { FaPen, FaTrash } from "react-icons/fa";
import ToggleMenu from "../ToggleMenu";
import Loader from "../Loader";
import { useNavigate } from "react-router-dom";

const FaridsClosetProducts = () => {
  const { backendAPI } = useContext(AppContext);
  //
  const navigate = useNavigate();
  const auth = async () => {
    const authtoken = JSON.parse(localStorage.getItem("auth-token"));
    try {
      const res = await fetch(backendAPI + `/api/auth`, {
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
  const [product, setProduct] = useState({
    name: "",
    price: "",
    color: "",
    brand: "",
    category: "",
  });
  //
  const handleinput = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };
  //
  const [image, setImage] = useState("");
  //
  const addProduct = async (e) => {
    e.preventDefault();
    //
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("color", product.color);
    formData.append("brand", product.brand);
    formData.append("category", product.category);
    formData.append("image", image);
    //
    if (
      !product.name ||
      !product.price ||
      !product.color ||
      !product.brand ||
      !product.category ||
      !image
    ) {
      window.alert("Enter complete details");
    } else {
      try {
        const res = await fetch(
          backendAPI + "/api/post/faridscloset/products",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await res.json();
        console.log(data);
        if (res.status === 200) {
          setProduct({
            name: "",
            price: "",
            color: "",
            brand: "",
            category: "",
          });
          setImage("");
          getfaridsclosetproducts();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  //
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const getfaridsclosetproducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(backendAPI + "/api/get/faridscloset/products");
      const data = await res.json();
      console.log(data);
      //
      if (res.status === 200) {
        setLoading(false);
        setProducts(data);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getfaridsclosetproducts();
  }, []);
  //
  const deleteimage = async (item) => {
    const res = await fetch(backendAPI + "/api/delete/faridscloset/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: item._id,
      }),
    });
    const data = await res.json();
    console.log(data);
    getfaridsclosetproducts();
  };
  //
  const [edit, setEdit] = useState(false);
  const editproduct = (item) => {
    setProduct({
      name: item.name,
      price: item.price,
      color: item.color,
      brand: item.brand,
      category: item.category,
    });
    setEdit(true);
    window.scrollTo(0, 0);
  };
  //
  const cancelEdit = () => {
    setProduct({
      name: "",
      price: "",
      color: "",
      brand: "",
      category: "",
    });
    setEdit(false);
  };
  return (
    <div className="container-fluid p-lg-2 p-0">
      <div className="d-flex align-items-center justify-content-between gap-2 mb-4">
        <h1>Farid's Closet</h1>
        <ToggleMenu />
      </div>

      <form>
        <div className="formgrid">
          <div>
            <label className="form-label">Product name</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleinput}
              className="form-control"
            />
          </div>
          <div>
            <label className="form-label">Product image</label>
            <input
              multiple
              type="file"
              className="form-control"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div>
            <label className="form-label">Price</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleinput}
              className="form-control"
            />
          </div>
          <div>
            <label className="form-label">Color</label>
            <select
              className="form-control"
              name="color"
              value={product.color}
              onChange={handleinput}
            >
              <option value=""></option>
              {color.sort().map((item, index) => {
                return (
                  <option
                    className="text-capitalize"
                    value={item.replace(/\s/g, "")}
                    key={index}
                  >
                    {item}
                  </option>
                );
              })}
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="form-label">Brand</label>
            <select
              className="form-control"
              name="brand"
              value={product.brand}
              onChange={handleinput}
            >
              <option value=""></option>
              {brand.sort().map((item, index) => {
                return (
                  <option
                    className="text-capitalize"
                    value={item.replace(/\s/g, "")}
                    key={index}
                  >
                    {item}
                  </option>
                );
              })}
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="form-label">Category</label>
            <select
              className="form-control"
              name="category"
              value={product.category}
              onChange={handleinput}
            >
              <option value=""></option>
              {category.sort().map((item, index) => {
                return (
                  <option
                    className="text-capitalize"
                    value={item.replace(/\s/g, "")}
                    key={index}
                  >
                    {item}
                  </option>
                );
              })}
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-end gap-2 mt-4">
          {edit ? (
            <div className="d-flex align-items-center justify-content-between gap-2">
              <button className="button" onClick={cancelEdit}>
                Cancel
              </button>
              <button className="button">Save</button>
            </div>
          ) : (
            <button className="button" onClick={addProduct}>
              Save
            </button>
          )}
        </div>
      </form>

      {/*  */}
      <hr />
      <>
        {loading ? (
          <Loader />
        ) : (
          <div className="imagegrid mt-4">
            {products.length === 0 ? (
              <p className="text-center">No record to show</p>
            ) : (
              products.map((item, index) => {
                return (
                  <div className="image" key={index}>
                    <div className="desc p-2">
                      <div>
                        <p>{item.name}</p>
                        <p>{item.price}</p>
                        <p>{item.brand}</p>
                        <p>{item.category}</p>
                        <p>{item.color}</p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between gap-2">
                        <button
                          className="button w-50"
                          onClick={() => editproduct(item)}
                        >
                          <FaPen />
                        </button>
                        <button
                          className="button w-50"
                          onClick={() => deleteimage(item)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                    <img src={`${backendAPI + "/" + item.image}`} alt="" />
                  </div>
                );
              })
            )}
          </div>
        )}
      </>
    </div>
  );
};

export default FaridsClosetProducts;
