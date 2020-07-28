export class SortModel {
  public sorted: boolean;
  public unsorted: boolean;
  public empty: boolean;

  constructor(sorted: boolean = null, unsorted: boolean = null, empty: boolean = null) {
    this.sorted = sorted;
    this.unsorted = unsorted;
    this.empty = empty;
  }
}
