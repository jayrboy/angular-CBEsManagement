import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import CBEs from '../../models/CBEs';
import { CBEsService } from '../../services/CBEs.service';
import Response from '../../models/response';

@Component({
  selector: 'cbesmaturitycreate-page',
  standalone: true,
  templateUrl: './cbesmaturitycreate.component.html',
  styleUrls: ['./cbesmaturitycreate.component.css'],
  imports: [CommonModule, RouterModule, FormsModule],
  providers: [DatePipe],
})
export class CBEsMaturityCreateComponent {
  id: number | undefined = 0;
  datafromapi = false;
  CBEs = new CBEs();

  constructor(
    private route: ActivatedRoute,
    private cbesService: CBEsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      this.id = idParam !== null ? +idParam : 0; // Convert string to number
      console.log('id receive : ', this.id);
    });

    if (this.id) {
      this.cbesService.GetByID(this.id).subscribe((result: Response) => {
        this.CBEs = result.data;

        console.log('✉ DATA FETCH API :', this.CBEs);

        this.datafromapi = true;
      });
    } else {
      this.datafromapi = true;
    }
  }

  onSubmit() {
    console.log('login button work !');
  }

  addSupervisor(): void {
    console.log('Added supervisor');
  }

  deletedSupervisor() {
    console.log('Deleted supervisor');
  }

  addSubSupervisor(): void {
    console.log('Added sub supervisor');
  }

  deletedSubSupervisor() {
    console.log('Deleted sub supervisor');
  }

  addSupervisorWithMaturity(): void {
    console.log('Added supervisor with Maturity');
  }

  deletedSupervisorWithMaturity() {
    console.log('Deleted supervisor');
  }
}
