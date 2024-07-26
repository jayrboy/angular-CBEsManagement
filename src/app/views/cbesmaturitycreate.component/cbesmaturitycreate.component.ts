import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import CBEs from '../../models/CBEs';
import { CBEsService } from '../../services/CBEs.service';
import Response from '../../models/response';
import CBEsLogHeader from '../../models/CBEsLogHeader';

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
  isLoading = false;
  cbe = new CBEs();

  cbesLogHeaders: CBEsLogHeader[] | [] = [];
  remark: string | null | undefined = ''; // Initialize remark with an empty string

  // รอบการแก้ไข
  rounds: number[] = [];
  currentRound: number = 1;
  selectedRound: number = 1;

  constructor(
    private route: ActivatedRoute,
    private cbesService: CBEsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      this.id = idParam !== null ? +idParam : 0; // Convert string to number

      if (this.id) {
        this.loadExistData(this.id);
      } else {
        this.isLoading = true;
        console.log('Exists CBE :', this.cbe);
      }
    });
  }

  loadExistData(id: number) {
    // CBEs/editer/:id (แก้ไขข้อมูล CBE)
    this.isLoading = false;

    this.cbesService.getById(id).subscribe((result: Response) => {
      this.cbe = result.data;
      console.log('CBE :', this.cbe);

      this.cbesLogHeaders = result.data.cbesLogHeaders || [];
      this.isLoading = true;

      // Set the remark to the first header's remark or an empty string
      this.remark = this.cbesLogHeaders?.[0].remark;

      this.filterAndAddRounds();
      this.processCBEsData();
    });
  }

  filterAndAddRounds(): void {
    this.currentRound = this.cbesLogHeaders[0].round;
    console.log('Current Round:', this.currentRound);

    // Generate an array of rounds from 1 to currentRound + 1
    this.rounds = Array.from(
      { length: this.currentRound + 1 },
      (_, i) => i + 1
    );
  }

  processCBEsData(): void {
    const processes = this.cbe.cbesProcesses[0];

    if (processes && processes.isDeleted != true) {
      let header = processes.inverseProcessHeader;

      header = this.cbe.cbesProcesses.filter(
        (p) => p.processHeader?.id == processes.id
      );
    }
  }

  onSubmit() {
    this.cbesService.putMaturity(this.cbe).subscribe((result: Response) => {
      alert(result.message);
    });

    console.log('Updated CBE & Maturity:', this.cbe);
  }

  // addSupervisor(): void {
  //   console.log('Added supervisor');
  // }

  // deletedSupervisor() {
  //   console.log('Deleted supervisor');
  // }

  // addSubSupervisor(): void {
  //   console.log('Added sub supervisor');
  // }

  // deletedSubSupervisor() {
  //   console.log('Deleted sub supervisor');
  // }

  // addSupervisorWithMaturity(): void {
  //   console.log('Added supervisor with Maturity');
  // }

  // deletedSupervisorWithMaturity() {
  //   console.log('Deleted supervisor');
  // }
}
