import "./App.css";
import AddNewUser from "./components/AddNewUser/AddNewUser";
import Warning from "./components/Warning/Warning";
import UserList from "./components/UserList/UserList";
import React, { useState } from "react";
let warningMessage;
function App() {
  const [isWarning, setWarning] = useState(false);
  const [userList, setUserList] = useState([]);

  const onClickHandler = () => {
    setWarning(false);
  };

  const invalidEntryHandler = (Message) => {
    warningMessage = Message;
    setWarning(true);
  };

  const addNewUserHandler = (newUser) => {
    setUserList((prevUsers) => {
      return [...prevUsers, newUser];
    });
  };
  console.log(userList);
  const deleteRecordHandler = (index) => {
    userList.splice(index - 1, 1);
    setUserList([...userList]);
  };

  let warning;

  if (isWarning) {
    warning = <Warning onOkayClick={onClickHandler} message={warningMessage} />;
  } else {
    warning = null;
  }

  return (
    <div className="container">
      {warning}
      <AddNewUser
        newUserAdded={addNewUserHandler}
        inValidEntry={invalidEntryHandler}
      />
      <UserList userList={userList} deleteRecord={deleteRecordHandler} />
    </div>
  );
}

export default App;
