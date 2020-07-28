import { NgModule } from '@angular/core';
import { SharedModule } from '../../_shared/shared.module';
import { DocRoutingModule } from './doc-routing.module';
import { DocComponent } from './doc.component';
import { FormDocComponent } from './form/form-doc/form-doc.component';
import { LayoutRowComponent } from './layout-row/layout-row.component';
import { DynamicGridComponent } from './dynamic-grid/dynamic-grid.component';
import { VirtualScrollComponent } from './virtual-scroll/virtual-scroll.component';
import { FlexLayoutComponent } from './flex-layout/flex-layout.component';
import { PostTestComponent } from './post-test/post-test.component';
import { FormChildComponent } from './form/form-child/form-child.component';
import { HttpStatusTestService } from '../../services/http/http-status-test.service';


@NgModule({
  imports: [
    SharedModule,
    DocRoutingModule,

    // study-ui-ngx
  ],
  declarations: [
    DocComponent,
    FormDocComponent,
    LayoutRowComponent,
    DynamicGridComponent,
    VirtualScrollComponent,
    FlexLayoutComponent,
    PostTestComponent,
    FormChildComponent,
  ],
  exports: [
    DocComponent,
  ],
  providers: [
    HttpStatusTestService,
  ],
})
export class DocModule {
}
