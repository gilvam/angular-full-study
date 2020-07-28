import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../_shared/base.component';
import { PageModel } from 'study-core-ngx';
import { UserModel } from '../../../../models/user.model';
import { Transaction } from '../../../../models/transaction.model';
import { Debit } from '../../../../models/debit.model';
import { DebitService } from '../../../../services/http/debit.service';

@Component({
  selector: 'app-back-debit-list',
  templateUrl: './debit-list.component.html',
  styleUrls: ['./debit-list.component.scss'],
})
export class DebitListComponent extends BaseComponent implements OnInit {

  page: PageModel<UserModel> = new PageModel<UserModel>();
  debits: Array<Debit>;
  menuActionCheck: any; // mostrar checkbox no paginate

  constructor(
    private debitService: DebitService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.loadPagination(true);
  }

  loadPagination(isResetPagination: boolean = false) {
    if (this.page.loadingMore(isResetPagination)) {
      this.debitService.getAll()
        .subscribe((page: PageModel<Debit>[]) => {
            const pageResult = page.find((pg: PageModel<Transaction>, i) => i === this.page.number);
            this.page.updatePagination(pageResult, false);
            this.debits = this.page.first ? pageResult.content : this.debits.concat(pageResult.content);
          },
        );
    }
  }
}
