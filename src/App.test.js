import React from 'react';
import App from './App';
import { render, cleanup, fireEvent, queryByText } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';


const renderApp = () => render(<App />);
const TEST_IDS = {
	EXPENSE_NAME: 'expense-name',
	EXPENSE_AMOUNT: 'expense-amount',
	EXPENSE_TYPE: 'expense-type',
	EXPENSE_TYPE_1: 'expense-type-1',
	EXPENSE_TYPE_2: 'expense-type-2',
	EXPENSE_TYPE_3: 'expense-type-3',
	EXPENSE_TYPE_4: 'expense-type-4',
	EXPENSE_SUBMIT: 'expense-submit-button',
	EXPENSE_LIST_PREFIX: 'expense-list-',
	EXPENSE_LIST_DELETE: 'expense-list-delete-',
	EXPENSE_DISTRIBUTION_FOOD: 'expense-distribution-food',
	EXPENSE_DISTRIBUTION_TRAVEL: 'expense-distribution-travel',
	EXPENSE_DISTRIBUTION_SHOPPING: 'expense-distribution-shopping',
	EXPENSE_DISTRIBUTION_OTHER: 'expense-distribution-other',

}
	
let app, getByTestId, getByText, queryByTestId;
afterEach(() => {
	cleanup()
});

beforeEach(() => {
	app = render(<App />);
	getByTestId = app.getByTestId;
	getByText = app.getByText;
})

it('Test form validations', () => {
	const alertMock = jest.spyOn(window, 'alert').mockImplementation(); 
	const expenseName = getByTestId(TEST_IDS.EXPENSE_NAME);
	const expenseAmount = getByTestId(TEST_IDS.EXPENSE_AMOUNT);
	const addExpense = getByTestId(TEST_IDS.EXPENSE_SUBMIT);
	fireEvent.click(addExpense);
	expect(alertMock).toHaveBeenCalledWith('Expense Name required');
	fireEvent.change(expenseName, { target: { value: 'Test' } });
	fireEvent.click(addExpense)
	expect(alertMock).toHaveBeenCalledWith('Expense Amount required and should be greater than 0')
	fireEvent.change(expenseAmount, { target: { value: '-1' } });
	fireEvent.click(addExpense)
	expect(alertMock).toHaveBeenCalledWith('Expense Amount required and should be greater than 0')
	fireEvent.change(expenseAmount, { target: { value: '1' } });
	fireEvent.click(addExpense)
	expect(alertMock).toHaveBeenCalledWith('Please Choose Expense Type');
})


it('Test adding new Expense', () => {
	const expenseName = getByTestId(TEST_IDS.EXPENSE_NAME);
	const expenseAmount = getByTestId(TEST_IDS.EXPENSE_AMOUNT);
	const expenseType = getByTestId(TEST_IDS.EXPENSE_TYPE);
	const addExpense = getByTestId(TEST_IDS.EXPENSE_SUBMIT);

	fireEvent.change(expenseName, { target: { value: 'Test1' } });
	fireEvent.change(expenseAmount, { target: { value: 10 } });
	fireEvent.change(expenseType, { target: { value: 'Food' } });
	fireEvent.click(addExpense)
	
	expect(getByTestId(TEST_IDS.EXPENSE_LIST_PREFIX + '0')).toBeInTheDocument();
	expect(getByText('Test1')).toBeInTheDocument();
})

