import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import ToggleMenu from "../ToggleMenu";
import { FaTrash } from "react-icons/fa";
import Loader from "../Loader";

const NightSuitCoupon = () => {
  const { backendAPI } = useContext(AppContext);
  const [coupon, setCoupon] = useState({
    name: "",
    discount: "",
    type: "",
  });
  const handleinput = (e) => {
    const { name, value } = e.target;
    setCoupon({
      ...coupon,
      [name]: value,
    });
  };
  //
  const addCoupon = async (e) => {
    e.preventDefault();
    const { name, discount, type } = coupon;
    try {
      const res = await fetch(backendAPI + "/api/post/nightsuit/coupon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, discount, type }),
      });
      const data = await res.json();
      console.log(data);
      //
      if (res.status === 200) {
        fetchCoupon();
        setCoupon({
          name: "",
          discount: "",
          type: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  //
  const [couponList, setCouponList] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchCoupon = async () => {
    try {
      setLoading(true);
      const res = await fetch(backendAPI + "/api/get/nightsuit/coupon");
      const data = await res.json();
      console.log(data);
      //
      if (res.status === 200) {
        setLoading(false);
        setCouponList(data);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCoupon();
  }, []);
  //
  const deleteCoupon = async (item) => {
    try {
      const res = await fetch(backendAPI + "/api/delete/nightsuit/coupon", {
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
      if (res.status === 200) {
        fetchCoupon();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container-fluid p-lg-2 p-0">
      <div className="d-flex align-items-center justify-content-between gap-2 mb-4">
        <h1>The Night Suit Co</h1>
        <ToggleMenu />
      </div>
      <form className="row align-items-center justify-content-between gap-sm-0 gap-4 mx-0">
        <div className="col-lg-3 col-sm-4 px-sm-2 px-0">
          <input
            type="text"
            className="form-control"
            name="name"
            value={coupon.name}
            onChange={handleinput}
            placeholder="Enter a coupon code"
          />
        </div>
        <div className="col-lg-3 col-sm-4 px-sm-2 px-0">
          <input
            type="number"
            className="form-control"
            name="discount"
            value={coupon.discount}
            onChange={handleinput}
            placeholder="Enter discount value"
          />
        </div>
        <div className="col-lg-3 col-sm-4 px-sm-2 px-0">
          <select
            className="form-control"
            name="type"
            value={coupon.type}
            onChange={handleinput}
          >
            <option value="" disabled>
              Select discount type
            </option>
            <option value="percent">Percent</option>
            <option value="rupees">Rupees</option>
          </select>
        </div>
        <div className="col-lg-3 text-end mt-lg-0 mt-sm-4">
          <button className="button" onClick={addCoupon}>
            Generate
          </button>
        </div>
      </form>

      <hr />
      <>
        {loading ? (
          <Loader />
        ) : couponList.length === 0 ? (
          <p className="text-center">No record to show</p>
        ) : (
          couponList.map((item, index) => {
            return (
              <div
                className={`d-flex align-items-center justify-content-between gap-2 rounded border p-2 ${
                  index === couponList.length - 1 ? "" : "mb-2"
                }`}
                key={index}
              >
                <div>
                  <p>
                    <span className="fw-bold">Name:</span> {item.name}
                  </p>
                  <p>
                    <span className="fw-bold">Discount:</span>{" "}
                    {item.type === "rupees" ? "Rs." : ""}
                    {item.discount}
                    {item.type === "percent" ? "%" : ""}
                  </p>
                </div>
                <button className="button" onClick={() => deleteCoupon(item)}>
                  <FaTrash />
                </button>
              </div>
            );
          })
        )}
      </>
    </div>
  );
};

export default NightSuitCoupon;
