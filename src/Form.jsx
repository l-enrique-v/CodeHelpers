import { useState } from "react";

function FormComponent() {
  const [inputValue, setInputValue] = useState("");
  let params = "";
  const [json, setJson] = useState();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    params = inputValue;
    setJson(sqlParamstoJson(params));
  };

  function sqlParamstoJson(params) {
    const json = {};
    params.split(",").forEach((param) => {
      const [name, value] = param.split("=");
      const cleanedName = name.trim().split(/\s+/)[0].replace("@", "");
      if (value !== undefined && value !== null && value !== "") {
        if (!isNaN(value)) {
          json[cleanedName] = Number(value.trim());
        } else {
          const cleanedValue = value.trim().replace(/^'|'$/g, "");
          json[cleanedName] = cleanedValue;
        }
      }
    });

    return JSON.stringify(json, null, 2);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Params:
        <input type="text" value={inputValue} onChange={handleInputChange} />
      </label>
      <button type="submit">Submit</button>
      <pre>{json}</pre>
    </form>
  );
}

export default FormComponent;
