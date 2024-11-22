import { useContext, useEffect, useState } from 'react';

import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';
import CartContext from '../../../store/cart-context';
const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const cartCtx=useContext(CartContext);
  const [updatedAmount,setupdatedAmount]=useState(0);
  const hasItems=cartCtx.items.findIndex((item)=>{
    return item.id===props.itemId;
  });
  const mainAmount=hasItems!==-1?cartCtx.items[hasItems].amount:0;
  useEffect(()=>{
   setupdatedAmount(mainAmount);
  },[mainAmount]);
  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = updatedAmount
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(enteredAmountNumber);
  };
  const onChangeHandler=(e)=>{
    setupdatedAmount(e.target.value);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        label='Amount'
        input={{
          id: 'amount',
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          onChange:onChangeHandler,
          value:updatedAmount
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
