import { ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild, TemplateRef, SimpleChanges, OnChanges, ChangeDetectionStrategy, Renderer2 } from '@angular/core';
import * as _ from 'lodash';
import { LazyLoadEvent, SortEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { UniversalTableColumn } from './column.model';
import * as moment from 'moment';


@Component({
  selector: 'fixtab-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnChanges {
  @ViewChild('table', { static: true }) table: Table | undefined;

  @Input() captionTemplate: TemplateRef<any> | null = null;
  @Input() headerTemplate: string | null = null;
  @Input() bodyTemplate: string | null = null;
  @Input() footerTemplate: string | null = null;
  @Input() showFullDate = false;

  @Input() reportFilter: boolean | null = false;

  @Input() values: any[] = [];
  @Input() columns: UniversalTableColumn[] = [];
  @Input() sortField: string | undefined;
  @Input() numerSort = false;
  @Input() showCaption = true;
  @Input() showTableName = false;
  @Input() tableName: string | null = null;


  @Input() selectMode: 'single' | 'multiple' | 'checkbox' | '' = 'single';
  @Output() selected = new EventEmitter<any | any[]>();
  _selection: any | any[];
  set selection(selection) {
    this._selection = selection;
    this.selected.emit(this._selection);
  }
  get selection(): any | any[] {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._selection;
  }

  filteredValues: any[] = [];
  storagedData: any[] = [];
  lazyValues: any[] = [];
  searchText = '';
  loading = false;
  totalRecords = 0;
  disableTooltip = true;
  draggedRow: any;
  sortEvent: SortEvent | null = null;
  filterInitialised = false;
  img: HTMLElement | null = null;

  filterGlobal = _.debounce((filterString: string) => {
    this.searchText = filterString;
    let filteredData;
    if (this.reportFilter) {
      filteredData = this.storagedData.filter((data) => this.filterReportFunction(data));
    } else {
      filteredData = this.storagedData.filter((data) => this.filterFunction(data));
    }
    this.filterInitialised = true;
    this.values = filteredData;
    if (this.sortEvent !== null) {
      this.handleSort(this.sortEvent);
    }
    this.totalRecords = this.values.length;
    this.lazyValues = this.values;
    this.cd.detectChanges();
  }, 500, { trailing: true });

  filterGlobalReport = _.debounce((filterString: string) => {
    this.searchText = filterString;
    const filteredData = this.storagedData.filter((data) => this.filterFunction(data));
    this.filterInitialised = true;
    this.values = filteredData;
    if (this.sortEvent !== null) {
      this.handleSort(this.sortEvent);
    }
    this.totalRecords = this.values.length;
    this.lazyValues = this.values;
    this.cd.detectChanges();
  }, 500, { trailing: true });

  constructor(public cd: ChangeDetectorRef, public renderer: Renderer2) { }

  ngOnChanges(changes: SimpleChanges): void {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, @typescript-eslint/prefer-optional-chain
    if (changes['values'] != null && changes['values']['currentValue'] != null) {
      this.setInitialValues();
    }
    this.cd.detectChanges();
  }

  resetSelection(): void {
    if (this.selectMode === 'multiple' || this.selectMode === 'checkbox') {
      this.selection = [];
    } else {
      this.selection = null;
    }
  }

  loadDataOnScroll(event: LazyLoadEvent): void {
    if (this.values.length === 0) {
      return;
    }
    this.loading = true;
    const loadedData = this.values.slice(event.first, (event.first! + event.rows!));
    this.lazyValues.splice(event.first!, event.rows!, ...loadedData);
    event.forceUpdate!();
    this.loading = false;
  }


  enableTooltipIfNecessary(event: any): void{
    if (event.target.offsetWidth < event.target.scrollWidth) {
      this.disableTooltip = false;
    } else {
      this.disableTooltip = true;
    }
  }

  getInstanceType(value: any): string {
    if (moment(value, moment.ISO_8601, true).isValid() && value.toString().includes(':')) {
      return 'DATE';
    } else if (typeof (value) === 'boolean') {
      return 'BOOLEAN';
    }
    return 'UNKNOWN';
  }

  handleSort(event: SortEvent): void {
    this.sortEvent = event;
    this.values.sort((data1, data2) => {
      const value1 = data1[event.field!];
      const value2 = data2[event.field!];
      let result = null;

      if (value1 == null && value2 != null) {
        result = -1;
      }
      else if (value1 != null && value2 == null) {
        result = 1;
      }
      else if (value1 == null && value2 == null) {
        result = 0;
      }
      else if (typeof value1 === 'string' && typeof value2 === 'string') {
        result = value1.localeCompare(value2);
      } else {
        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
      }
      return (event.order! * result);
    });
    this.lazyValues = this.values;
    this.cd.detectChanges();
  }

  filterFunction(data: any): boolean {
    if (this.searchText && this.searchText.length > 0) {
      const searchStringArray = this.searchText.split(' ').filter((elem) => elem.trim() !== '');
      let foundElements = 0;
      if (searchStringArray.length > 0) {
        for (const search of searchStringArray) {
          let occurrence = false;
          this.columns.forEach((col) => {
            let stringValue = String(data[col['field']]);
            if (col.subField != null) {
              if (data[col['field']] != null) {
                stringValue = String(data[col['field']][col['subField']]);
              }
            }
            if (data[col['field']]) {
              if (this.isIsoDateString(data[col['field']]) || (col.subField != null && (this.isIsoDateString(data[col['field']][col['subField']])))) {
                if (this.filterDate(search.trim(), data[col['field']])) {
                  occurrence = true;
                }
              } else if (stringValue.toLowerCase().includes(search.trim().toLowerCase())) { occurrence = true; }
            }
          });
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          if (occurrence) {
            foundElements++;
          }
        }
      } else {
        return true;
      }
      if (searchStringArray.length === foundElements) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  filterReportFunction(data: any): boolean {
    if (this.searchText && this.searchText.length > 0) {
      const searchStringArray = this.searchText.split(' ').filter((elem) => elem.trim() !== '');
      let foundElements = 0;
      if (searchStringArray.length > 0) {
        for (const search of searchStringArray) {
          let occurrence = false;
          this.columns.forEach((col) => {
            const stringValue = String(data.cells[col['lp']!].value);
            if (data.cells[col['lp']!].value) {
              if (this.isIsoDateString(data.cells[col['lp']!].value)) {
                if (this.filterDate(search.trim(), data.cells[col['lp']!].value)) {
                  occurrence = true;
                }
              } else if (stringValue.toLowerCase().includes(search.trim().toLowerCase())) { occurrence = true; }
            }
          });
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          if (occurrence) {
            foundElements++;
          }
        }
      } else {
        return true;
      }
      if (searchStringArray.length === foundElements) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  filterDate(input: any, value: Date | string): boolean{
    let dateString = '';
    // if (value.toString().includes('Z')) {
    //   dateString = moment(value).format('YYYY-MM-DD HH:mm:ss');
    // } else {
    //   dateString = moment.parseZone(value).format('YYYY-MM-DD HH:mm:ss');
    // }
    return dateString?.includes(input) ? true : false ;
  }

  private isIsoDateString(value: string): boolean {
    return /\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d/.test(value);
  }

  private setInitialValues(): void {
    if (this.values.length > 0) {
      this.storagedData = this.values;
      this.totalRecords = this.values.length;
      if (this.searchText !== '') {
        this.filterGlobal(this.searchText);
      } else {
        this.lazyValues = this.storagedData.slice(0, this.table?.rows);
      }
    } else {
      this.storagedData = [];
      this.totalRecords = 0;
      this.lazyValues = [];
    }
  }
}
