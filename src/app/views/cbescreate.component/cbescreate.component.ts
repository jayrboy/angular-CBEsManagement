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
  datafromapi = false;
  CBEs = new CBEs();
  cbesLogHerder: CBEsLogHeader[] = [];

  cbesLogHeaders: CBEsLogHeader[] = [];
  uniqueRounds: number[] = [];
  maxRound: number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cbesService: CBEsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      this.id = idParam !== null ? +idParam : 0; // Convert string to number
      console.log('CBEs ID :', this.id);
    });

    if (this.id) {
      this.cbesService.GetByID(this.id).subscribe((result: Response) => {
        this.CBEs = result.data;
        this.cbesLogHeaders = result.data.cbesLogHeaders;

        console.log('✉ DATA FATCH API :', this.CBEs);

        // เรียก method สำหรับการกรองและเพิ่มรอบ
        this.filterAndAddRounds();
        this.datafromapi = true;
      });
    } else {
      this.datafromapi = true;
    }

    // Filter the processes where the processHeader's id matches the current process id (p.id)
    const processes = this.CBEs.cbesProcesses[0];

    if (processes && processes.isDeleted != true) {
      processes.inverseProcessHeader = this.CBEs.cbesProcesses.filter(
        (pp) => pp.processHeader?.id === processes.id
      );
    }
  }

  filterAndAddRounds(): void {
    // กรองรอบที่ซ้ำกัน
    this.uniqueRounds = Array.from(
      new Set(this.cbesLogHeaders.map((log) => log.round))
    );

    // หาค่ารอบที่มากที่สุดในปัจจุบัน
    this.maxRound = Math.max(...this.uniqueRounds);

    // เพิ่มรอบถัดไป (maxRound + 1)
    this.uniqueRounds.push(this.maxRound + 1);
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
    console.log('Updated CBEs:', this.CBEs);
    console.log('Updated CBEsLogHerder:', this.cbesLogHeaders);
  }
}
