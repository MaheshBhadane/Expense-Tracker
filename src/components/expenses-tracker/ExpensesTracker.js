import React, { useEffect, useState } from "react";
import "./ExpnensesTracker.css";

export const ExpensesTracker = () => {
  const initialState = {
    name: "",
    amount: "",
    catagory: "",
  };

  const [expense, setExpense] = useState(initialState);
  const [expenseList, setExpenseList] = useState([]);
  const [totalExpense, setTotalExpense] = useState({
    food: 0,
    travel: 0,
    shopping: 0,
    other: 0,
  });

  const [expensePercentage, setExpensePercentage] = useState({
    food: 100,
    travel: 100,
    shopping: 100,
    other: 100,
  });

  const totalSum = Object.values(totalExpense)?.reduce(
    (acc, curr) => acc + curr,
    0
  );

  const handleChange = (e) => {
    e.persist();
    setExpense({ ...expense, [e?.target?.name]: e?.target?.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !expense.name ||
      !parseInt(expense.amount) ||
      parseInt(expense.amount) < 0 ||
      !expense.catagory
    ) {
      if (!expense.name) {
        alert("Expense Name required");
      }
      if (!parseInt(expense.amount) || parseInt(expense.amount) < 0) {
        alert("Expense Amount required and should be greater than 0");
      }
      if (!expense.catagory) {
        alert("Please Choose Expense Type");
      }
    } else {
      setExpenseList((prevState) => [...prevState, expense]);
    }
  };

  useEffect(() => {
    const temp = expenseList?.map((expense) => {
      setTotalExpense({
        ...totalExpense,
        [expense?.catagory]:
          parseInt(totalExpense[expense?.catagory]) + parseInt(expense?.amount),
      });
    });
  }, [expenseList]);

  const { food, travel, shopping, other } = totalExpense;

  useEffect(() => {
    if (
      totalExpense?.food ||
      totalExpense?.travel ||
      totalExpense?.shopping ||
      totalExpense?.other
    ) {
      setExpensePercentage({
        food: Math.floor(totalExpense?.food ? (totalExpense?.food * 100) / totalSum : 0),
        travel: Math.floor(totalExpense?.travel
          ? (totalExpense?.travel * 100) / totalSum
          : 0),
        shopping: Math.floor(totalExpense?.shopping
          ? (totalExpense?.shopping * 100) / totalSum
          : 0),
        other: Math.floor(totalExpense?.other ? (totalExpense?.other * 100) / totalSum : 0),
      });
    }
  }, [food, travel, shopping, other]);

  return (
    <div className="mt-50 layout-column justify-content-center align-items-center">
      <div>
        <form onSubmit={handleSubmit}>
          <section
            className="my-30 layout-row align-items-center justify-content-center"
            style={{ width: "1000px" }}
          >
            <input
              type="text"
              value={expense?.name}
              placeholder="New Expense"
              style={{ width: "40%", marginRight: "10px" }}
              name="name"
              data-testid="expense-name"
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Enter Amount"
              style={{ width: "40%" }}
              name="amount"
              value={expense?.amount}
              data-testid="expense-amount"
              onChange={handleChange}
            />
            <select
              className="ml-2"
              name="catagory"
              onChange={handleChange}
              data-testid="expense-type"
            >
              <option disabled selected>
                Select Type
              </option>
              <option data-testid="expense-type-1" value={"food"}>
                Food
              </option>
              <option data-testid="expense-type-2" value={"travel"}>
                Travel
              </option>
              <option data-testid="expense-type-3" value={"shopping"}>
                Shopping
              </option>
              <option data-testid="expense-type-4" value={"other"}>
                Other
              </option>
            </select>
            <button
              type="submit"
              style={{ width: "20%" }}
              data-testid="expense-submit-button"
            >
              Add Expense
            </button>
          </section>
        </form>
      </div>
      <div className="flex" style={{ width: "100%" }}>
        <div style={{ width: "48%" }} className="mx-5 m-10 card">
          <p className="title">Expense List</p>
          <table>
            <thead>
              <tr>
                <td>Sr No</td>
                <td>Expense</td>
                <td>Amount</td>
                <td>Catagory</td>
              </tr>
            </thead>
            <tbody>
              {expenseList?.map((expense, id) => (
                <tr key={id} data-testid={`expense-list-${id}`}>
                  <td>{id + 1}</td>
                  <td>{expense?.name}</td>
                  <td>{expense?.amount}</td>
                  <td>{expense?.catagory}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card ml-5 m-10" style={{ width: "50%" }}>
          <p className="title">Expenses Breakdown</p>
          <br />
          <div style={{ height: "30px", display: "flex" }}>
            <div
              data-testid="expense-distribution-food"
              style={{
                width: `${expensePercentage?.food}%`,
              }}
              className="lightblue"
            ></div>
            <div
              data-testid="expense-distribution-travel"
              style={{
                width: `${expensePercentage?.travel}%`,
              }}
              className="red"
            ></div>
            <div
              data-testid="expense-distribution-shopping"
              style={{
                width: `${expensePercentage?.shopping}%`,
              }}
              className="lightgreen"
            ></div>
            <div
              data-testid="expense-distribution-other"
              style={{
                width: `${expensePercentage?.other}%`,
              }}
              className="orange"
            ></div>
          </div>
          <br />
          <div className="flex ml-10 mb-2">
            <div className="lightblue hight-20 width-20"></div> &nbsp; Food
          </div>
          <div className="flex ml-10 mb-2">
            <div className="red hight-20 width-20"></div> &nbsp; Travel
          </div>
          <div className="flex ml-10 mb-2">
            <div className="lightgreen hight-20 width-20"></div> &nbsp; Shopping
          </div>
          <div className="flex ml-10 mb-10">
            <div className="orange hight-20 width-20"></div> &nbsp; Other
          </div>
        </div>
      </div>
    </div>
  );
};
