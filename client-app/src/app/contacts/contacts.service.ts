import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../models/contact.model';
import { map } from 'rxjs/operators';

@Injectable()
export class ContactService {
  constructor(private http: HttpClient) {}

  getContacts() {
    return this.http.get<Contact[]>('http://localhost:3000/api/contacts');
  }

  addContact(newContact: Contact) {
    return this.http.post<Contact>('http://localhost:3000/api/contact', newContact);
  }

  deleteContact(id: string) {
    return this.http.delete('http://localhost:3000/api/contact/' + id);
  }

  updateContact(upContact) {
    return this.http.put('http://localhost:3000/api/contact/' + upContact._id, upContact);
  }
}

