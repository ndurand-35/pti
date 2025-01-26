export interface DatatableColumn {
  data: string
  name: string
  searchable: string
  orderable: string
  search: { value: string?; regex: string }
}
