import { ChangeDetectorRef, Component, OnInit, Renderer2 } from '@angular/core';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'fixtab-expanded-table',
  templateUrl: './expanded-table.component.html'
})

export class ExpandedTableComponent extends TableComponent implements OnInit {
  constructor(
      public override cd: ChangeDetectorRef,
      public override renderer: Renderer2) {
    super(cd, renderer);
   }

  ngOnInit() { }
}
