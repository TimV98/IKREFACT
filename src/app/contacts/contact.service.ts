import {Contact} from './contact.model';
import {Injectable} from '@angular/core';
import {HttpReqInterface} from '../httpReq.interface';
import {HttpClient} from '@angular/common/http';
import {Observable, pipe} from 'rxjs';
import {map, subscribeOn} from 'rxjs/operators';

@Injectable()
export class ContactService implements HttpReqInterface {
  private contacts: Contact[] = [];
  private contact: Contact;

  contactsurl = 'walbert/contacts';

  constructor(private http: HttpClient) {
  }

  getContacts() {
    // this.getReq();
    // return this.contacts;
  }

  getContact(id: number) {
    const contact = this.contacts.find(
      (c) => {
        return c.contactID === id;
      }
    );
    return contact;
  }

  deleteReq() {
  }

  getReq(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.contactsurl)
      ;

  }

  getSingleContact(contactID: number): Observable<Contact> {
    return this.http.get<Contact>('walbert/contacts/' + contactID);
  }

  postReq() {
  }

  putReq() {
  }
}
