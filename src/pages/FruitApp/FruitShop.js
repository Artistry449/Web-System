import { useEffect, useRef, useState } from "react";
import "./style.css";
import { v4 as uuidv4 } from "uuid";
import FruitList from "./FruitList";

const LOCAL_STORAGE_KEY = "fruitApp.fruits";

export default function FruitShop() {
  const [fruits, setFruits] = useState([]);
  const fruitNameRef = useRef();

  useEffect(() => {
    const storedFruits = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    console.log(storedFruits);
    if (storedFruits) {
      setFruits(storedFruits);
    }
  }, []);

  useEffect(() => {
    if (fruits.length > 0)
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(fruits));
  }, [fruits]);

  function toggleFruit(id) {
    const newFruits = [...fruits];
    const fruit = newFruits.find((fruit) => fruit.id === id);
    fruit.complete = !fruit.complete;
    setFruits(newFruits);
  }

  function handleAddFruits(e) {
    const name = fruitNameRef.current.value;

    if (name === "") return;
    setFruits((prevFruits) => {
      return [
        ...prevFruits,
        {
          id: uuidv4(),
          name: name,
          complete: false,
        },
      ];
    });

    fruitNameRef.current.value = null;
  }

  function handleClearFruits() {
    const newFruits = fruits.filter((fruit) => !fruit.complete);
    setFruits(newFruits);
  }

  return (
    <div className="container">
      <h1>Fruit Shop</h1>
      <div className="content">
        <div className="controllers">
          <input ref={fruitNameRef} type="text" />
          <button onClick={handleAddFruits}>Жагсаалт нэмэх</button>
          <button onClick={handleClearFruits}>Арилгах</button>
          <span>
            Нийт тоо: {fruits.filter((fruit) => !fruit.complete).length}
          </span>
        </div>
        <div>
          <FruitList fruits={fruits} toggleFruit={toggleFruit} />
        </div>
      </div>
    </div>
  );
}
