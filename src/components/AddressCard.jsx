import { useEffect, useState } from "react";
import axios from "axios";
const apiUrl = "https://6218a64a1a1ba20cbaa6ee74.mockapi.io/api/users";

export default function AddressCard({ showCard, setShowCard, hideCard }) {
  const style = {
    display: !showCard ? "none" : "flex"
  };

  const formValue = {
    id: "",
    name: "",
    houseNo: "",
    area: "",
    city: "",
    pincode: ""
  };

  const [addForm, setAddForm] = useState(formValue);
  const [getData, setGetData] = useState([]);

  const submitFormValue = (event, fieldName) => {
    setAddForm((prev) => ({ ...prev, [fieldName]: event.target.value }));
  };

  useEffect(() => {
    (async () => {
      const response = await axios.get(apiUrl);
      setGetData(response.data);
    })();
  }, []);

  const editHandler = ({ id, name, houseNo, area, city, pincode }) => {
    setShowCard(true);
    setAddForm((form) => ({
      ...form,
      id,
      name,
      houseNo,
      area,
      city,
      pincode
    }));
  };

  const deleteHandler = async (id) => {
    const deleteResponse = await axios.delete(`${apiUrl}/${id}`);
    console.log(deleteResponse);
    if (deleteResponse.status === 200) {
      setGetData(getData.filter((item) => item.id !== id));
    }
  };

  const clickHandler = async () => {
    hideCard();
    try {
      if (!addForm.id) {
        const postAddress = await axios.post(apiUrl, addForm);
        console.log("This is response :" + postAddress);
        // console.log(JSON.stringify(postAddress));
        if (postAddress.status === 201 || postAddress.status === 200) {
          setGetData(getData.concat(postAddress.data));
        }
      }
      // Edit Condition
      else {
        const postAddress = await axios.put(`${apiUrl}/${addForm.id}`, addForm);
        console.log("This is put method", postAddress);
        setGetData(
          getData.map((item) =>
            item.id === addForm.id ? postAddress.data : item
          )
        );
      }
    } catch (err) {
      console.log("This is response" + err);
    }
  };

  return (
    <>
      {/* Address Card */}

      {getData.map((ele) => (
        <div key={ele.id} className="card card--text">
          <header className="card__heading">{ele.name}</header>
          <p className="card__place">{ele.houseNo}</p>
          <p className="card__desc">{ele.area}</p>
          <p className="card__desc">
            {ele.city} - {ele.pincode}
          </p>
          <div className="button">
            <button onClick={() => editHandler(ele)} className="btn">
              Edit
            </button>
            <button onClick={() => deleteHandler(ele.id)} className="btn">
              Delete
            </button>
          </div>
        </div>
      ))}

      {/* Address Input Form */}

      <div style={style} className="card cards card--text">
        <label>Name</label>
        <input
          value={addForm.name}
          className="input-txt"
          type="text"
          autoComplete="off"
          onChange={(e) => submitFormValue(e, "name")}
        />
        <label>Flat, House no., Building</label>
        <input
          value={addForm.houseNo}
          className="input-txt"
          type="text"
          autoComplete="off"
          onChange={(e) => submitFormValue(e, "houseNo")}
        />
        <label>Area, Colony, Street</label>
        <input
          value={addForm.area}
          className="input-txt"
          type="text"
          autoComplete="off"
          onChange={(e) => submitFormValue(e, "area")}
        />
        <label>Town/City</label>
        <input
          value={addForm.city}
          className="input-txt"
          type="text"
          autoComplete="off"
          onChange={(e) => submitFormValue(e, "city")}
        />
        <label>Pincode</label>
        <input
          value={addForm.pincode}
          className="input-txt"
          type="number"
          autoComplete="off"
          onChange={(e) => submitFormValue(e, "pincode")}
        />
        <div className="action-btn">
          <button onClick={clickHandler} className="btn">
            Save
          </button>
          <button className="btn" onClick={hideCard}>
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
