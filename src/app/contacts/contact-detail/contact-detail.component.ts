import {Component, OnInit} from '@angular/core';
import {Contact} from '../contact.model';
import {ContactService} from '../contact.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css'],
  providers: [ContactService]
})
export class ContactDetailComponent implements OnInit {
  public contact: Contact;
  public contactID: number;


  constructor(private contactService: ContactService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.getContact(params);
          setTimeout(() => {
              this.getContact(params);
            }
            , 1000);
        }
      );


  }

  getContact(params: Params) {
    this.contactService.getSingleContact(params['contactID'])
      .subscribe(
        (contact: Contact) => {
          this.contact = contact;
        });
  }

  deleteContact() {
    if (window.confirm('Weet je zeker dat je dit contact wilt verwijderen?')) {
      this.contactService.deleteContact(this.contact.contactID).subscribe();

      setTimeout(() => {
          this.router.navigate(['/contacten']);
        }
        , 500);
    }

  }

  onEditContact() {
    this.router.navigate(['wijzigen'], {relativeTo: this.route});
  }

  toQuotation() {
    this.router.navigate(['offerte'], {relativeTo: this.route});
  }
}
