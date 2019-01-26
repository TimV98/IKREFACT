import {Component, OnInit} from '@angular/core';
import {ExpenseModel} from '../expense.model';
import {ExpenseService} from '../expense.service';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit {
  private expenses: ExpenseModel[];
  private empty_expense: ExpenseModel = new ExpenseModel('', '', '', null, null, '', null);
  private page = 1;
  private sort: string;
  private desc: boolean;
  private rest: number;
  private i = 0;
  private j = 0;
  private g = 0;
  private amount_rows = 0;
  private items_per_page = 5;

  constructor(private expenseService: ExpenseService) {
  }

  sortBy(field: string) {
    if (field === this.sort && !this.desc) {
      this.desc = true;
      while (this.j < this.amount_rows) {
        this.expenses.splice(-1, 1);
        this.j = this.j + 1;
      }
      this.j = 0;
      this.expenses = this.expenses.sort((a, b) => (a[field] > b[field]) ? 1 : ((b[field] > a[field]) ? -1 : 0));
      while (this.g < this.amount_rows) {
        this.expenses.push(this.empty_expense);
        this.g = this.g + 1;
      }
      this.g = 0;
    } else {
      this.sort = field;
      this.desc = false;
      this.expenses = this.expenses.sort((a, b) => (a[field] < b[field]) ? 1 : ((b[field] < a[field]) ? -1 : 0));
    }
  }

  ngOnInit() {
    this.expenseService.getExpense().subscribe(result => this.expenses = result);
  }

  blankRows() {
    if (this.expenses.length !== 0 && this.expenses.length % this.items_per_page !== 0) {
      this.rest = this.expenses.length % this.items_per_page;
      this.amount_rows = this.items_per_page - this.rest;
      while (this.i < this.amount_rows) {
        this.expenses.push(this.empty_expense);
        this.i = this.i + 1;
      }
      return this.expenses;
    } else {
      return this.expenses;
    }
  }
}
