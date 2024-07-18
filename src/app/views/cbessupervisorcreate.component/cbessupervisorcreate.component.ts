import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CBEsService } from '../../services/CBEs.service';
import CBEs from '../../models/CBEs';
import Response from '../../models/response';
import { LoadingComponent } from '../loading/loading.component';
import CBEswithSupervisor from '../../models/CBEsWithSupervisor';
@Component({
  selector: 'cbessupervisorcreate-page',
  standalone: true,
  templateUrl: './cbessupervisorcreate.component.html',
  styleUrls: ['./cbessupervisorcreate.component.css'],
  imports: [CommonModule, RouterModule, FormsModule, LoadingComponent],
  providers: [DatePipe],
})
export class CBEsSupervisorCreateComponent {
  id: number | undefined = 0;
  datafromapi = false;
  CBEs = new CBEs();
  selectedSupervisor: string = ''; // สร้างตัวแปรเพื่อเก็บค่าที่เลือก
  roundOptions: number[]; // ตัวเลือกใน select
  selectedRound: number; // ค่าเริ่มต้นที่เลือกใน select

  constructor(
    private route: ActivatedRoute,
    private cbesService: CBEsService,
    private router: Router
  ) {
    this.roundOptions = [1, 2, 3];
    this.selectedRound = 1; // ค่าเริ่มต้นที่ต้องการให้แสดง
  }

  ngOnInit(): void {
    // กำหนดค่าเริ่มต้นให้กับ selectedSupervisor ใน ngOnInit หรือในส่วนต่างๆ ตามที่เหมาะสม
    // if (this.CBEs.cbeswithSupervisors.length > 0) {
    //   this.selectedSupervisor = this.CBEs.cbeswithSupervisors[0];
    // }

    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      this.id = idParam !== null ? +idParam : 0; // Convert string to number
      console.log('id receive : ', this.id);
    });

    if (this.id != 0 && this.id != undefined && this.id != null) {
      this.cbesService.GetByID(this.id).subscribe((result: Response) => {
        this.CBEs = result.data;
        console.log('✉ DATA FATCH API :', this.CBEs);
        this.datafromapi = true;
      });
    } else {
      this.router.navigate(['/CBEs/bin/']);
    }
  }

  onSubmit() {
    console.log('login button work !');
  }

  addSupervisor(): void {
    console.log('Added supervisor');
  }

  deletedSupervisor(i: number, supervisor: any): void {
    console.log('Deleted supervisor');
  }

  addSubSupervisor(): void {
    console.log('Added sub supervisor');
  }

  deletedSubSupervisor(): void {
    console.log('Deleted sub supervisor');
  }

  addSupervisorWithMaturity(): void {
    console.log('Added supervisor with Maturity');
  }

  deletedSupervisorWithMaturity() {
    console.log('Deleted supervisor');
  }
}
