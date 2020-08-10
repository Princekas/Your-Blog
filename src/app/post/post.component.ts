import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import 'firebase/auth';                 //authentication library
import * as firebase from 'firebase'; 
import 'firebase/firestore'



@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {


@Input('post') post:any;
postData:any={};
user:any={};
@Output('onDelete') onDelete =new EventEmitter();

  constructor() { }

  ngOnInit(): void {      // we are recieving input thatswhy we have to insertin ngOnInit
this.postData=this.post.data();
this.user=firebase.auth().currentUser;
  }
delete()
{
  firebase.firestore().collection("posts").doc(this.post.id).delete().then(()=>{
    this.onDelete.emit();
  })
}
}
