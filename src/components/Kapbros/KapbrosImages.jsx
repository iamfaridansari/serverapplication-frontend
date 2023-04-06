import React, { useEffect, useState } from "react";
import ToggleMenu from "../ToggleMenu";

const KapbrosImages = () => {
  const [image, setImage] = useState("");
  const [images, setImages] = useState([]);
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
        const res = await fetch("/api/post/kapbros/products", {
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
    const res = await fetch("/api/get/kapbros/products");
    const data = await res.json();
    console.log(data);
    if (res.status === 200) {
      setImages(data);
    }
  };
  useEffect(() => {
    getkapbrosimages();
  }, []);
  //
  const deleteimage = async (item) => {
    const res = await fetch("/api/delete/kapbros/products", {
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
      <div className="imagegrid mt-4">
        {images.map((item, index) => {
          return (
            <img
              src={`http://localhost:3001/${item.image}`}
              key={index}
              onDoubleClick={() => deleteimage(item)}
              alt=""
            />
          );
        })}
      </div>
    </div>
  );
};

export default KapbrosImages;
