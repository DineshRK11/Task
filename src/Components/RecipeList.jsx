import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddModal from "./AddModal";
import { Box, Button, TextField } from "@mui/material";
import EditModal from "./Edit";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function RecipeList() {
  const [rows, setRows] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [editRow, setEditRow] = React.useState({});
  const [filtered, setFiltered] = React.useState([]);
  React.useEffect(() => {
    const list = localStorage.getItem("list");
    setRows(JSON.parse(list));
    setFiltered(JSON.parse(list));
  }, []);
  const handleRow = (row) => {
    console.log("row", row);
    setEditRow(row);
    setEdit(true);
  };

  //   const checker = (val) => {
  //     console.log("val", val);
  //   };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    // console.log("searchValue", searchValue);
    // checker(value);

    if (value.length > 0) {
      const lists = [...rows];
      const filter = lists.filter((ls) => {
        if (ls.title.toLowerCase().includes(value)) {
          return ls;
        }
      });
      // console.log("filter", filter);
      setFiltered(filter);
    } else {
      setFiltered(rows);
    }
  };

  const handleDelete = (row) => {
    const list = JSON.parse(localStorage.getItem("list"));
    console.log("list", list);
    const OgList = [...list];
    console.log("OgList", OgList);
    const removed = OgList?.filter((ls) => ls?.id !== row?.id);
    // const removed = OgList.filter((ls) => ls?.title !== row?.title);

    console.log("removed", removed);
    setTimeout(() => {
      localStorage.setItem("list", JSON.stringify(removed));
      alert("Deleted");
      window.location.reload();
    }, 1000);
  };
  return (
    <>
      <div>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            value={searchValue}
            onChange={handleSearch}
          />
          <Box>
            <Button variant="outlined" onClick={() => setOpen(true)}>
              Add New Recipe
            </Button>
          </Box>
        </Box>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>S.no</TableCell>
              <TableCell align="right">Title</TableCell>
              <TableCell align="right">Ingredients</TableCell>
              <TableCell align="right">Instructions</TableCell>
              <TableCell align="right">Preptime</TableCell>
              <TableCell align="right">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered?.map((row, i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {i + 1}
                </TableCell>
                <TableCell align="right">{row.title}</TableCell>
                <TableCell align="right">{row.ingredients}</TableCell>
                <TableCell align="right">{row.instructions}</TableCell>
                <TableCell align="right">{row.preptime}</TableCell>
                <TableCell align="right">
                  <EditIcon onClick={() => handleRow(row)} />
                  <DeleteIcon onClick={() => handleDelete(row)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddModal open={open} setOpen={setOpen} />
      {editRow && <EditModal editRow={editRow} open={edit} setOpen={setEdit} />}
    </>
  );
}
