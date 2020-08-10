import { Component, OnInit, ɵPlayState } from '@angular/core';
import {FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms'; //These are the class we import
import {AuthService} from '../auth.service';  
import * as firebase from 'firebase/app';
import 'firebase/firestore'
import { Router } from '@angular/router';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

 ngOnInit(): void {
  }

 
//--------------------------------------------------------------------------------------------------------------------------
myForm:FormGroup;     //Formgroupp class is used  here 
message:string="";
userError:any;

constructor(public fb :FormBuilder , public authService : AuthService , public router: Router )  //ForBuilder class is used inside the constructor
{
  this.myForm=this.fb.group(
    {
firstName:['' ,[Validators.required]],                  //here Validator class is used to validate the neccesary validation
lastName:['',[Validators.required]],
email:['',[Validators.required]],
password:['',[Validators.required]],
confirmPassword:['',[Validators.required,Validators.minLength(8)]]
    },{

        validator:this.checkIfMatchingPasswords("password","confirmPassword")

    }
  ) 

 }
 checkIfMatchingPasswords(passwordKey:string,confirmpasswordKey:string)

 {
      return(group:FormGroup)=>
      {
        let password =group.controls[passwordKey]
        let confirmPassword=group.controls[confirmpasswordKey]

        if(password.value==confirmPassword.value)
        {
          return;
        }
        else
        {
          confirmPassword.setErrors({
            "Not_Equal_To_Password":true
          })
        }
      }
 }


 onSubmit(signupform)
 {
   console.log(signupform.value)
   let email: string=signupform.value.email;
   let password: string=signupform.value.password;
   let firstName:string=signupform.value.firstName
   let lastName:string=signupform.value.lastName;
  this.authService.signup(email,password,firstName,lastName).then((user: any) => {

    firebase.firestore().collection("users").doc(user.uid).set({
      firstName: signupform.value.firstName,
      lastName:  signupform.value.lastName,
      email:  signupform.value.email,
      photoURL:  user.photoURL,
      interests:" ",
      bio:" ",
      hobbies:" "
     
    }).then(() => {
      this.message = "You have been signed up successfully.";
      this.userError = null;
      this.router.navigate(['/myblogs'])

    })
    
  
  }).catch((error) => {
    console.log(error);
    this.userError = error;
  })


}
}