import React from "react";
import Fruit from "./Fruit";
import "./style.css";

export default function FruitList({ fruits, toggleFruit }) {
  return (
    <div className="fruits">
      {fruits.map((fruit) => {
        return <Fruit key={fruit.id} toggleFruit={toggleFruit} fruit={fruit} />;
      })}
    </div>
  );
}
