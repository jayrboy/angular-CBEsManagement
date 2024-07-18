import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
@Component({
  selector: 'cbesmaturitycreate-page',
  standalone: true,
  templateUrl: './cbesmaturitycreate.component.html',
  styleUrls: ['./cbesmaturitycreate.component.css'],
  imports: [CommonModule, RouterModule, FormsModule],
  providers: [DatePipe],
})
export class CBEsMaturityCreateComponent {
  constructor() {}

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
