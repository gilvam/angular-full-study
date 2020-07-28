import { SortModel } from './sort.model';

export class Pageable {
  private offset: Number;
  private pageNumber: Number;
  private pageSize: Number;
  private paged: boolean;
  private unpaged: boolean;
  private sort: SortModel;

  constructor(offset: Number = null, pageNumber: Number = null, pageSize: Number = null, paged: boolean = null, unpaged: boolean = null,
              sort: SortModel = new SortModel()) {
    this.offset = offset;
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
    this.paged = paged;
    this.unpaged = unpaged;
    this.sort = sort;
  }
}
