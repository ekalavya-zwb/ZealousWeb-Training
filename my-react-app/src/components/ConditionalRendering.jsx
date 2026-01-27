import React from "react";

function MadeGoal() {
  return <h1>Goal!</h1>;
}

function MissedGoal() {
  return <h1>Missed!</h1>;
}

// const ConditionalRendering = () => {
//   const isGoal = false;
//   return <>{isGoal ? <MadeGoal /> : <MissedGoal />}</>;
// };

// const ConditionalRendering = () => {
//   const isGoal = false;
//   if (isGoal) {
//     return <MadeGoal />;
//   }

//   return <MissedGoal />;
// };

const ConditionalRendering = () => {
  const isGoal = false;
  return (
    <>
      {isGoal && <MadeGoal />}
      {!isGoal && <MissedGoal />}
    </>
  );
};

export default ConditionalRendering;
