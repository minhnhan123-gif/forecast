import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Button = ({ onClick, type = "primary", icon, disable, iconOnly }) => {
  return (
    <button
      className={`btn btn-${type} ${disable ? "btn-disable" : ""} ${
        iconOnly ? "btn-iconOnly" : ""
      }`}
      onClick={onClick}
      disabled={disable}
    >
      {icon && <FontAwesomeIcon icon={icon} />}
    </button>
  );
};

export default Button;
