import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Doctor } from '@app/_models/doctor';
import { Donor } from '@app/_models/donor';
import { DonorService } from '@app/_services/users/donor.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-edit-donor-dialog',
  templateUrl: './edit-donor-dialog.component.html',
  styleUrls: ['./edit-donor-dialog.component.css']
})
export class EditDonorDialogComponent {
  public form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    bloodType: new FormControl('', [Validators.required])
  });

  constructor (
    private donorService: DonorService,
    @Inject(MAT_DIALOG_DATA) public data: Donor
    ) { }

    ngOnInit() {
      this.populateForm(this.data);
    }

    public onUpdateDonor(): void {
      const updatedDonor = _.merge(this.data, this.form.value);

      this.donorService.updateDonor(updatedDonor).subscribe(
        (response: any) => {
          console.log(response);
        },
        (error: any) => {
          console.log(error);
        }
      );
    }

    private populateForm(donor: Donor) {
      this.form.setValue({
        email: donor.email,
        password: donor.password,
        firstName: donor.firstName,
        lastName: donor.lastName,
        bloodType: donor.bloodType
      });
    }

}
