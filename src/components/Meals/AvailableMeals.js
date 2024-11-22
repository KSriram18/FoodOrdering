import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useEffect, useRef, useState } from 'react';

const AvailableMeals = () => {
  const [meals,setMeals]=useState([]);
  const [isLoading,setisLoading]=useState(true);
  const [httpError,setHttpError]=useState();
  const [search,setsearch]=useState(false);
  const inputref=useRef();
  useEffect(()=>{
    const fetchmeals=async()=>{
      const response= await fetch('https://food-cart-22d4f-default-rtdb.firebaseio.com/meals.json');
      if(!response.ok)
      {
        throw new Error('something went wrong!');
      }
      const responsedata=await response.json();
      const loadedmeals=[];
      for(const key in responsedata){
        loadedmeals.push({
          id:key,
          name:responsedata[key].name,
          description:responsedata[key].description,
          price:responsedata[key].price,
        });
      }
      const a=loadedmeals[2];
      const b=loadedmeals[3];
      loadedmeals.push({...a,id:"tttt"});
      loadedmeals.push({...b,id:"ttaa"});
      loadedmeals.sort((a,b)=>{
        const nameA = a.name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
        return -1;
        }
      if (nameA > nameB) {
        return 1;
        }

      return 0;
      })
      setMeals(loadedmeals);
      setisLoading(false);
    };
    if(search===false){
    fetchmeals().catch(error=>{
      setisLoading(false);
      setHttpError(error.message);
      });
    }
    
  },[search]);
  if (isLoading){
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    )
  }
  if (httpError){
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    )
  }
  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      itemId={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
   const OnBlurHandler=(e)=>{
    console.log(e.target.value);
  
   };
   const closeHandler=(e)=>{
    setsearch(false);
    inputref.current.value='';
   };
   const searchHandler=()=>{
    setsearch(true);
    // const transformmeals=meals.slice();
    const searchMeals=meals.filter((ea)=>{
      return ea.name.toUpperCase().search(inputref.current.value.toUpperCase())>=0;
    });
    setMeals(searchMeals);
   }
  return (
    <section className={classes.meals}>
      <Card>
        <input type="text" id ="search" onBlur={OnBlurHandler} ref={inputref}/>
        {<button type="button" onClick={searchHandler}>Search</button>}
        {<button type="button" onClick={closeHandler}>reset</button>}
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
