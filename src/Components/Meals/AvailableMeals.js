import React, { useEffect, useState } from "react";
import useHttp from "../../Hooks/use-http";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

export default function AvailableMeals() {
  const { isLoading, error, sendRequest } = useHttp();
  const [meals, setMeals] = useState([]);

  const createUserList = (data) => {
    console.log("GetData", data);
    let MealsList = [];
    for (let key in data) {
      // console.log("Itrate", data[key].name);
      MealsList.push({
        id: key,
        name: data[key].name,
        price: data[key].price,
        description: data[key].description,
      });
    }
    setMeals(MealsList);
  };

  useEffect(() => {
    sendRequest(
      {
        url: "https://react-757fa-default-rtdb.firebaseio.com/food.json",
      },
      createUserList
    );
  }, [sendRequest]);

  if (isLoading) {
    return <p className={classes.loading}>Loading</p>;
  }

  if (error != null) {
    console.log(error);
    return <p className={classes.loading}>Something Went Wrong</p>;
  }

  const mealList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealList}</ul>
      </Card>
    </section>
  );
}
