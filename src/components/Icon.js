import React from "react";

const Icon = ({ name }) => {
  return <img width="45px" src={require(`./icons/${name}.png`)} />;
};

export default Icon;
