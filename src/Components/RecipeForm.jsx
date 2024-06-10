import { TextField } from "@mui/material";
import React from "react";

const RecipeForm = ({ details, setDetails }) => {
  const handleChange = (e, name) => {
    // const { value, name } = e;
    // console.log("e", e.target.value, name);
    setDetails({ ...details, [name]: e.target.value });
  };
  return (
    <form style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <TextField
        id="outlined-basic"
        label="Title"
        variant="outlined"
        value={details?.title}
        onChange={(e) => handleChange(e, "title")}
      />
      <TextField
        id="outlined-basic"
        label="Ingrediants"
        variant="outlined"
        value={details?.ingredients}
        onChange={(e) => handleChange(e, "ingredients")}
      />
      <TextField
        id="outlined-basic"
        label="Instructions"
        variant="outlined"
        value={details?.instructions}
        onChange={(e) => handleChange(e, "instructions")}
      />
      <TextField
        id="outlined-basic"
        label="Preptime"
        variant="outlined"
        value={details?.preptime}
        onChange={(e) => handleChange(e, "preptime")}
      />
    </form>
  );
};

export default RecipeForm;
