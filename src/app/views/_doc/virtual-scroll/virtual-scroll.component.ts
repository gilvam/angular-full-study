import { Component, OnInit } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Transaction } from '../../../models/transaction.model';
import { TransactionService } from '../../../services/http/transaction.service';
import { PageModel } from 'study-core-ngx';

@Component({
  selector: 'app-virtual-scroll',
  templateUrl: './virtual-scroll.component.html',
  styleUrls: ['./virtual-scroll.component.scss']
})
export class VirtualScrollComponent implements OnInit {

  page: PageModel<Transaction> = new PageModel<Transaction>();
  transactions: Array<Transaction>;

  constructor(
    public transactionService: TransactionService,
  ) {
  }

  ngOnInit() {
  }

  handlerCdk(cdk: CdkVirtualScrollViewport) {
    // console.log('cdk', cdk.getDataLength(), cdk.getRenderedRange().end);
    if (cdk.getDataLength() === cdk.getRenderedRange().end && this.page.last !== true) {
      this.loadPagination();
    }
  }

  loadPagination(isResetPagination: boolean = false) {
    if (this.page.loadingMore(isResetPagination)) {
      this.transactionService.getAll()
        .subscribe((page: PageModel<Transaction>[]) => {
            // init test
            const pageResult = page.find((pg: PageModel<Transaction>, i) => i === this.page.number);
            // end test

            this.page.updatePagination(pageResult, false);
            this.transactions = this.page.first ? pageResult.content : this.transactions.concat(pageResult.content);
          }
        );
    }
  }

}
