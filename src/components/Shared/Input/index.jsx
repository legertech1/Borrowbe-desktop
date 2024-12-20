import React from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import "../Input/index.css";

export default function Input({
  placeholder,
  name,
  id,
  type,
  onChange,
  value,
  onKeyDown,
  defaultValue,
  maxLength,
  className,
  pretext,
}) {
  const [show, setShow] = React.useState(false);
  return (
    <div className="input_container">
      <span>{pretext}</span>
      <input
        placeholder={placeholder || ""}
        className={"html-input " + className}
        name={name || "name"}
        id={id || ""}
        type={show ? "text" : type || "text"}
        onChange={onChange || null}
        value={value}
        onKeyDown={onKeyDown || null}
        defaultValue={defaultValue || ""}
        maxLength={maxLength}
      />
      {type === "password" && (
        <>
          {!show ? (
            <VisibilityOffIcon
              className="eye_icon"
              onClick={() => setShow(!show)}
            />
          ) : (
            <VisibilityIcon
              className="eye_icon"
              onClick={() => setShow(!show)}
            />
          )}
        </>
      )}
    </div>
  );
}