it('Test adding multiple expenses', () => {
	const expenseName = getByTestId(TEST_IDS.EXPENSE_NAME);
	const expenseAmount = getByTestId(TEST_IDS.EXPENSE_AMOUNT);
	const expenseType = getByTestId(TEST_IDS.EXPENSE_TYPE);
	const addExpense = getByTestId(TEST_IDS.EXPENSE_SUBMIT);


	fireEvent.change(expenseName, { target: { value: 'Expense 1' } });
	fireEvent.change(expenseAmount, { target: { value: 10 } });
	fireEvent.change(expenseType, { target: { value: 'Food' } });
	fireEvent.click(addExpense)

	fireEvent.change(expenseName, { target: { value: 'Expense 2' } });
	fireEvent.change(expenseAmount, { target: { value: 20 } });
	fireEvent.change(expenseType, { target: { value: 'Travel' } });
	fireEvent.click(addExpense)

	fireEvent.change(expenseName, { target: { value: 'Expense 3' } });
	fireEvent.change(expenseAmount, { target: { value: 30 } });
	fireEvent.change(expenseType, { target: { value: 'Shopping' } });
	fireEvent.click(addExpense)

	fireEvent.change(expenseName, { target: { value: 'Expense 4' } });
	fireEvent.change(expenseAmount, { target: { value: 40 } });
	fireEvent.change(expenseType, { target: { value: 'Other' } });
	fireEvent.click(addExpense)

	expect(getByTestId(TEST_IDS.EXPENSE_LIST_PREFIX + '0')).toBeInTheDocument();
	expect(getByText('Expense 1')).toBeInTheDocument();
	expect(getByTestId(TEST_IDS.EXPENSE_LIST_PREFIX + '1')).toBeInTheDocument();
	expect(getByText('Expense 2')).toBeInTheDocument();
	expect(getByTestId(TEST_IDS.EXPENSE_LIST_PREFIX + '2')).toBeInTheDocument();
	expect(getByText('Expense 3')).toBeInTheDocument();
	expect(getByTestId(TEST_IDS.EXPENSE_LIST_PREFIX + '3')).toBeInTheDocument();
	expect(getByText('Expense 4')).toBeInTheDocument();
})

it('Test Expense Distribution initially working', ()=>{
	const expenseName = getByTestId(TEST_IDS.EXPENSE_NAME);
	const expenseAmount = getByTestId(TEST_IDS.EXPENSE_AMOUNT);
	const expenseType = getByTestId(TEST_IDS.EXPENSE_TYPE);
	const addExpense = getByTestId(TEST_IDS.EXPENSE_SUBMIT);

	fireEvent.change(expenseName, { target: { value: 'Expense 1' } });
	fireEvent.change(expenseAmount, { target: { value: 10 } });
	fireEvent.change(expenseType, { target: { value: 'Food' } });
	fireEvent.click(addExpense)

	const expenseDistributionFood = getByTestId(TEST_IDS.EXPENSE_DISTRIBUTION_FOOD);
	expect(expenseDistributionFood.style.width).toBe('100%')
})

it('Test Expense Distribution working for all', () => {
	const expenseName = getByTestId(TEST_IDS.EXPENSE_NAME);
	const expenseAmount = getByTestId(TEST_IDS.EXPENSE_AMOUNT);
	const expenseType = getByTestId(TEST_IDS.EXPENSE_TYPE);
	const addExpense = getByTestId(TEST_IDS.EXPENSE_SUBMIT);

	fireEvent.change(expenseName, { target: { value: 'Expense 1' } });
	fireEvent.change(expenseAmount, { target: { value: 12 } });
	fireEvent.change(expenseType, { target: { value: 'Food' } });
	fireEvent.click(addExpense)

	fireEvent.change(expenseName, { target: { value: 'Expense 2' } });
	fireEvent.change(expenseAmount, { target: { value: 13 } });
	fireEvent.change(expenseType, { target: { value: 'Travel' } });
	fireEvent.click(addExpense)

	fireEvent.change(expenseName, { target: { value: 'Expense 3' } });
	fireEvent.change(expenseAmount, { target: { value: 18 } });
	fireEvent.change(expenseType, { target: { value: 'Shopping' } });
	fireEvent.click(addExpense)

	fireEvent.change(expenseName, { target: { value: 'Expense 4' } });
	fireEvent.change(expenseAmount, { target: { value: 26 } });
	fireEvent.change(expenseType, { target: { value: 'Other' } });
	fireEvent.click(addExpense)

	const expenseDistributionFood = getByTestId(TEST_IDS.EXPENSE_DISTRIBUTION_FOOD);
	expect(expenseDistributionFood.style.width).toMatch(/^16%|17%|18%$/)

	const expenseDistributionTravel = getByTestId(TEST_IDS.EXPENSE_DISTRIBUTION_TRAVEL);
	expect(expenseDistributionTravel.style.width).toMatch(/^18%|19%|20%$/)

	const expenseDistributionShopping = getByTestId(TEST_IDS.EXPENSE_DISTRIBUTION_SHOPPING);
	expect(expenseDistributionShopping.style.width).toMatch(/^25%|26%|27%$/)

	const expenseDistributionOther = getByTestId(TEST_IDS.EXPENSE_DISTRIBUTION_OTHER);
	expect(expenseDistributionOther.style.width).toMatch(/^37%|28%|39%$/)
})