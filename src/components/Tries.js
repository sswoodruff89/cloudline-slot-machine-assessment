import React from "react";
import { useSelector } from "react-redux";

// TASK--COMPLETE
// Display the number of tries, i.e 'You've tried x times'

function Tries() {
  const tally = useSelector(state => state.tally);
  return (
    <div className="tally-text tries">
      {`You've tried ${tally.tries} times`}
    </div>
  );
}

export default Tries;
