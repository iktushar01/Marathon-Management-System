import React from "react";

const MarathonsCard = ({ marathon }) => {
      const { title } = marathon;

  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};

export default MarathonsCard;
