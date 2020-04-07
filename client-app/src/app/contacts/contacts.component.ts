import { Component, OnInit } from '@angular/core';
import { ContactService } from './contacts.service';
import { Contact } from '../models/contact.model';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  constructor(private contactService: ContactService) { }
  contacts: Contact[];
  contact: Contact;
  _id: string;
  first_name: string;
  last_name: string;
  contact_number: string;

  first_name2: string;
  last_name2: string;
  contact_number2: string;

  isUdateVisible = false;

  ngOnInit() {
    this.contactService.getContacts().subscribe(
      data => {
        this.contacts = data;
      }
    );
  }

  deleteContact(id: string) {
    this.contactService.deleteContact(id).subscribe(
      data => {
        this.contactService.getContacts().subscribe(
          cdata => {
            this.contacts = cdata;
          }
        );
      }
    );
  }

  addContact() {
    const newContact: Contact = {
      first_name: this.first_name,
      last_name: this.last_name,
      contact_number: this.contact_number
    };
    this.contactService.addContact(newContact).subscribe(
      data => {
        this.contactService.getContacts().subscribe(
          cdata => {
            this.contacts = cdata;
          }
        );
      }
    );
  }

  fillContact(id, fn, ln, cn) {
    this._id = id;
    this.first_name2 = fn;
    this.last_name2 = ln;
    this.contact_number2 = cn;
    this.isUdateVisible = true;
  }
  updateContact() {
    const upContact: Contact = {
      _id: this._id,
      first_name: this.first_name2,
      last_name: this.last_name2,
      contact_number: this.contact_number2
    };
    console.log(upContact);
    this.contactService.updateContact(upContact).subscribe(
      data => {
        alert(data['msg']);
        this.isUdateVisible = false;
        this.contactService.getContacts().subscribe(
          cdata => {
            this.contacts = cdata;
          }
        );
      }
    );
  }

}
