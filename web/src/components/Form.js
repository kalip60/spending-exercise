import React, { useState } from 'react';
import { InputStyles } from '../styles/InputStyles';
import { SelectStyles } from '../styles/SelectStyles';
import { FormStyles } from '../styles/ComponentStyles';

export default function Form({updatedForm, setUpdatedForm}) {
  const [state, setState] = useState({
    description: '',
    amount: 0,
    currency: 'USD',
  });

  function handleChange(e) {
    document.querySelector('.description').style.border = 'none';
    document.querySelector('.amount').style.border = 'none';
    const { name, value } = e.target;

    setState({
      ...state,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if(!state.description) {
      document.querySelector('.description').style.border = '3px solid red';
    }
    if(!state.amount) {
      document.querySelector('.amount').style.border = '3px solid red';
    }
    if(state.description && state.amount) {
      const reqBody = {
        ...state,
        spent_at: new Date(Date.now()).toISOString(),
      }
      fetch('http://localhost:8080/spendings/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqBody),
      })
      setState({
        description: '',
        amount: 0,
        currency: 'USD',
      });
      setUpdatedForm(updatedForm+1);
    }
  }

  return (
    <>
      <FormStyles>
        <InputStyles
          className='description'
          type='text'
          placeholder='description'
          name='description'
          value={state.description}
          onChange={handleChange}
        />
        <InputStyles
          className='amount'
          type='number'
          placeholder='amount'
          name='amount'
          value={state.amount}
          onChange={handleChange}
        />
        <SelectStyles
          name='currency'
          value={state.currency}
          onChange={handleChange}
        >
          <option value='HUF'>HUF</option>
          <option value='USD'>USD</option>
        </SelectStyles>
        <InputStyles type='submit' value='Save' onClick={handleSubmit}/>
      </FormStyles>
    </>
  );
}
