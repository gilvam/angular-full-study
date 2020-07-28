import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../services/http/user.service';
import { UserModel } from '../../../../models/user.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
})
export class UserDetailComponent implements OnInit {

  user: UserModel;
  paramId;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
  ) {
    this.paramId = this.activatedRoute.snapshot.params.id;
  }

  ngOnInit() {
    this.userService.findById(this.paramId).subscribe(responseUser => {
      this.user = responseUser;
    });
  }
}
