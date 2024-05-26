// src/App.js

import React, { useState } from 'react';
import './App.css';
import TransactionList from './TransactionList';
import TransactionForm from './TransactionForm';

const App = () => {
  const [transactions, setTransactions] = useState([]);

  // Function to add a new transaction to the state
  const handleAddTransaction = (newTransaction) => {
    setTransactions(prevTransactions => [...prevTransactions, newTransaction]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Flatiron Bank</h1>
      </header>
      <main>
        <TransactionForm onAddTransaction={handleAddTransaction} />
        <TransactionList transactions={transactions} setTransactions={setTransactions} />
        <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </main>
    </div>
  );
};

export default App;
