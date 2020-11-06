import { Router } from 'express';
import Transaction from '../models/Transaction';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {

    const transactions = {
      transactions :transactionsRepository.all(), 
      balance: transactionsRepository.getBalance()
    }

    return response.json(transactions)
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const {
      title,
      value,
      type
     } = request.body

    let transaction = new Transaction({title, value, type})

    transaction =  new CreateTransactionService(transactionsRepository).execute(transaction)

    return response.json(transaction)

  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
