import React from "react";

import Card from "../UI/Card/Card";
import classes from "./Home.module.css";
import AuthContext from "../Context/auth-context";
import { useContext } from "react";
import Button from "../UI/Button/Button";

const Home = () => {
  const ctx = useContext(AuthContext);
  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
      <Button onClick={ctx.onLogOut}>LogOut</Button>
    </Card>
  );
};

export default Home;
