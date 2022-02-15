import Card from "../UI/Card";
import React from "react";
import "./UserList.css";

export default function UserList(props) {
  const deleteRecord = (event) => {
    props.deleteRecord(event.target.id);
    console.log(event.target.id);
  };

  let Result;
  if (props.userList.length === 0) {
    Result = <p className="message">No User Record Found</p>;
  } else {
    let index = 0;
    Result = (
      <ul>
        {props.userList.map((user) => {
          index++;
          return (
            <li id={index} key={index} onClick={deleteRecord}>
              {user.name} ({user.age} years old)
            </li>
          );
        })}
      </ul>
    );
  }
  return <Card>{Result}</Card>;
}
