import { Component, OnInit } from '@angular/core';
import { BootcampsService } from '../bootcamps.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-bootcamps',
  templateUrl: './bootcamps.component.html',
  styleUrls: ['./bootcamps.component.scss']
})
export class BootcampsComponent implements OnInit {
  bootcamps = null;
  loading = true;
  form: FormGroup;

  constructor(private bootcampsService: BootcampsService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      rating: [''],
      budget: ['']
    });

    this.bootcampsService.getBootcamps().subscribe(result => {
      if (result.success) {
        this.bootcamps = result.data;
        this.loading = false;
      }
    });
  }

  onFormSubmit() {
    const rating = this.form.value.rating;
    const budget = this.form.value.budget;

    const queryArr = [];

    if (rating) {
      queryArr.push(`averageRating[gte]=${rating}`);
    }

    if (budget) {
      queryArr.push(`averageCost[lte]=${budget}`);
    }

    const queryString = queryArr.length > 0 ? '?' + queryArr.join('&') : '';

    this.loading = true;

    this.bootcampsService.getBootcamps(queryString).subscribe(result => {
      if (result.success) {
        this.bootcamps = result.data;
        this.loading = false;
      }
    });
  }
}
