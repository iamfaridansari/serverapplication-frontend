import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { category, colors, fabric } from "../../assets/data/nightsuitdata";
import { FaPen, FaTrash } from "react-icons/fa";
import ToggleMenu from "../ToggleMenu";

const NightSuitProducts = () => {
  const { backendAPI } = useContext(AppContext);
  const [product, setProduct] = useState({
    name: "",
    category: "",
    mrp: "",
    price: "",
    color: "",
    fabric: "",
  });
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const handleinput = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };
  //
  const saveProducts = async (e) => {
    e.preventDefault();
    //
    if (
      !product.name ||
      !product.category ||
      !product.mrp ||
      !product.price ||
      !product.color ||
      !product.fabric ||
      !image1
    ) {
      window.alert("Enter complete details");
    } else {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("category", product.category);
      formData.append("mrp", product.mrp);
      formData.append("price", product.price);
      formData.append("color", product.color);
      formData.append("fabric", product.fabric);
      formData.append("image1", image1);
      formData.append("image2", image2);
      formData.append("image3", image3);
      formData.append("image4", image4);
      //
      const res = await fetch(backendAPI + "/api/post/nightsuit/products", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log(data);
      //
      if (res.status === 200) {
        setProduct({
          name: "",
          category: "",
          mrp: "",
          price: "",
          color: "",
          fabric: "",
        });
        getProducts();
      }
    }
    //
  };
  //
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    const res = await fetch(backendAPI + "/api/get/nightsuit/products");
    const data = await res.json();
    console.log(data);
    //
    if (res.status === 200) {
      setProducts(data);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  //
  const deleteimage = async (item) => {
    const res = await fetch(backendAPI + "/api/delete/nightsuit/products", {
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
    getProducts();
  };
  return (
    <div className="container-fluid p-lg-2 p-0">
      <div className="d-flex align-items-center justify-content-between gap-2 mb-4">
        <h1>The Night Suit Co</h1>
        <ToggleMenu />
      </div>

      <form>
        <div className="formgrid">
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleinput}
              className="form-control"
            />
          </div>
          <div>
            <label>Category</label>
            <select
              name="category"
              value={product.category}
              onChange={handleinput}
              className="form-control"
            >
              <option></option>
              {category.map((item, index) => {
                return (
                  <option value={item.replace(/\s/g, "")} key={index}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label>MRP</label>
            <input
              type="number"
              name="mrp"
              value={product.mrp}
              onChange={handleinput}
              className="form-control"
            />
          </div>
          <div>
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleinput}
              className="form-control"
            />
          </div>
          <div>
            <label>Color</label>
            <select
              name="color"
              value={product.color}
              onChange={handleinput}
              className="form-control"
            >
              <option></option>
              {colors.map((item, index) => {
                return (
                  <option value={item.replace(/\s/g, "")} key={index}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label>Fabric</label>
            <select
              name="fabric"
              value={product.fabric}
              onChange={handleinput}
              className="form-control"
            >
              <option></option>
              {fabric.map((item, index) => {
                return (
                  <option value={item.replace(/\s/g, "")} key={index}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label>Image 1</label>
            <input
              type="file"
              name="image1"
              onChange={(e) => setImage1(e.target.files[0])}
              className="form-control"
            />
          </div>
          <div>
            <label>Image 2</label>
            <input
              type="file"
              name="image2"
              onChange={(e) => setImage2(e.target.files[0])}
              className="form-control"
            />
          </div>
          <div>
            <label>Image 3</label>
            <input
              type="file"
              name="image3"
              onChange={(e) => setImage3(e.target.files[0])}
              className="form-control"
            />
          </div>
          <div>
            <label>Image 4</label>
            <input
              type="file"
              name="image4"
              onChange={(e) => setImage4(e.target.files[0])}
              className="form-control"
            />
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-end gap-2 mt-4">
          <button className="button">Reset</button>
          <button className="button" onClick={saveProducts}>
            Save
          </button>
        </div>
      </form>

      <div className="imagegrid mt-4">
        {products.map((item, index) => {
          return (
            <div className="image" key={index}>
              <div className="desc p-2">
                <div>
                  <p>{item.name}</p>
                  <p>{item.category}</p>
                  <p>{item.mrp}</p>
                  <p>{item.price}</p>
                  <p>{item.color}</p>
                  <p>{item.fabric}</p>
                  <p>Images: {item.images.length}</p>
                </div>
                <div className="d-flex align-items-center justify-content-between gap-2">
                  <button className="button w-50">
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
              <img src={`${backendAPI + "/" + item.images[0].path}`} alt="" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NightSuitProducts;
