export interface UniversalTableColumn {
  field: string;
  header: string;
  subField?: string;
  style?: any;
  lp?: number,
  label?: string,
  name?: string,
  hidden?: boolean,
  onylExport?: boolean,
  exportable?: boolean,
  summaryResult?: object
}
