import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {

    const balance  = this.transactions.reduce((accumulator: Balance, transaction: Transaction)=>{
      accumulator.income = transaction.type === 'income' ? accumulator.income += transaction.value : accumulator.income
      accumulator.outcome = transaction.type === 'outcome' ? accumulator.outcome += transaction.value : accumulator.outcome
      accumulator.total = transaction.type === 'income' ? accumulator.total += transaction.value : accumulator.total -= transaction.value

      return accumulator
    }, {
      income: 0,
      outcome: 0,
      total: 0
    })

     return balance
  }

  public create({ title, value, type}: Transaction): Transaction {
     const transaction = new Transaction({title, value, type})

     this.transactions.push(transaction)

     return transaction
  }
}

export default TransactionsRepository;
