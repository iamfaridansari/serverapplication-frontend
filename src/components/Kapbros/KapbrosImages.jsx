import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import ToggleMenu from "../ToggleMenu";
import Loader from "../Loader";

const KapbrosImages = () => {
  const { backendAPI } = useContext(AppContext);
  const [image, setImage] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  //
  const uploadImage = async (e) => {
    e.preventDefault();
    //
    if (image === "") {
      window.alert("Please select an image");
    } else {
      const formData = new FormData();
      formData.append("image", image);
      try {
        const res = await fetch(`${backendAPI}/api/post/kapbros/products`, {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        console.log(data);
        getkapbrosimages();
      } catch (error) {
        console.log(error);
      }
    }
  };
  //
  const getkapbrosimages = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${backendAPI}/api/get/kapbros/products`);
      const data = await res.json();
      console.log(data);
      if (res.status === 200) {
        setLoading(false);
        setImages(data);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getkapbrosimages();
  }, []);
  //
  const deleteimage = async (item) => {
    const res = await fetch(`${backendAPI}/api/delete/kapbros/products`, {
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
    getkapbrosimages();
  };
  return (
    <div className="container-fluid p-lg-2 p-0">
      <div className="d-flex align-items-center justify-content-between gap-2 mb-4">
        <h1>Kapbros</h1>
        <ToggleMenu />
      </div>
      <form className="d-flex align-items-end justify-content-between flex-sm-row flex-column gap-2">
        <input
          multiple
          type="file"
          className="form-control"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button className="button" onClick={uploadImage}>
          Upload
        </button>
      </form>
      <hr />
      <>
        {loading ? (
          <Loader />
        ) : images.length === 0 ? (
          <p className="text-center">No record to show</p>
        ) : (
          <div className="imagegrid mt-4">
            {images.map((item, index) => {
              return (
                <img
                  src={`${backendAPI + "/" + item.image}`}
                  key={index}
                  onDoubleClick={() => deleteimage(item)}
                  alt=""
                />
              );
            })}
          </div>
        )}
      </>
    </div>
  );
};

export default KapbrosImages;
