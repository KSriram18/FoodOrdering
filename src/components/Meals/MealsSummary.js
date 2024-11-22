import classes from './MealsSummary.module.css';

const MealsSummary = () => {
  return (
    <section className={classes.summary}>
      <h2>Fast food, food that reaches you fast</h2>
      <p>
        Choose your favorite meal from the available meals
        and enjoy a delicious meal at home.
      </p>
      <p>
        All our meals are cooked with high-quality ingredients, just-in-time and
        of course by experienced chefs!
      </p>
    </section>
  );
};

export default MealsSummary;
