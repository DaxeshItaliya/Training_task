import React, { Fragment } from "react";
import mealsImage from "../../assets/meals.jpg";
import classes from "./Header.module.css";
import HeaderCardButton from "./HeaderCardButton";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>React Meal</h1>
        <HeaderCardButton btnCLick={props.onMyCartClick} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="Header" />
      </div>
    </Fragment>
  );
};

export default Header;
