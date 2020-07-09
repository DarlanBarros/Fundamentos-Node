import { uuid } from 'uuidv4';
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
    const balance: Balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };

    const incomeVet = this.transactions
      .filter(transaction => {
        return transaction.type === 'income';
      })
      .map(transaction => {
        return transaction.value;
      });

    balance.income = incomeVet.reduce((total, next) => {
      return total + next;
    }, 0);

    const outcomeVet = this.transactions
      .filter(transaction => {
        return transaction.type === 'outcome';
      })
      .map(transaction => {
        return transaction.value;
      });

    balance.outcome = outcomeVet.reduce((total, next) => {
      return total + next;
    }, 0);

    balance.total = balance.income - balance.outcome;

    return balance;
  }

  public create({ title, value, type }: Transaction): Transaction {
    const transaction = {
      id: uuid(),
      title,
      value,
      type,
    };

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
