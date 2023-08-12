import { Component, OnInit } from '@angular/core';
import { Teacher } from './models';
import { TeacherService } from './teacher.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styles: [
  ]
})
export class TeachersComponent implements OnInit {
  public dataSource: Teacher[] = [];

  public data$: Observable<Teacher[]>;

  public displayedColumns = ['id', 'name', 'surname', 'email', 'actions'];
  constructor(private teacherService: TeacherService) {
    this.data$ = this.teacherService.getTeachers();

  }

  ngOnInit(): void {
    this.teacherService.loadTeachers();
  }

  onCreate(): void {
    this.teacherService.create();
  }

  onDelete(id: number): void {
    this.teacherService.deleteById(id);
  }
}
