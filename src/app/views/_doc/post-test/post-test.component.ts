import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/http/post.service';
import { BaseComponent } from '../../../_shared/base.component';
import { HttpStatusTestService } from '../../../services/http/http-status-test.service';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-post-test',
  templateUrl: './post-test.component.html',
  styleUrls: ['./post-test.component.scss'],
})
export class PostTestComponent extends BaseComponent implements OnInit {
  response: any;

  constructor(
    private postService: PostService,
    private httpStatusTestService: HttpStatusTestService,
    private matDialog: MatDialog,
  ) {
    super();

    this.formGroup = this.formBuilder.group({
      postId: ['1'],
      userId: ['1'],
    });
  }


  ngOnInit() {


    // const dialogRef = this.matDialog.open(DialogHttpStatusComponent, { data: null });
    // dialogRef.afterClosed().subscribe(item => {
    //   console.log('item: ', item);
    // });

  }

  getAll() {
    this.postService.getAll().subscribe(response => {
      this.response = response;
    });
  }

  getAllByUserId() {
    this.postService.getALlByUser(this.formGroup.value.userId).subscribe(response => {
      this.response = response;
    });
  }

  getByPostId() {
    this.postService.getById(this.formGroup.value.postId).subscribe(response => {
      this.response = response;
    });
  }

  go(status: number) {
    this.httpStatusTestService.getStatusTest(status).subscribe(response => {
      // console.log('response: ', response);
    });
  }

}
