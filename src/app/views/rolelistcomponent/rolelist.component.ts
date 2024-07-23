import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CBEsRoleService } from '../../services/CBEsRole.service';
import CBEsRole from '../../models/CBEsRole';
import Response from '../../models/response';
import { DateFormatService } from '../../services/ConvertDate.service';
import { LoadingComponent } from '../loading/loading.component';
import { catchError, of } from 'rxjs';
@Component({
  selector: 'rolelist-page',
  standalone: true,
  templateUrl: './rolelist.component.html',
  styleUrls: ['./rolelist.component.css'],
  imports: [CommonModule, RouterModule, FormsModule, LoadingComponent],
  providers: [DatePipe],
})
export class RoleListComponent implements OnInit {
  Allroles: CBEsRole[] = [];
  isLoading = false;
  constructor(
    private roleService: CBEsRoleService,
    private dateformatService: DateFormatService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.roleService
      .GetAll()
      .pipe(
        catchError((error) => {
          if (error.status === 401) {
            // การจัดการกรณี Unauthorized
            console.error('Unauthorized request, redirecting to login...');
            this.router.navigate(['/login']); // เปลี่ยนเส้นทางไปยังหน้า login
          }

          return of([]); // ส่งค่ากลับเป็น array ว่างเพื่อไม่ให้เกิดข้อผิดพลาด
        })
      )
      .subscribe((result: any) => {
        if (result.data) {
          this.Allroles = result.data.map((data: any) => {
            return {
              ...data,
              updateDate: this.dateformatService.convertDateFormat(
                data.updateDate
              ), // ส่งไปแปลงวันที่ที่เซอร์วิส
            };
          });

          this.isLoading = true;
          console.log(' ✉ DATA FATCH API : ', result.data);
          console.log(' ✤ this.AllPermission : ', this.Allroles);
        }
      });
  }

  onDelete(id: number) {
    console.log('ต้องการลบ id ', id);
    this.roleService.Delete(id).subscribe((result: Response) => {
      alert(result.message);
      location.reload();
    });
  }

  onEdit(id: number) {
    this.router.navigate(['/role/editer/', id]);
  }

  onUser(id: number) {
    console.log('onUser button work ! ', id);
    this.router.navigate(['/role/users/', id]);
  }

  onCreate() {
    console.log('onCreate button work ! ');
    this.router.navigate(['/role/create']);
  }

  onBinbox() {
    console.log('onBinbox button work ! ');
    this.router.navigate(['/role/bin']);
  }
}
