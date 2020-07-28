import { environment } from '../../environments/environment';

export class GenericHttpServiceBase {

  private HOST_AND_ENDPOINT_START = environment.api;

  public REST(...endpoint: any[]): any {
    let endPointParams = '';

    endpoint.map((item) => {
      item = String(item);

      if (item[0] !== '/') {
        item = `/${ item }`;
      }

      endPointParams += item;
    });

    if (endpoint) {
      if (environment.api.substring(environment.api.length - 1) === '/') {
        this.HOST_AND_ENDPOINT_START = environment.api.substring(0, environment.api.length - 1);
      }
      return this.HOST_AND_ENDPOINT_START + endPointParams;
    }

    return this.HOST_AND_ENDPOINT_START;
  }

}
