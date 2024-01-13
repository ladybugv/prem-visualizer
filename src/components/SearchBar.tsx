import React, { PureComponent } from "react";

import { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Box, Button, createTheme } from "@mui/material";
import "./styles.css";

// options: list of options to choose from
// onClick: function for when the user selects an option
interface Props {
  options: any[];
  onClick: (season: any) => void;
}

// colour palette
const buttonTheme = createTheme({
  palette: {
    primary: {
      dark: "#290e40",
      light: "#efe9f5",
      main: "#36204f",
    },
  },
});

const SearchBar = ({ options, onClick }: Props) => {
  const [input, setInput] = useState("");

  // don't display anything if there are no options
  if (options.length == 0) {
    return;
  }

  // return statement
  return (
    <>
      <Box sx={{ display: "flex", margin: "auto", paddingTop: "2%" }}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={options}
          sx={{
            width: 300,
            display: "inline-block",
            backgroundColor: buttonTheme.palette.primary.light,
            borderRadius: "8px",
          }}
          onChange={(ev, val, reason) => {
            if (val != null) {
              setInput(val);
            }
          }}
          renderInput={(params) => <TextField {...params} label="Seasons" />}
        />
        <Button
          className="hi"
          sx={{
            marginLeft: "50px",
            backgroundColor: buttonTheme.palette.primary.light,
            color: buttonTheme.palette.primary.main,
            fontWeight: "bold",
            paddingLeft: "20px",
            paddingRight: "20px",
            borderRadius: "8px",
          }}
          onClick={() => {
            alert(input);
            onClick(input);
          }}
        >
          Select year
        </Button>
      </Box>
    </>
  );
};

export default SearchBar;
