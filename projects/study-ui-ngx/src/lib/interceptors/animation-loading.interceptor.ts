import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AnimationLoadingStore } from '../stores/animation-loading.store';
import { interval, Observable, Subject, Subscriber } from 'rxjs';
import { finalize, map, share, take } from 'rxjs/operators';


@Injectable()
export class AnimationLoadingInterceptor implements HttpInterceptor {

  private count = 0;
  private subject: Subject<number> = new Subject();
  private isInload: boolean;

  private interval: any;
  private timeIntervalTake: number; // quantidade de loops
  private timeInterval: number;     // tempo de intervalo por loop

  constructor(
    protected animationLoadAction: AnimationLoadingStore,
  ) {
    this.timeIntervalTake = 2;
    this.timeInterval = 200;
  }

  /**
   * Cria um Observable para cancelar a animação do loading depois de um certo tempo.
   * Caso venha múltiplas consultas REST, a animação é cancelada apenas quando o ultimo retornar
   */
  private setIntervalToStop() {
    let timeIntervalTakeLast = 0;

    if (this.interval instanceof Subscriber) {
      this.interval.unsubscribe();
    }

    this.interval = interval(this.timeInterval) // tempo por intervalo
      .pipe(
        take(this.timeIntervalTake),            // quantidade de intervalos
        map(i => {
          timeIntervalTakeLast = i;
          return i;
        }),
        finalize(() => { // quando termina todo o processo de looping do interval
          if (this.timeIntervalTake === timeIntervalTakeLast + 1) { // se ininterval nao foi interrompido, finaliza
            this.animationLoadAction.setStop();
          }
        }),
      )
      .subscribe();
  }

  private watchToAnimation(value: boolean) {
    if (this.isInload !== value) {
      if (this.isInload === undefined || value === true) {
        this.animationLoadAction.setStart();
      } else {
        this.setIntervalToStop();
      }
      this.isInload = value;
    }
  }

  /**
   * verifica os contadores de consultas REST
   */
  private watchCounts() {
    if (this.count > 0) {
      this.watchToAnimation(true);  // provável animação
    } else if (this.count === 0) {
      this.watchToAnimation(false); // parar animação
    }
  }

  private actionResponse() {
    --this.count; // decrementa contador
    this.subject.next(this.count);
    this.watchCounts();
  }

  /**
   * interceptor de consultas REST
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const observable = next.handle(req).pipe(share()); // share para cada chamada ser acionada apenas 1 vez

    // mostra animação apenas quando não tem paginação ou quando é uma paginação e sua primeira consulta
    if (!req.params.has('page') || req.params.get('page') === '0') {
      this.count++; // incrementa contador
      this.subject.next(this.count);
      this.watchCounts();

      observable.subscribe((request) => {
      }, (error) => {
        this.actionResponse();
      }, () => {
        this.actionResponse();
      });
    }

    return observable;
  }
}
