import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocComponent } from './doc.component';
import { FormDocComponent } from './form/form-doc/form-doc.component';
import { LayoutRowComponent } from './layout-row/layout-row.component';
import { DynamicGridComponent } from './dynamic-grid/dynamic-grid.component';
import { VirtualScrollComponent } from './virtual-scroll/virtual-scroll.component';
import { FlexLayoutComponent } from './flex-layout/flex-layout.component';
import { PostTestComponent } from './post-test/post-test.component';
import { FormChildComponent } from './form/form-child/form-child.component';

const routes: Routes = [
  { path: '', redirectTo: 'doc', pathMatch: 'full' },
  { path: 'doc', component: DocComponent, data: { title: 'doc' } },
  { path: 'formDoc', component: FormDocComponent, data: { title: 'formDoc' } },
  { path: 'formChild', component: FormChildComponent, data: { title: 'formChild' } },
  { path: 'layoutRow', component: LayoutRowComponent, data: { title: 'layoutRow' } },
  { path: 'dynamicGrid', component: DynamicGridComponent, data: { title: 'dynamicGrid' } },
  { path: 'virtualScroll', component: VirtualScrollComponent, data: { title: 'virtualScroll' } },
  { path: 'flexLayout', component: FlexLayoutComponent, data: { title: 'flexLayout' } },
  { path: 'postTest', component: PostTestComponent, data: { title: 'postTest' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocRoutingModule {

}
