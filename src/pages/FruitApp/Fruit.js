import "./style.css";

export default function Fruit({ fruit, toggleFruit }) {
  function handleFruitClick() {
    toggleFruit(fruit.id);
  }

  return (
    <div className="fruit">
      <label>
        <input
          type="checkbox"
          checked={fruit.complete}
          onChange={handleFruitClick}
        />
        {fruit.name}
      </label>
    </div>
  );
}
