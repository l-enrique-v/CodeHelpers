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
