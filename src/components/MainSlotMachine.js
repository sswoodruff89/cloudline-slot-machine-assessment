import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { addToWins, addToTries, resetTally } from "../actions/tallyActions";
import Tries from "./Tries";
import Wins from "./Wins";

const Parent = styled.div`
  height: 100%;
  width: 100%;
  background: #dcdcf3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  @media (min-width: 800px) {
    flex-direction: row;
  }
`;
// NOTE: Used media queries for touch up on responsive layout, stacking components in mobile

const SubDiv = styled.div`
  height: 48%;
  width: 90%;
  max-width: 500px;
  margin: 20px;
  padding: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  background: #e09e9e;
  @media (min-width: 800px) {
    width: 43%;
    height: 80%;
    max-width: none;
  }
`;

const Header = styled.div`
  height: 60px;
  width: 100%;
  background: #cc6d6d;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 26px;
  color: white;
`;

const Slots = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const Slot = styled.div`
  height: 250px;
  width: 33%;
  border: 2px solid black;
`;

const Spin = styled.button`
  width: 100%;
  max-width: 300px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  font-weight: bold;
  background: blue;
  color: white;
  user-select: none;
  :hover {
    cursor: pointer;
  }
`;

const Tally = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  font-size: 20px;
`;

const MainSlotMachine = () => {
  // The dispatch function for dispatching actions when we
  // call our action creators.
  const dispatch = useDispatch();

  // Getting our main tally data from redux state.
  const tally = useSelector(state => state.tally);

  // A few random base colors. To worsen the odds of winning,
  // you can add more colors.
  const baseColors = ["red", "blue", "yellow"];

  // By default, the slot machine colors are all grey. You can change
  // this if you want.
  const [newColors, setColors] = useState(["grey", "grey", "grey"]);

  // TASK--COMPLETE
  // Here is the main spin function which should be called
  // every time we press the Spin button. This function should:

  // 1. Add to our tally tries in the redux state. (i.e dispatch(addToTries()))

  // 2. Randomly select a color 3 times from our base colors, and
  // set them in our local state above, newColors.

  // 3. If all the colors are the same, we add to our tally wins.
  function spin() {
    dispatch(addToTries());
    let slots = [];
    while (slots.length < 3) {
      let num = Math.floor(Math.random() * baseColors.length);
      slots.push(baseColors[num])
    }
    let win = slots.every(slot => slot === slots[0]);
    setColors(slots);
    if (win) dispatch(addToWins());
    // NOTE: addToTries is dispatched first
    // While loop selects random indices, then assigns boolean to 'win' if all are the same
    // addToWins dispatches if win is true
  }

  // TASK--COMPLETE
  // In this lifecycle function, of the tally wins reaches 5,
  // have a window.confirm message come up telling the user to 'Stop Gambling!'.
  // on 5 wins the spin button should also become disabled.
  // On selecting 'ok', the tally wins and tries are reset.
  useEffect(() => {
    if (tally.wins === 5) {
      let confirm = window.confirm("Stop Gambling!");
      if (confirm) {
        dispatch(resetTally());
        setColors(["grey", "grey", "grey"])
      };
    }
    // NOTE: Used tally.wins for dependency, and assign window.confirm to variable to use in conditional
    // resetTally is dispatched and colors are also reset

  }, [tally.wins]);

  // TASK--COMPLETE
  // Within the Slots div, create 3 slots. (Create a styled component called 'Slot'
  // and render it out 3 times). Their background colors should be those stored
  // in the newColors array. (Use inline styling)

  return (
    <Parent>
      <SubDiv>
        <Slots>
          {newColors.map(slot => (
            <Slot style={{"backgroundColor": slot}} />
          ))}
        </Slots>

        <Spin onClick={e => spin()}>Spin!</Spin>
      </SubDiv>
      <SubDiv>
        <Header>Tally</Header>
        <Tally>
          <Tries />
          <Wins />
        </Tally>
      </SubDiv>
    </Parent>
  );
};

export default MainSlotMachine;
