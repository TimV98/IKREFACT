import {Contact} from './contact.model';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, pipe} from 'rxjs';

@Injectable()
export class ContactService {
  private contacts: Contact[] = [];
  private contact: Contact;

  contactsUrl = 'walbert/contacts';

  constructor(private http: HttpClient) {
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
    // @ts-ignore
    return this.http.post(this.contactsUrl, contact, {responseType: 'json'});
    // .pipe(
    //   catchError(this.handleError('addHero', expense))
    // );
  }

  editContact(contact: Contact) {
    // @ts-ignore
    return this.http.put(this.contactsUrl, contact, {responseType: 'json'});
    // .pipe(
    //   catchError(this.handleError('addHero', expense))
    // );
  }
}
