import React from "react";
import { createMuiTheme, ThemeProvider } from "@mui/material/styles";
import { Button as MuiButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
function Button(props) {
  const {
    fillColor = "#4194FF",
    styles,
    icon,
    text,
    size,
    color,
    variant,
    onClick,
    ...other
  } = props;

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: fillColor, // Replace with your desired color
      },
    },
  });

  const iconStyles = {fontSize: "1vw"};

  return (
    <ThemeProvider theme={theme}>
      <MuiButton
        color="primary"
        variant={variant || "contained"}
        startIcon={
          (icon === "add" && <AddIcon style={iconStyles} />) ||
          (icon === "back" && <ArrowBackIosNewOutlinedIcon style={iconStyles}/>) ||
          (icon === "tick" && <DoneOutlinedIcon style={iconStyles}/>) ||
          (icon === "front" && <KeyboardArrowRightOutlinedIcon style={iconStyles}/>)
        }
        size={size || "large"}
        // color={color || "primary"}
        onClick={onClick}
        styles={styles}
        {...other}
      >
        {text}
      </MuiButton>
    </ThemeProvider>
  );
}

export default Button;
