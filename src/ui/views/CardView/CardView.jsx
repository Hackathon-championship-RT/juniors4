import "./CardView.css";

export default function CardView({ card }) {
  return (
    <>
      <div className="card-root">
        <img src={card.imagePath} className="card-logo-img" />
      </div>
    </>
  );
}
