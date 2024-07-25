import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LoadingComponent } from '../loading/loading.component';
import { CBEsService } from '../../services/CBEs.service';
import CBEs from '../../models/CBEs';
import Response from '../../models/response';
import CBEsProcess from '../../models/CBEsProcess';
import CBEsLogHeader from '../../models/CBEsLogHeader';

@Component({
  selector: 'cbescreate-page',
  standalone: true,
  templateUrl: './cbescreate.component.html',
  styleUrls: ['./cbescreate.component.css'],
  imports: [CommonModule, RouterModule, FormsModule, LoadingComponent],
  providers: [DatePipe],
})
export class CBEsCreateComponent implements OnInit {
  id: number | undefined = 0;
  isLoading = false;
  CBEs: CBEs = new CBEs();

  CBEsLogHeaders: CBEsLogHeader[] = [];
  remark: string = ''; // Initialize remark with an empty string

  // รอบการแก้ไข
  rounds: number[] = [];
  currentRound: number = 1;
  selectedRound: number = 1;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cbesService: CBEsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      this.id = idParam !== null ? +idParam : 0; // Convert string to number

      if (this.id) {
        // CBEs/editer/:id (แก้ไขข้อมูล CBE)
        this.loadCBEData(this.id);
      } else {
        this.isLoading = true;
        this.rounds = [1]; // Default rounds for new data
        this.currentRound = 1; // Default rounds for new data
        console.log('Creating new CBE:', this.CBEs);
      }
    });
  }

  loadCBEData(id: number): void {
    this.isLoading = false;

    this.cbesService.getById(id).subscribe((result: Response) => {
      this.CBEs = result.data;
      this.CBEsLogHeaders = result.data.cbesLogHeaders;
      this.isLoading = true;

      // Set the remark to the first header's remark or an empty string
      this.remark =
        this.CBEsLogHeaders.length > 0 ? this.CBEsLogHeaders[0].remark : '';
      console.log('✉ Fetch API for Update CBE:', this.CBEs);

      this.filterAndAddRounds();

      // Handle the processes after data is loaded
      this.processCBEsData();
    });
  }

  filterAndAddRounds(): void {
    this.currentRound = this.CBEsLogHeaders[0].round;
    console.log('Current Round:', this.currentRound);

    // Generate an array of rounds from 1 to currentRound + 1
    this.rounds = Array.from(
      { length: this.currentRound + 1 },
      (_, i) => i + 1
    );
  }

  processCBEsData(): void {
    const processes = this.CBEs.cbesProcesses[0];

    if (processes && !processes.isDeleted) {
      processes.inverseProcessHeader = this.CBEs.cbesProcesses.filter(
        (pp) => pp.processHeader?.id === processes.id
      );
    }
  }

  deleteProcess(process: CBEsProcess): void {
    process.isDeleted = true;

    const deleteSubProcesses = (subProcesses: CBEsProcess[]): void => {
      subProcesses.forEach((subProcess) => {
        subProcess.isDeleted = true;
        if (subProcess.inverseProcessHeader) {
          deleteSubProcesses(subProcess.inverseProcessHeader);
        }
      });
    };

    if (process.inverseProcessHeader) {
      deleteSubProcesses(process.inverseProcessHeader);
    }
  }

  addProcess(): void {
    const newProcess: CBEsProcess = {
      id: 0,
      name: '',
      weight: 0,
      createDate: new Date(),
      updateDate: new Date(),
      isDeleted: false,
      processHeaderId: null, // No parent for the main process
      cbesId: this.CBEs.id,
      cbes: new CBEs(), // create a new CBEs object
      cbesIndicators: [],
      cbesMaturities: [],
      cbesProcessLog: [],
      cbesProcessPlanning: [],
      cbesProcessResults: [],
      cbesProcessTargets: [],
      inverseProcessHeader: [],
      processHeader: null,
    };

    this.CBEs.cbesProcesses.push(newProcess);
  }

  addChildProcess(parentProcess: CBEsProcess): void {
    const newSubProcess: CBEsProcess = {
      id: 0,
      name: '',
      weight: 0,
      createDate: new Date(),
      updateDate: new Date(),
      isDeleted: false,
      processHeaderId: parentProcess.id, // Assign the parent process id
      cbesId: this.CBEs.id,
      cbes: new CBEs(), // create a new CBEs object
      cbesIndicators: [],
      cbesMaturities: [],
      cbesProcessLog: [],
      cbesProcessPlanning: [],
      cbesProcessResults: [],
      cbesProcessTargets: [],
      inverseProcessHeader: [],
      processHeader: parentProcess, // Reference to parent process
    };

    // Add the newSubProcess to the inverseProcessHeader of the parent process
    if (!parentProcess.inverseProcessHeader) {
      parentProcess.inverseProcessHeader = [];
    }

    parentProcess.inverseProcessHeader.push(newSubProcess);
  }

  onSave2Maturity() {
    console.log('save and navigate to maturities');
  }

  onSubmit() {
    // Debug log to check the updated CBEs object
    console.log('Created CBEs:', this.CBEs);

    if (this.CBEsLogHeaders.length == 0) {
      this.cbesService.post(this.CBEs).subscribe((result: Response) => {
        alert(result.message);
        this.router.navigate(['/CBEs/create']);
      });
    } else {
      console.log('Updated CBEs:', this.CBEs);
      this.router.navigate(['/CBEs/', this.CBEs.id]);
    }
  }
}
