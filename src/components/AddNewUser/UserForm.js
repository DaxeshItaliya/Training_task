import React, { useState } from "react";
import "./UserForm.css";
import Button from "../UI/Button";

export default function UserForm(props) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const ageChangeHandler = (event) => {
    setAge(+event.target.value.trim());
  };

  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };

  const fromSubmitHandler = (event) => {
    event.preventDefault();
    if (name.trim() === "" || age === "") {
      props.inValidEntry(
        "Please enter a valid name and age (non-empty values)."
      );
    } else if (age < 0) {
      props.inValidEntry("Please enter a valid age (>0).");
    } else {
      props.formSubmit({
        name: name,
        age: age,
      });
    }
  };

  return (
    <form onSubmit={fromSubmitHandler}>
      <label>Username</label>
      <input type="text" value={name} onInput={nameChangeHandler}></input>
      <label>Age (Years)</label>
      <input type="number" value={age} onInput={ageChangeHandler}></input>
      <Button type="submit" onClick={() => {}}>
        Add User
      </Button>
    </form>
  );
}
