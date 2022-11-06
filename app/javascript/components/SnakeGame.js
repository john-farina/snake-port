import React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import drawGrid from "../functions/drawGrid";
import moveSnakeCoords from "../functions/moveSnakeCoords";
import randomFoodCoords from "../functions/randomFoodCoords";
import growSnakeByOne from "../functions/growSnakeByOne";
import snakeToSnakeCollision from "../functions/snakeToSnakeCollision";
import getStyledNum from "../functions/getStyledNum";
import scoreBasedQuotes from "../functions/scoreBasedQuotes";
import ArrowSvg from "./images/arrowsvg.svg";
import ScreenTexture from "./images/screentext.png";
import SmallScreenTexture from "./images/smallScreentext.png";
import PlasticTexture from "./images/plasticText.jpg";
import SaveIcon from "./images/save.svg";

// HEAD === Snake Head
// BODY === Snake Body
// TAIL === Snake Tail
// 15x15 grid always (idk why but thats what i chose)

//when game ends show screen if they want to save score

export default function SnakeGame(highscores) {
  let [snake, setSnake] = useState([
    [12, 12],
    [12, 13],
  ]);
  const foodCoords = useRef(randomFoodCoords(snake));
  const grid = useMemo(
    () => drawGrid(15, snake, foodCoords.current),
    [snake, foodCoords.current]
  );
  const snakeDirection = useRef("left");
  let snakeUpdateTime = 120;
  const gameStart = useRef(false);
  const [firstStart, setFirstStart] = useState(true);
  const startScreenClass = useRef("");
  const [countDownClass, setCountDownClass] = useState("");
  const [timer, setTimer] = useState(3);
  const [endScreenClass, setEndScreen] = useState("");
  const [leaderboardClass, setLeaderboardClass] = useState("");
  const [saveScoreClass, setSaveScoreClass] = useState("");

  // console.log("ALL PLAYERS SCORE MODEL", highscores.highscores);

  function clearAllScreens() {
    setEndScreen("");
    startScreenClass.current = "";
    setCountDownClass("");
    setLeaderboardClass("");
    setSaveScoreClass("");
  }

  function resetGame() {
    setSnake([
      [12, 12],
      [12, 13],
    ]);

    foodCoords.current = randomFoodCoords(snake);

    snakeDirection.current = "left";

    gameStart.current = false;

    setFirstStart(true);

    setTimer(3);

    clearAllScreens();
  }

  function countDownThreeThenStart() {
    let newTime = 3;

    setCountDownClass("showCountdown");

    const interval = setInterval(function () {
      console.log(newTime);

      if (newTime <= 0) {
        console.log("GO");
        setCountDownClass("");
        gameStart.current = true;
        clearInterval(interval);
      }

      newTime = newTime - 1;

      setTimer(newTime);
    }, 1000);
  }

  function endGame() {
    let scoreIsHigher = false;
    let leaderboard = highscores.highscores;

    // SHOW THE NICE-JOB SCREEN

    for (let i = 0; i < leaderboard.length; i++) {
      if (snake.length - 2 >= leaderboard[i].score) {
        scoreIsHigher = true;
      }
    }

    if (scoreIsHigher) {
      setEndScreen("");
      setSaveScoreClass("showSave");
    } else {
      //wait 5 sec then show leadboards
      setEndScreen("showEnd");
      // setTimeout(() => {
      //   console.log(endScreenClass);
      //   setEndScreen("");
      //   setLeaderboardClass("showLeaderboard");
      // }, 5000);
    }

    // (basically a return)
    gameStart.current = false;
  }

  function restartGameAfterEnd() {
    setEndScreen("");
    setTimer(3);
    setSnake([
      [12, 12],
      [12, 13],
    ]);
    setLeaderboardClass("");
    setSaveScoreClass("");
    foodCoords.current = randomFoodCoords(snake);
    snakeDirection.current = "left";
    gameStart.current = false;
    countDownThreeThenStart();
  }

  function startGame() {
    if (firstStart === true) {
      //set first start to false
      setFirstStart(false);

      //set timer for 3 sec (show animation) THEN
      // gameStart.current = true; (start the actual game)
      countDownThreeThenStart();
    } else {
      countDownThreeThenStart();
    }
  }

  function eatCube() {
    setSnake((s) => growSnakeByOne(s, snakeDirection.current));
    foodCoords.current = randomFoodCoords(snake);
  }

  function foodToHeadCollision(snakeHeadCoords, foodCoords) {
    // console.time("foodToHeadCollision");
    if (
      snakeHeadCoords[0][0] === foodCoords[0] &&
      snakeHeadCoords[0][1] === foodCoords[1]
    ) {
      eatCube();
    } else {
    }
    // console.timeEnd("foodToHeadCollision");
  }

  function snakeToWallCollision(snake, gridSize, endGame) {
    let size = gridSize - 1;
    let headRow = snake[0][0];
    let headColumn = snake[0][1];

    // if going left & snakeColumn = 0 (LOOSE)
    if (headColumn === 0) {
      //time out so u can quickly move and avoid dying
      setTimeout(() => {
        if (snakeDirection.current === "left") {
          // alert("you stink loser");
          endGame();
        }
      }, snakeUpdateTime - 50);
    }

    // if going right & snakeColumn = gridSize (LOOSE)
    if (headColumn === size) {
      setTimeout(() => {
        if (snakeDirection.current === "right") {
          // alert("you stink loser");
          endGame();
        }
      }, snakeUpdateTime - 50);
    }

    // if going up & snakeRow = 0 (LOOSE)
    if (headRow === 0) {
      setTimeout(() => {
        if (snakeDirection.current === "up") {
          // alert("you stink loser");
          endGame();
        }
      }, snakeUpdateTime - 50);
    }

    // if going down & snakeRow = gridSize(LOOSE)
    if (headRow === size) {
      setTimeout(() => {
        if (snakeDirection.current === "down") {
          // alert("you stink loser");
          endGame();
        }
      }, snakeUpdateTime - 50);
    }
  }

  const foodCollision = useMemo(
    () => foodToHeadCollision(snake, foodCoords.current),
    [snake]
  );

  const { scoreOne, scoreTwo, scoreThree } = useMemo(() => {
    const one = getStyledNum(snake.length, 1);
    const two = getStyledNum(snake.length, 2);
    const three = getStyledNum(snake.length, 3);

    return { scoreOne: one, scoreTwo: two, scoreThree: three };
  }, [snake]);

  const { snakeToSnakeCollis, snakeToWallCollis } = useMemo(() => {
    // {destructuring, stuff, wow}
    // const { a, b } = { a: "hello", b: "hello from b" };

    const snakeToSnakeCollided = snakeToSnakeCollision(snake, endGame);

    const snakeToWallCollided = snakeToWallCollision(
      snake,
      grid.length,
      endGame
    );

    return {
      snakeToSnakeCollis: snakeToSnakeCollided,
      snakeToWallCollis: snakeToWallCollided,
    };
  }, [snake]);

  useEffect(() => {
    const snakeInterval = setInterval(() => {
      if (gameStart.current) {
        setSnake((s) =>
          moveSnakeCoords(s, snakeDirection.current, grid.length)
        );
      }
    }, snakeUpdateTime);

    return () => clearInterval(snakeInterval);
  }, []);

  function allClicks(direction) {
    if (direction === "left") {
      if (snakeDirection.current !== "right") {
        snakeDirection.current = "left";
      }
    }

    if (direction === "right") {
      if (snakeDirection.current !== "left") {
        snakeDirection.current = "right";
      }
    }

    if (direction === "down") {
      if (snakeDirection.current !== "up") {
        snakeDirection.current = "down";
      }
    }

    if (direction === "up") {
      if (snakeDirection.current !== "down") {
        snakeDirection.current = "up";
      }
    }
  }

  const handleKeyDown = (event, direction) => {
    // console.log("pressed ", event);

    // if (event.key === "f") {
    //   eatCube();
    // }

    // if (event.key === "p") {
    //   restartGameAfterEnd();
    // }

    if (event.key === "ArrowUp" || event === "MoveUp") {
      allClicks("up");
    }

    if (event.key === "ArrowDown" || event === "MoveDown") {
      allClicks("down");
    }

    if (event.key === "ArrowLeft" || event === "MoveLeft") {
      allClicks("left");
    }

    if (event.key === "ArrowRight" || event === "MoveRight") {
      allClicks("right");
    }

    // if (event.key === "Enter") {
    //   if (!gameStart.current) {
    //     startGame();
    //   } else {
    //     gameStart.current = false;
    //     setFirstStart(true);
    //     setEndScreen("");
    //   }
    // }
  };

  const endStartEvent = useMemo(() => {
    console.log("start now", firstStart);
    if (firstStart) {
      startScreenClass.current = "showStart";
    } else {
      startScreenClass.current = "";
    }
  }, [firstStart]);

  function smartGameStartClick() {
    if (firstStart === true) {
      startGame();
    }
  }

  function countDownText(time) {
    if (time === 0) {
      return <p className="numbers numWords">GO!</p>;
    } else {
      return <p className={`numbers num${time}`}>{time}</p>;
    }
  }

  function scoreLoop(highscores) {
    let arr = highscores.highscores;
    let reactArray = [];

    for (let i = 0; i < arr.length; i++) {
      if (i === 0) {
        reactArray.push(
          <div className="score first">
            <p className="playerName">{arr[i].name}</p>
            <p className="playerName">-</p>
            <p className="playerScore">
              {getStyledNum(arr[i].score, 1)}
              {getStyledNum(arr[i].score, 2)}
              {getStyledNum(arr[i].score, 3)}
            </p>
          </div>
        );
      } else if (i === 1) {
        reactArray.push(
          <div className="score second">
            <p className="playerName">{arr[i].name}</p>
            <p className="playerName">-</p>
            <p className="playerScore">
              {getStyledNum(arr[i].score, 1)}
              {getStyledNum(arr[i].score, 2)}
              {getStyledNum(arr[i].score, 3)}
            </p>
          </div>
        );
      } else if (i === 2) {
        reactArray.push(
          <div className="score third">
            <p className="playerName">{arr[i].name}</p>
            <p className="playerName">-</p>
            <p className="playerScore">
              {getStyledNum(arr[i].score, 1)}
              {getStyledNum(arr[i].score, 2)}
              {getStyledNum(arr[i].score, 3)}
            </p>
          </div>
        );
      } else {
        reactArray.push(
          <div className="score">
            <p className="playerName">{arr[i].name}</p>
            <p className="playerName">-</p>
            <p className="playerScore">
              {getStyledNum(arr[i].score, 1)}
              {getStyledNum(arr[i].score, 2)}
              {getStyledNum(arr[i].score, 3)}
            </p>
          </div>
        );
      }
    }

    return reactArray;
  }

  return (
    <div className="pageContainer" onClick={() => smartGameStartClick()}>
      <img src={PlasticTexture} className="plasticTexture" alt="" />
      <main className="device" onKeyDown={handleKeyDown} tabIndex="0">
        <div className="topLight"></div>
        <div className="deviceScreen">
          <img src={ScreenTexture} className="screenTexture" alt="" />

          <div className={`popUpScreen highScores ${leaderboardClass}`}>
            <h1 className="boardTitle">HIGHSCORES</h1>
            <div className="scoresContainer">{scoreLoop(highscores)}</div>

            <p
              onClick={() => {
                restartGameAfterEnd();
              }}
              className="retryBtn"
            >
              PLAY AGAIN?
            </p>
          </div>

          <div className={`popUpScreen saveScoreScreen ${saveScoreClass}`}>
            <h1 className="newHigh">NEW HIGHSCORE!</h1>
            <h2 className="points">{snake.length - 2} POINTS!</h2>
            <h2 className="newSubText">TYPE IN 3 LETTERS TO SAVE</h2>
            <button
              className="closeSave"
              onClick={() => {
                setSaveScoreClass("");
                setLeaderboardClass("showLeaderboard");
              }}
            >
              X
            </button>
            <form
              onSubmit={() => {
                alert("submit");
              }}
              className="scoreForm"
              action=""
            >
              <div className="holder">
                <input
                  className="scoreInput"
                  placeholder={"JDF"}
                  type="text"
                  name="name"
                  id="name"
                  maxLength={3}
                />

                <button className="scoreSubmit" type="submit">
                  <img src={SaveIcon} className="saveIcon" alt="" />
                </button>
              </div>
            </form>
          </div>

          <div className={`popUpScreen endScreen ${endScreenClass}`}>
            <p className="words">{scoreBasedQuotes(snake.length - 2)}</p>
            <p className="score">
              score: {scoreOne}
              {scoreTwo}
              {scoreThree}
            </p>
            <p
              className="highscores"
              onClick={() => {
                setEndScreen("");
                setLeaderboardClass("showLeaderboard");
              }}
            >
              ALL HIGHSCORES
            </p>
            <p
              onClick={() => {
                restartGameAfterEnd();
              }}
              className="retryBtn"
            >
              PLAY AGAIN?
            </p>
          </div>

          <div
            className={`popUpScreen startScreen ${startScreenClass.current}`}
          >
            {/* <h1>hi</h1> */}
            <p className="words">Press Anything To Start!</p>
          </div>

          <div className={`popUpScreen countDown ${countDownClass}`}>
            {countDownText(timer)}
          </div>

          <div className="topRow">
            <h1 className="title">s n a k e.</h1>
            <div className="scoreCounter">
              <img src={SmallScreenTexture} className="scoreScreen" alt="" />
              <div className="number">
                <p>{scoreOne}</p>
              </div>
              <div className="number">
                <p>{scoreTwo}</p>
              </div>
              <div className="number">
                <p>{scoreThree}</p>
              </div>
            </div>
          </div>

          {grid.map((row) => {
            return (
              <div className="gridRow">
                {row.map((gridItem) => {
                  if (gridItem === null) {
                    return (
                      <div className="box emptyGrid">
                        <p>GRID</p>
                      </div>
                    );
                  } else if (gridItem === "FOOD") {
                    return <div className="box food"></div>;
                  } else if (gridItem === "HEAD") {
                    return (
                      <div className={`box snake ${snakeDirection.current}`}>
                        <div className="snakeHead">
                          <div className="eye"></div>
                          <div className="eye"></div>
                        </div>
                      </div>
                    );
                  } else if (gridItem === "BODY") {
                    return <div className="box snake snakeBody"></div>;
                  } else if (gridItem === "TAIL") {
                    return <div className="box snake snakeTail"></div>;
                  }
                })}
              </div>
            );
          })}
        </div>

        <div className="middleBtns">
          <div className="resetContainer">
            <button
              className="functionButtons"
              onClick={() => {
                resetGame();
              }}
            ></button>
            <p>RESET</p>
          </div>
        </div>

        <div className="buttonContainer">
          <div className="middle">
            <button
              className="leftButton"
              onTouchStart={() => handleKeyDown("MoveLeft")}
              onClick={() => handleKeyDown("MoveLeft")}
            >
              <img className="leftIcon arrow" src={ArrowSvg} alt="" />
            </button>
          </div>

          <div className="top">
            <button
              className="upButton"
              onTouchStart={() => handleKeyDown("MoveUp")}
              onClick={() => handleKeyDown("MoveUp")}
            >
              <img className="upIcon arrow" src={ArrowSvg} alt="" />
            </button>

            <button
              className="downButton"
              onTouchStart={() => handleKeyDown("MoveDown")}
              onClick={() => handleKeyDown("MoveDown")}
            >
              <img className="downIcon arrow" src={ArrowSvg} alt="" />
            </button>
          </div>

          <div className="bottom">
            <button
              className="rightButton"
              onTouchStart={() => handleKeyDown("MoveRight")}
              onClick={() => handleKeyDown("MoveRight")}
            >
              <img className="rightIcon arrow" src={ArrowSvg} alt="" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
