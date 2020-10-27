import React from "react";
import { useSelector } from "react-redux";

// TASK
// Display the number of tries, i.e 'You've tried x times'

function Tries() {
  const tally = useSelector(state => state.tally);
  return "tries";
}

export default Tries;
