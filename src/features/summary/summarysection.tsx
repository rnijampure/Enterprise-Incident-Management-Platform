import React from "react";
import CardComponent from "../../component/common/card";
const SummarySection = () => {
  return (
    <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
      {[1, 2, 3, 4, 5].map((item) => (
        <CardComponent key={item} card={{ title: `Test Card ${item}` }} />
      ))}
    </div>
  );
};

export default SummarySection;
