// src/app/components/profile/profile.component.ts
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User = {
    id_user: 1,
    name: 'Ruben',
    last_name: 'Rivas Briceño',
    email: 'uncorreo123@gmail.com',
    photo: 'assets/images/profile-photo.jpg',
    password: '123456'
  };

  isEditing = false;
  editForm: User = { ...this.user };

  constructor() { }

  ngOnInit(): void {
  }

  onEditClick(): void {
    console.log('Valor de user.name:', this.user.name);
    this.isEditing = true;
    this.editForm = { ...this.user };
  }

  onSaveClick(): void {
    this.user = { ...this.editForm };
    this.isEditing = false;
    console.log('Usuario actualizado:', this.user);
  }

  onCancelClick(): void {
    this.isEditing = false;
    this.editForm = { ...this.user };
  }
}