import React from 'react';
import './App.css';
import 'h8k-components';
import { ExpensesTracker } from './components/expenses-tracker/ExpensesTracker';
const title = "Expenses Tracker";

const App = () => {
    return (
        <div className="App">
			<h8k-navbar header={title}></h8k-navbar>
			<ExpensesTracker />
        </div>
    );
}

export default App;
