import { Component, ViewChild } from '@angular/core';
import { RestService } from './rest.service'
import { Casdata } from './casdata'
import { forEach } from '@angular/router/src/utils/collection';


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

  public barChartData:any[];

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false
  };
  public barChartLabels = ['Blueprints','Cloud Accounts','Deployments','Projects'];
  public barChartType = 'bar';
  public barChartLegend = false;

  constructor(private rs: RestService) {}

  onSubmit(token: Token) {
    this.rs.newCall(token).subscribe((data: Casdata) => {
      this.casdata = data;
      this.barChartData = [{
        data: [data.bps, data.cloudaccounts, data.deployments, data.projects],
        label: 'Data'
      }];
      console.log(data)
    });
    this.formValues.resetForm();
  }

}
