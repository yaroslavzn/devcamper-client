import { Component, OnInit } from '@angular/core';
import { BootcampsService } from '../bootcamps.service';

@Component({
  selector: 'app-bootcamps',
  templateUrl: './bootcamps.component.html',
  styleUrls: ['./bootcamps.component.scss']
})
export class BootcampsComponent implements OnInit {
  bootcamps = null;

  constructor(private bootcampsService: BootcampsService) { }

  ngOnInit() {
    this.bootcampsService.getBootcamps().subscribe(result => {
      if (result.success) {
        this.bootcamps = result.data;
      }
    });
  }
}
