import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public branches:string;
  bankinginfo:any;
  bankData: string[] = [];
  //items;
  constructor(public navCtrl: NavController, private http: HttpClient) {
    this.branches = "BANGALORE";
    this.http.get('https://vast-shore-74260.herokuapp.com/banks?city='+this.branches+'').subscribe((response)=> {
      //console.log(response);
      this.bankinginfo = response;
      for (let data of this.bankinginfo){
        this.bankData.push(data);
        //console.log(data.bank_name);
        }
    });
   
    this.initializeItems();
  }

  initializeItems() {
    this.bankinginfo = this.bankData;
    //console.log(this.bankData);
  }
  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();
    // set val to the value of the ev target
    var val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.bankinginfo = this.bankinginfo.filter((bankinfo) => {
        return (bankinfo.bank_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  
  }
  
  selectedBranch(){
    //console.log(this.branches);
    this.http.get('https://vast-shore-74260.herokuapp.com/banks?city='+this.branches+'').subscribe((response)=> {
      //console.log(response);
      this.bankinginfo = response;
    });
    this.initializeItems();
  }
}
