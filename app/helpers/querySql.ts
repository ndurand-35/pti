import { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'
import { DatatableColumn } from '../../types/base.js'

export const applyColumnFilter = (
  query: ModelQueryBuilderContract<any>,
  columns: DatatableColumn[]
) => {
  // Filtrage par recherche spécifique à chaque colonne
  columns.forEach((col: any) => {
    if (col.searchable === 'true' && col.search.value) {
      const searchValue = col.search.value
      if (col.name) {
        // Sinon, utiliser le nom du champ directement
        query.where(col.name, '=', `${searchValue}`)
      }
    }
  })
}

export const applyGlobalFilter = (
  query: ModelQueryBuilderContract<any>,
  columns: DatatableColumn[],
  searchValue: string
) => {
  query.where((builder) => {
    columns
      .filter((col) => {
        console.log(col.name, col.searchable)
        return col.searchable === 'true'
      })
      .forEach((col) => {
        builder.orWhere(col.name, 'like', `%${searchValue}%`)
      })
  })
}
