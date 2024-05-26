// src/TransactionList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionList = ({ transactions, setTransactions }) => {
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

  // Fetch transactions when the component mounts
  useEffect(() => {
    fetchTransactions();
  }, []);

  // Function to retrieve transactions from the API
  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:8001/transactions');
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  // Function to delete a transaction
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8001/transactions/${id}`);
      setTransactions(transactions.filter(transaction => transaction.id !== id));
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  // Function to sort the transactions
  const handleSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'ascending' ? 'descending' : 'ascending';
    
    const sortedTransactions = [...transactions].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setTransactions(sortedTransactions);
  };

  return (
    <div>
      <h2>Transaction List</h2>
      <div>
        <button onClick={() => handleSort('description')}>Sort by Description</button>
        <button onClick={() => handleSort('category')}>Sort by Category</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.date}</td>
              <td>{transaction.description}</td>
              <td>{transaction.category}</td>
              <td>{transaction.amount}</td>
              <td>
                <button onClick={() => handleDelete(transaction.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
