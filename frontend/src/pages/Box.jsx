import React from "react";

const Box = () => {
  return (
    <div
      className="box"
      style={{
        height: "800px",
        width: "1400px",
        margin: "16px 30px 0 0", // Equivalent to my={4} and marginRight={30}
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        marginTop: "-0.5rem", // Equivalent to marginTop={-0.5}
        gap: "16px", // Equivalent to gap={2}
        padding: "16px", // Equivalent to p={2}
        border: "8px solid orange",
        borderColor: "gold",
        minWidth: "120px",
      }}
    >
      
    </div>
  );
};

export default Box;
