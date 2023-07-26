import { Component, OnInit} from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  public users : any = [];
  public role : string ="";
  public fullName : string = "";

  constructor(private auth: AuthService, private api : ApiService,
    private userStore: UserStoreService){

  }

  ngOnInit(): void {

    this.api.getUsers().subscribe(res=>{
      this.users = res;
    });

    this.userStore.getFullNameFromStore().subscribe(res=>{
      let getFullnameFromToken = this.auth.getFullnameFromToken();
      this.fullName = res || getFullnameFromToken;
    })

    this.userStore.getRoleFromStore()
    .subscribe(val=>{
      const roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    })
  }

  

  logout(){
    this.auth.signOut();
  }

}
