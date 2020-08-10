import { Component, OnInit ,NgZone} from '@angular/core';
import 'firebase/auth';                 //authentication library
import * as firebase from 'firebase'; 
import 'firebase/firestore'
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  post:any={};
  postId:string=" " ;

  constructor(public activatedroute:ActivatedRoute,public ngZone:NgZone) {

firebase.firestore().settings({timestampsInSnapshots:true})

    let postId=this.activatedroute.snapshot.paramMap.get("postId")
    this.postId=postId;
    firebase.firestore().collection("posts").doc(postId).get().then((docSnapshot)=>{
      this.ngZone.run(()=>{
        this.post=docSnapshot.data();
        console.log(this.post)
      })
     


    })
   }

  ngOnInit(): void {
  }

}
