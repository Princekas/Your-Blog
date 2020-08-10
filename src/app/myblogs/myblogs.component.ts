import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Component({
  selector: 'app-myblogs',
  templateUrl: './myblogs.component.html',
  styleUrls: ['./myblogs.component.css']
})
export class MyblogsComponent implements OnInit {

  user: any = {};
  posts: any[] = [];

  constructor() {
    firebase.firestore().settings({
      timestampsInSnapshots:true
    })
    this.user = firebase.auth().currentUser;
    console.log(this.user)
    this.getPosts();
  }

  ngOnInit() {
  }

  getPosts(){
    // get the list of posts in the website

    firebase.firestore().collection("posts").orderBy("created", "desc")
    .get().then((querySnapshot) => {

      console.log(querySnapshot.docs);
      this.posts = querySnapshot.docs;

    }).catch((err) => {
      console.log(err);
    })

  }

  onPostCreated(){
                      
    this.posts = [];           // refresh the list of posts after creation
    this.getPosts();

  }

  onDelete(){
                              // refresh the list of posts after deletion
    this.posts = [];
    this.getPosts();
  }

}
