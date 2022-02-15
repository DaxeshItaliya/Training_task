import React, { useState } from "react";
import Card from "../UI/Card";
import "./Warning.css";
import Button from "../UI/Button";

export default function Warning(props) {
  const onClickHandler = () => {
    props.onOkayClick();
  };

  return (
    <div className="warning_background">
      <Card className="waningCard">
        <p className="warning-title">Invalid Input</p>
        <p className="warning-message">{props.message}</p>
        <Button onClick={onClickHandler} className="okay-btn">
          Okay
        </Button>
      </Card>
    </div>
  );
}
