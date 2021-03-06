import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { CourseItem } from '../course-item.model';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseItemComponent implements OnInit {

  @Input() public courseItem: CourseItem;
  @Output() public deletedCourseId = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }

  deleteCourse(courseId) {
    this.deletedCourseId.emit(courseId);
  }
}
