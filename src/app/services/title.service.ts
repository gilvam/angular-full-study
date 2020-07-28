import { Injectable } from '@angular/core';
import { filter, map, mergeMap } from 'rxjs/operators';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';

@Injectable()
export class TitleService {

  breadcrumbs: any[];
  urlTmp: string;
  currentPath: string;
  params: {};

  constructor(
    private app: AppRoutingModule,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private title: Title,
  ) {
  }

  static ucFirst(uc) {
    return !uc ? uc : (uc.charAt(0).toUpperCase() + uc.slice(1));
  }

  private getTitleInChildrens(path: string): any {
    let result = { title: '', url: '' };

    this.router.config.map((conf: any) => {
      const childrens = conf['_loadedConfig'];

      // route with loadChildren
      if (childrens) {
        childrens.routes.map(route => {
          let routePath = route.path;
          // substitui ids das rotas pelos valores reais exp: 'user/:id' por 'user/2'
          Object.keys(this.params).map(key => {
            routePath = routePath.replace(`:${ key }`, this.params[key]);
          });
          const pathChildren = conf.path + (routePath ? '/' : '') + routePath;

          if (path === pathChildren && path.includes('/')) {
            result = {
              title: (route && route.data && route.data.title) ? route.data.title : path,
              url: pathChildren,
            };
          }
        });
      }
      // route simple
      else if (path === conf.path) {
        result = {
          title: (conf.data && conf.data.title) ? conf.data.title : path,
          url: conf.path,
        };
      }

    });
    return result;
  }

  init() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .pipe(map(() => {
          let ar: ActivatedRoute = this.activatedRoute;
          while (ar.firstChild) {
            ar = ar.firstChild;
          }
          return ar;
        }),
      )
      .pipe(filter((ar: ActivatedRoute) => ar.outlet === 'primary'))
      .pipe(mergeMap((ar: ActivatedRoute) => {

        ar.params.subscribe(item => {
          this.params = item;
        }).unsubscribe();

        this.currentPath = ar.snapshot.routeConfig.path;

        return ar.data;
      }))
      .pipe(map((data: any) => {
          this.breadcrumbs = [];

          return this.router.url
            .split('/')
            .reduce((acc, frag) => {
              this.urlTmp = acc + (acc && frag ? '/' : '') + frag;
              const response: { title: string, url: string } = this.getTitleInChildrens(this.urlTmp);

              if (response.title && response.url) {
                this.breadcrumbs.push({ name: TitleService.ucFirst(response.title), nameRoute: frag, url: response.url });
              }
              return this.urlTmp;
            });
        }),
      )
      .subscribe(pathString => this.title.setTitle(`${ pathString }`));
  }
}
