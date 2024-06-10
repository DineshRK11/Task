import { Box, Button, Modal, Typography, Fade, Backdrop } from "@mui/material";
import React, { useEffect, useState } from "react";
import { v4 as uid } from "uuid";
import RecipeForm from "./RecipeForm";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const EditModal = ({ editRow, open, setOpen }) => {
  const [details, setDetails] = useState({
    id: "",
    title: "",
    ingredients: "",
    instructions: "",
    preptime: "",
  });

  useEffect(() => {
    setDetails({
      id: editRow?.id,
      title: editRow?.title,
      ingredients: editRow?.ingredients,
      instructions: editRow?.instructions,
      preptime: editRow?.preptime,
    });
  }, [editRow]);
  const handleClose = () => {
    setOpen(false);
    setDetails({
      id: "",
      title: "",
      ingredients: "",
      instructions: "",
      preptime: "",
    });
  };

  const handleAdd = () => {
    // console.log("details", details);
    const Oglist = JSON.parse(localStorage.getItem("list"));
    console.log("Oglist", Oglist);
    const list = [...Oglist];
    const index = list.findIndex((ls) => ls.id === editRow?.id);
    list[index] = details;
    localStorage.setItem("list", JSON.stringify(list));
    alert("Updated Succesfully!");
    handleClose();
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Add New
            </Typography>
            <RecipeForm details={details} setDetails={setDetails} />

            <Box display="flex" justifyContent="end" alignItems="center">
              <Button onClick={handleAdd}>Add</Button>
              <Button onClick={handleClose}>Close</Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default EditModal;
