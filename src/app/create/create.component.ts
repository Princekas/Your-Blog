import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Add these imports for ngx-editor
import { schema } from 'ngx-editor';
import { DOMSerializer } from 'prosemirror-model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  title: string;
  contents: any;


  @Output('postCreated') postCreated = new EventEmitter();

  constructor() {
   
  }

  ngOnInit() {}

  createPost() {
   
   firebase.firestore().settings({
     timestampsInSnapshots:true
   });
    firebase
      .firestore()
      .collection("posts")
      .add({
        title: this.title,
       contents:this.contents,
        owner: firebase.auth().currentUser.uid,
        created: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then((data) => {
        console.log(data);
        this.postCreated.emit();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
