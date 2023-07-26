import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastComponent, NgToastService } from 'ng-angular-popup';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  type: string = "password";
  isText:boolean = false;
  eyeIcon: string = "fa-eye-slash";
  loginForm!: FormGroup;
  
  constructor(private fb: FormBuilder, private auth: AuthService,
    private router: Router, private toast : NgToastService,
    private userStore : UserStoreService){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  hideshowpass(){
    this.isText = !this.isText;
    this.isText? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText? this.type = "text" : this.type = "password";
  }

  onSubmit(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
      //send the object ot database
      this.auth.login(this.loginForm.value).subscribe({
        next:(res)=>{
          console.log(res.accessToken);
          this.auth.storeToken(res.accessToken);
          this.auth.storeRefeshToken(res.refreshToken);
          let tokenPayload = this.auth.decodedToken();

          this.userStore.setFullNameFromStore(tokenPayload.unique_name);
          this.userStore.setRoleForStore(tokenPayload.role);

          this.toast.success({'detail':"SUCCESS", summary:res.message, duration: 5000});

          this.loginForm.reset();
          this.router.navigate(['dashboard']);
        },
        error:(err)=>{
          this.toast.error({'detail':"ERROR", summary:"Something went wrong!", duration: 5000});
        }
      });
    }
    else{
      //console.log("Form is not valid");
      //throw the error using Toaster and with the required fields
      ValidateForm.validateAllFormField(this.loginForm);
      alert("Your form is invalid");
    }
  }



}
