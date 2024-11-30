import "./PlaygroundView.css";
import CardView from "../CardView/CardView";
import cards from "../../../../public/config/cards_config.json";
import { calculateScore } from "../../../domain/calculate";
import { shufflePlayGround } from "../../../domain/shuffle";
import { useState, useEffect } from "react";

export default function PlaygroundView({
  generatedPlayground,
  onFinish,
  onGeneratedPlaydoundUpdate,
}) {
  const [side, setSide] = useState(generatedPlayground[0].length);
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [timerIsRed, setTimerIsRed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalAbout, setShowModalAbout] = useState(0);
  const [modalSteps, setModalSteps] = useState(Array(cards.length).fill(0));
  const [modalType, setModalType] = useState(0);
  const [eduMode, setEduMode] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      if (!showModal) {
        setTimer((prev) => Math.round((prev + 0.1) * 10) / 10);
      }
    }, 100);

    setIntervalId(id);
    return () => clearInterval(id);
  }, [showModal]);

  const [screenDimensions, setScreenDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const timerHeight = 60;

  useEffect(() => {
    const handleResize = () => {
      setScreenDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const screenHeight = screenDimensions.height;
  const screenWidth = screenDimensions.width;

  const playgroundSize = Math.min(
    screenWidth - 100,
    screenHeight - timerHeight - 160
  );

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${side}, 1fr)`,
    gridTemplateRows: `repeat(${side}, 1fr)`,
    gap: "10px",
    width: `${playgroundSize}px`,
    height: `${playgroundSize}px`,
  };

  var [incorrectCount, setIncorrectCount] = useState(0);
  var [correctCount, setCorrectCount] = useState(0);
  var [currentScore, setCurrentScore] = useState(0);

  var [selected, setIsSelected] = useState(null);
  var [pairFound, setPairFound] = useState(null);
  var [error, setError] = useState(null);
  var [accepted, setAccepted] = useState(null);
  var [closed, setClosed] = useState(0);
  const [positions, setPositions] = useState(
    Array(side * side).fill(generatedPlayground.length - 1)
  );
  const [shownItems, setShownItems] = useState(Array(side * side).fill(true));
  const [progressBarWidth, setProgressBarWidth] = useState(
    ((closed + 2) / (side * side * generatedPlayground.length)) * 100
  );

  const handleCloseModal = () => {
    const modalOverlay = document.querySelector(".modal-overlay");
    const modalWindow = document.querySelector(".modal-window");

    if (modalOverlay && modalWindow) {
      modalOverlay.classList.add("fade-out");
      modalWindow.classList.add("fade-out");
      setTimeout(() => setShowModal(false), 300);
    }
  };

  useEffect(() => {
    if (showModal) {
      const modalOverlay = document.querySelector(".modal-overlay");
      const modalWindow = document.querySelector(".modal-window");
      modalOverlay?.classList.add("show");
    }
  }, [showModal]);

  function shufflePlayground2() {
    let newMatrix = [];
    for (let i = 0; i < generatedPlayground.length; i++) {
      newMatrix.push([]);
      for (let j = 0; j < side; j++) {
        newMatrix[i].push([]);
        for (let k = 0; k < side; k++) {
          const element = generatedPlayground[i][j][k];
          if (i <= positions[j * side + k] && shownItems[j * side + k]) {
            newMatrix[i][j].push(element);
          } else {
            newMatrix[i][j].push(null);
          }
        }
      }
    }

    let res = shufflePlayGround(newMatrix, side);

    let newPos = Array(side * side).fill(generatedPlayground.length - 1);
    for (let i = generatedPlayground.length - 1; i >= 0; i--) {
      for (let j = 0; j < side; j++) {
        for (let k = 0; k < side; k++) {
          if (res[i][j][k] == null) {
            newPos[j * side + k] = i - 1;
          }

          if (newPos[j * side + k] < 0) {
            setShownItems((prev) => {
              const updated = [...prev];
              updated[j * side + k] = false;
              return updated;
            });
          } else {
            setShownItems((prev) => {
              const updated = [...prev];
              updated[j * side + k] = true;
              return updated;
            });
          }
        }
      }
    }

    setPositions(newPos);
    onGeneratedPlaydoundUpdate(res);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
      }}
    >
      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-window" onClick={(e) => e.stopPropagation()}>
            {modalType === 0 ? (
              <div>
                <h3>История бренда</h3>
                <span>{cards[showModalAbout].history}</span>
              </div>
            ) : modalType === 2 ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <h3>Основатель {cards[showModalAbout].name}</h3>
                <img
                  src={cards[showModalAbout].founder.image}
                  height={200}
                  width={150}
                  style={{ objectFit: "cover" }}
                />
                <span>{cards[showModalAbout].founder.name}</span>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <h3>Автомобили {cards[showModalAbout].name}</h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                >
                  {cards[showModalAbout].cars.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        marginBottom: "20px",
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        height={200}
                        width={150}
                        style={{ objectFit: "cover" }}
                      />
                      <span>{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="timer">
        <h2
          className="time"
          style={{ color: timerIsRed ? "var(--red)" : "var(--text-color)" }}
        >
          {timer.toFixed(1)}
        </h2>
      </div>

      <div style={{ width: "100%", marginTop: "10px", marginBottom: "20px" }}>
        <div
          style={{
            height: "10px",
            backgroundColor: "#e0e0e0",
            borderRadius: "5px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progressBarWidth}%`,
              height: "100%",
              backgroundColor: "var(--purple)",
              transition: "width 0.3s ease-in-out",
            }}
          ></div>
        </div>
      </div>

      <div className="playground-container" style={gridStyle}>
        {Array.from({ length: side * side }).map((_, index) => (
          <div
            key={index}
            onClick={() => {
              if (pairFound != null || !shownItems[index]) {
                return;
              }
              if (index === selected) {
                setIsSelected(null);
              } else if (selected != null) {
                const current =
                  generatedPlayground[positions[index]][
                    Math.floor(index / side)
                  ][index % side];
                const selected2 =
                  generatedPlayground[positions[selected]][
                    Math.floor(selected / side)
                  ][selected % side];

                if (current === selected2) {
                  setCorrectCount(correctCount + 1);
                  setProgressBarWidth(
                    ((closed + 2) /
                      (side * side * generatedPlayground.length)) *
                      100
                  );
                  if (
                    eduMode &&
                    closed < side * side * generatedPlayground.length - 2
                  ) {
                    if (
                      modalSteps[current] == 0 ||
                      modalSteps[current] == 2 ||
                      modalSteps[current] == 4
                    ) {
                      setShowModalAbout(current);
                      setModalType(modalSteps[current]);
                      setShowModal(true);
                    }
                    setModalSteps((prev) => {
                      const updated = [...prev];
                      updated[current] = updated[current] + 1;
                      return updated;
                    });
                  }
                  setAccepted(index);
                  setPairFound(true);
                  setTimeout(() => {
                    setPositions((prev) => {
                      const updated = [...prev];
                      if (updated[index] > 0) {
                        updated[index]--;
                      } else {
                        setShownItems((prev) => {
                          const updated = [...prev];
                          updated[index] = false;
                          return updated;
                        });
                      }
                      if (updated[selected] > 0) {
                        updated[selected]--;
                      } else {
                        setShownItems((prev) => {
                          const updated = [...prev];
                          updated[selected] = false;
                          return updated;
                        });
                      }
                      return updated;
                    });
                    setClosed(closed + 2);
                    setPairFound(null);
                    setIsSelected(null);
                    setAccepted(null);
                    setError(null);
                    if (
                      closed ===
                      side * side * generatedPlayground.length - 2
                    ) {
                      onFinish(timer);
                    }
                  }, 300);
                } else {
                  setIncorrectCount(incorrectCount + 1);
                  setTimer(timer + 1);
                  setTimerIsRed(true);
                  setTimeout(() => {
                    setTimerIsRed(false);
                  }, 300);
                  setError(index);
                  setTimeout(() => {
                    setAccepted(null);
                    setError(null);
                  }, 300);
                }
              } else {
                setIsSelected(index);
              }

              setCurrentScore(calculateScore(correctCount, incorrectCount));
            }}
          >
            <CardView
              card={
                cards[
                  generatedPlayground[Math.max(0, positions[index])][
                    Math.floor(index / side)
                  ][index % side]
                ] || cards[0]
              }
              isSelected={selected === index}
              isError={error === index}
              isAccepted={accepted === index}
              showItem={shownItems[index]}
            />
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: "20px",
          height: "30px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <label>
          <input
            type="checkbox"
            checked={eduMode}
            onChange={() => setEduMode((prev) => !prev)}
            style={{ verticalAlign: "middle" }}
          />
          <span style={{ marginLeft: "8px", verticalAlign: "middle" }}>
            Образовательный режим
          </span>
        </label>
      </div>

      <button
        style={{ marginTop: "10px" }}
        onClick={() => shufflePlayground2()}
      >
        Пермешать
      </button>
    </div>
  );
}
