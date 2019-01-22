import {Contact} from './contact.model';
import {Injectable} from '@angular/core';
import {HttpReqInterface} from '../httpReq.interface';
import {HttpClient} from '@angular/common/http';
import {Observable, pipe} from 'rxjs';
import {map, subscribeOn} from 'rxjs/operators';
import {FormGroup} from '@angular/forms';
import {Expense} from '../expense/expense';

@Injectable()
export class ContactService {
  private contacts: Contact[] = [];
  private contact: Contact;

  contactsUrl = 'walbert/contacts';

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

  deleteContact(contactID: number): Observable<{}> {
    return this.http.delete<Contact>('walbert/contacts/' + contactID);
  }

  getReq(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.contactsUrl)
      ;

  }

  getSingleContact(contactID: number): Observable<Contact> {
    return this.http.get<Contact>('walbert/contacts/' + contactID);
  }

  putReq() {
  }

  addContact(contact: Contact): Observable<Contact> {
    // copy van expense
    // @ts-ignore
    // Dit werkt en is de enige manier (zover ik weet) om de responsetype aan te geven.
    // Toch geeft IntelliJ de error "Type '"text"' is not assignable to type '"json"'.".
    // console.log(this.contact.emails);
    return this.http.post(this.contactsUrl, contact, {responseType: 'json'});
    // .pipe(
    //   catchError(this.handleError('addHero', expense))
    // );
    
  }
}
