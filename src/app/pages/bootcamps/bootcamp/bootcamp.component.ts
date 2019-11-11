import { Component, OnDestroy, OnInit } from '@angular/core';
import { BootcampsService } from '../bootcamps.service';
import { Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bootcamp',
  templateUrl: './bootcamp.component.html',
  styleUrls: ['./bootcamp.component.scss']
})
export class BootcampComponent implements OnInit, OnDestroy {
  s1$: Subscription;
  loading = true;
  bootcamp;
  constructor(private bootcampsService: BootcampsService, private route: ActivatedRoute) { }

  ngOnInit() {
    const slug = this.route.snapshot.params.slug;
    this.s1$ = this.bootcampsService.getBootcamp(slug).subscribe(result => {
      if (result.success) {
        this.bootcamp = result.data;
        this.loading = false;
        console.log(this.bootcamp);
      }
    }, err => {
      this.loading = false;
      alert(err.error.message);
    });
  }

  ngOnDestroy(): void {
    this.s1$.unsubscribe();
  }
}
