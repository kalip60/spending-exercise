import React, { useState } from 'react';
import Form from './components/Form';
import FiltersAndOrderings from './components/FiltersAndOrderings';
import SpendingList from './components/SpendingList';
import Layout from './components/Layout';

export default function App() {
  const [spendings, setSpendings] = useState([]);
  const [filter, setFilter] = useState('-date');
  const [currency, setCurrency] = useState('ALL');
  const [updatedForm, setUpdatedForm] = useState(0);

  return (
    <>
      <Layout>
        <Form 
        updatedForm={updatedForm}
        setUpdatedForm={setUpdatedForm}
        />
        <FiltersAndOrderings setFilter={setFilter} setCurrency={setCurrency} />
        <SpendingList
          filter={filter}
          currency={currency}
          spendings={spendings}
          setSpendings={setSpendings}
          updatedForm={updatedForm}
        />
      </Layout>
    </>
  );
}
