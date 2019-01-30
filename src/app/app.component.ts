import { Component, ViewChild } from '@angular/core';
import { RestService } from './rest.service'
import { Casdata } from './casdata'

export interface Token {
  cspapitoken: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'cas-demo-app';

  @ViewChild("f") formValues; // Added this
  cspapitoken: string

  public casdata: Casdata = <Casdata>{};

  constructor(private rs: RestService) {}

  onSubmit(token: Token) {
    this.rs.newCall(token).subscribe((data: Casdata) => {
      this.casdata = data;});
    this.formValues.resetForm();
  }

}
