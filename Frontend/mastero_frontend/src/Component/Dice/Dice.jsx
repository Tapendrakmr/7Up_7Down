import "./Dice.css"; // Import CSS file

// eslint-disable-next-line react/prop-types
const Dice = ({ transform }) => {
  return (
    // <div className="container">
    <div className="dice" style={{ transform }}>
      <div className="face front"></div>
      <div className="face back"></div>
      <div className="face top"></div>
      <div className="face bottom"></div>
      <div className="face right"></div>
      <div className="face left"></div>
    </div>
    // </div>
  );
};

export default Dice;
