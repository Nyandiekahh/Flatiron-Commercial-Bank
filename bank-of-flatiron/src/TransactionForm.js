// src/TransactionForm.js

import React, { useState } from 'react';
import axios from 'axios';

const TransactionForm = ({ onAddTransaction }) => {
  const [transactionDetails, setTransactionDetails] = useState({
    date: '',
    description: '',
    amount: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTransactionDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const submitTransaction = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8001/transactions', transactionDetails);
      alert('Transaction added successfully!');
      setTransactionDetails({ date: '', description: '', amount: '' });
      if (onAddTransaction) {
        onAddTransaction(response.data);
      }
    } catch (error) {
      console.error('Failed to add transaction:', error);
    }
  };

  return (
    <div>
      <h2>Add a New Transaction</h2>
      <form onSubmit={submitTransaction}>
        <div>
          <label>Date:</label>
          <input
            type="text"
            name="date"
            value={transactionDetails.date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={transactionDetails.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="text"
            name="amount"
            value={transactionDetails.amount}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
};

export default TransactionForm;
