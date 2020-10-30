import React from "react";
import { useSelector } from "react-redux";

// TASK--COMPLETE
// Display the number of wins, i.e 'You've won x times'

function Wins() {
  const tally = useSelector(state => state.tally);
  return (
    <div className="tally-text wins">
      {`You've won ${tally.wins} times`}
    </div>
  );}

export default Wins;
