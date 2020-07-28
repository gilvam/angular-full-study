import { Pageable } from './pageable.model';
import { SortModel } from './sort.model';

export class PageModel<T> {

  content: Array<T>;
  pageable: Pageable;
  totalPages: number;
  totalElements: number;      // Quantidade total de registros até o momento.
  last: boolean;              // se é ultima página
  first: boolean;             // se é ultima página
  sort: SortModel;
  number: number;             // página atual
  numberOfElements: number;
  size: number;               // quantidade de registros por página
  empty: boolean;

  /**
   * controle apenas para o front-end
   */
  isLoading: boolean;           // se está carregando os dados
  totalCurrentElements: number; // quantidade total de registros até o momento

  constructor(size: number = 25, number: number = 0, totalElements: number = null, numberOfElements: number = null) {
    this.pageable = new Pageable();
    this.totalElements = totalElements;
    this.last = false;
    this.first = false;
    this.sort = new SortModel();
    this.number = number;
    this.size = size;
    this.empty = null;
    this.isLoading = false;
  }

  /**
   * Verifica se existem mais dados a serem carregados,
   * @param isReload
   */
  public loadingMore(isReload: Boolean = false) {
    if (isReload) {
      this.reset();
    }
    // Não deixa carregar mais dados se uma pesquisa de paginação ainda não foi finalizada
    else if (this.isLoading) {
      return false;
    }

    this.isLoading = this.number > 0;
    return !this.last;
  }

  /**
   * Atualizar paginação quando é realizado uma continuação da pesquisa anterior
   * @param response
   * @param isLoading
   */
  public updatePagination(response, isLoading: boolean) {
    this.totalElements = response.totalElements;
    this.numberOfElements = response.numberOfElements;
    this.last = response.last;
    this.first = response.first;
    this.totalPages = response.totalPages;
    this.number++;
    this.isLoading = isLoading;

    this.totalCurrentElements = this.last ?
      (this.size * (this.number - 1)) + this.numberOfElements :
      this.size * this.number;
  }

  public setAllLoaded() {
    this.numberOfElements = (this.totalPages * this.size) - this.totalElements;
    this.last = true;
    this.first = false;
    this.isLoading = false;
    this.number = this.totalPages;
    this.totalElements = this.totalElements;
  }

  /**
   * Fazer a pesquisa do zero
   */
  public reset() {
    this.totalElements = 0;
    this.numberOfElements = 0;
    this.last = false;
    this.first = false;
    this.number = 0;
  }

  /**
   * Remove um elemento da listagem
   */
  public removeElement() {
    this.totalElements--;
    this.totalElements--;
  }
}
