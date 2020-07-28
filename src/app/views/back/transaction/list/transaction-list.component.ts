import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../_shared/base.component';
import { Transaction } from '../../../../models/transaction.model';
import { TransactionService } from '../../../../services/http/transaction.service';
import { UserModel } from '../../../../models/user.model';
import { PageModel } from 'study-core-ngx';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
})
export class TransactionListComponent extends BaseComponent implements OnInit {

  page: PageModel<UserModel> = new PageModel<UserModel>();
  transactions: Array<Transaction>;
  menuActionCheck: any; // mostrar checkbox no paginate

  constructor(
    private transactionService: TransactionService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.loadPagination(true);
  }

  loadPagination(isResetPagination: boolean = false) {
    if (this.page.loadingMore(isResetPagination)) {
      this.transactionService.getAll()
        .subscribe((page: PageModel<Transaction>[]) => {
            const pageResult = page.find((pg: PageModel<Transaction>, i) => i === this.page.number);
            this.page.updatePagination(pageResult, false);
            this.transactions = this.page.first ? pageResult.content : this.transactions.concat(pageResult.content);
          },
        );
    }
  }
}
