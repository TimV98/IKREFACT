import {Component, OnInit} from '@angular/core';
import {Contact} from '../contact.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ContactService} from '../contact.service';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css'],
  providers: [ContactService]
})
export class ContactEditComponent implements OnInit {
  id: number;
  contact: Contact;
  contactForm: FormGroup;
  companyFreelancerOptions = ['Bedrijf', 'Freelancer'];

  constructor(private contactService: ContactService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.contactForm = new FormGroup({
      'firstName': new FormControl('', [Validators.required, Validators.minLength(2)]),
      'infix': new FormControl(),
      'surname': new FormControl('', [Validators.required, Validators.minLength(2)]),
      'emails': new FormArray([]),
      'addresses': new FormArray([]),
      'phoneNumbers': new FormArray([]),
      'cfOption': new FormControl(),
      'cfDescription': new FormControl()
    });
    this.addEmail();
    this.addAddress();
    this.addPhoneNumber();
    if (this.route.snapshot.params['contactID'] > '0') {
      this.route.params
        .subscribe(
          (params: Params) => {
            this.fillContactInformation(params);
          });
    }
  }

  private fillContactInformation(params: Params) {
    this.contactService.getSingleContact(params['contactID'])
      .subscribe(
        (contact: Contact) => {
          this.contact = contact;
          this.id = contact.contactID;
          this.contactForm.controls['firstName'].setValue(this.contact.firstName);
          this.contactForm.controls['infix'].setValue(this.contact.infix);
          this.contactForm.controls['surname'].setValue(this.contact.surname);

          for (const index in this.contact.addresses) {
            if (!(<FormArray>this.contactForm.controls['addresses']).at(+index)) {
              this.addAddress();
            }
            (<FormArray>this.contactForm.controls['addresses']).at(+index).patchValue(
              this.contact.addresses[index]);
          }
          for (const index in this.contact.phoneNumbers) {
            if (!(<FormArray>this.contactForm.controls['phoneNumbers']).at(+index)) {
              this.addPhoneNumber();
            }
            (<FormArray>this.contactForm.controls['phoneNumbers']).at(+index).patchValue(
              this.contact.phoneNumbers[index]);
          }
          for (const index in this.contact.emails) {
            if (!(<FormArray>this.contactForm.controls['emails']).at(+index)) {
              this.addEmail();
            }
            (<FormArray>this.contactForm.controls['emails']).at(+index).patchValue(
              this.contact.emails[index]);
          }
          if (this.contact.company.companyName) {
            this.contactForm.controls['cfOption'].setValue('Bedrijf');
            this.contactForm.controls['cfDescription'].setValue(this.contact.company.companyName);
          }
          if (this.contact.freelancer.relation) {
            this.contactForm.controls['cfOption'].setValue('Freelancer');
            this.contactForm.controls['cfDescription'].setValue(this.contact.freelancer.relation);
          }
        }
      );
  }

  addEmail() {
    (<FormArray>this.contactForm.controls['emails']).push(
      new FormGroup({
        'emailAddress': new FormControl(null, [Validators.required, Validators.email]),
        'emailDescription': new FormControl()
      })
    );
  }

  removeEmail() {
    (<FormArray>this.contactForm.controls['emails']).removeAt(-1);
  }

  addAddress() {
    (<FormArray>this.contactForm.controls['addresses']).push(
      new FormGroup({
        'residence': new FormControl('', Validators.required),
        'street': new FormControl('', Validators.required),
        'houseNumber': new FormControl('', [Validators.required, Validators.pattern(/^[1-9+[0-9]*$/)]),
        'zipCode': new FormControl('', [Validators.maxLength(6)]),
        'country': new FormControl(),
        'addressDescription': new FormControl()
      })
    );
  }


  removeAddress() {
    (<FormArray>this.contactForm.controls['addresses']).removeAt(-1);
  }

  addPhoneNumber() {
    (<FormArray>this.contactForm.controls['phoneNumbers']).push(
      new FormGroup({
        'telephoneNumber': new FormControl('', [
          Validators.required, Validators.minLength(9),
          Validators.maxLength(11)
        ]),
        'phoneNumberDescription': new FormControl()
      })
    );
  }

  removePhoneNumber() {
    (<FormArray>this.contactForm.controls['phoneNumbers']).removeAt(-1);
  }

  toContacts() {
    this.router.navigate(['/contacten']);
  }

  get formDataAddresses() {
    return <FormArray>this.contactForm.get('addresses');
  }

  get formDataPhoneNumbers() {
    return <FormArray>this.contactForm.get('phoneNumbers');
  }

  get formDataEmails() {
    return <FormArray>this.contactForm.get('emails');
  }

  onSubmit() {
    if (this.contactForm.valid) {
      if (!this.contact) {
        console.log('add new contact');
        this.contact = new Contact(this.contactForm.value);
        this.contactService.addContact(this.contact).subscribe();
        this.contactForm.reset();
        this.contact = null;
        this.toContacts();
      } else {
        console.log('edit Contact');
        this.contact = new Contact(this.contactForm.value);
        this.contact.contactID = this.id;
        console.log(this.contactForm);
        console.log(this.contact);
        this.contactService.editContact(this.contact).subscribe();
        this.router.navigate(['../'], {relativeTo: this.route});
        this.contactForm.reset();
        this.contact = null;
      }
    }
  }
}
