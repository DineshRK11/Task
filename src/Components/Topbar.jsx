import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import AddModal from "./AddModal";

const Topbar = () => {
  const [open, setOpen] = useState();

  return (
    <>
      <div>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <TextField id="outlined-basic" label="Search" variant="outlined" />
          <Box>
            <Button variant="outlined" onClick={() => setOpen(true)}>
              Add New Recipe
            </Button>
          </Box>
        </Box>
      </div>
      <AddModal open={open} setOpen={setOpen} />
    </>
  );
};

export default Topbar;
