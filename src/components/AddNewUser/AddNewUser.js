import React from "react";
import Card from "../UI/Card";
import UserForm from "./UserForm";

export default function AddNewUser(props) {
  const invalidEntryHandler = (warningMessage) => {
    props.inValidEntry(warningMessage);
  };

  const formSubmitHandler = (newUser) => {
    props.newUserAdded(newUser);
  };

  return (
    <Card>
      <UserForm
        formSubmit={formSubmitHandler}
        inValidEntry={invalidEntryHandler}
      />
    </Card>
  );
}
