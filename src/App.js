import "./styles.css";
import { useState } from "react";
import AddressCard from "./components/AddressCard";

//const apiUrl = "https://6218a64a1a1ba20cbaa6ee74.mockapi.io/api/users";

export default function App() {
  const [showCard, setShowCard] = useState(false);
  const clickHandler = () => {
    setShowCard(true);
  };

  return (
    <div className="App">
      <h1>Address Management</h1>
      <button className="btn" onClick={clickHandler}>
        + Add Address
      </button>
      <AddressCard
        showCard={showCard}
        setShowCard={setShowCard}
        hideCard={() => setShowCard(false)}
      />
    </div>
  );
}
