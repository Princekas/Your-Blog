import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms'; //These are the class we import
import {AuthService} from '../auth.service';           // auth service is created so we import here the class of the auth service 
import { Router } from '@angular/router';              // this import is for routing service




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {



  myForm:FormGroup;     //Formgroupp class is used  here 
  message:string="";
  userError:any;



  constructor(public fb:FormBuilder , public authService : AuthService,public router:Router)         // To define FormGroup we have to pass FormBuilder  inside the constructor 
  {                                                                             //public authService : AuthService => this way auth service is succesfully injected in login component
    this.myForm=this.fb.group({
       email:['',[Validators.email,Validators.required]],
       password:['',Validators.required]

    })



  }  

  ngOnInit(): void {
  }

  onSubmit(form)
  {
  this.authService.login(form.value.email,form.value.password).then((data)=>{

      console.log(data);
      this.message="You Have been logged in Succesfully"
      this.router.navigate(['/myblogs']) 

    }).catch((error)=>{
      console.log(error);
      this.userError=error;
      
    })
  }

}
