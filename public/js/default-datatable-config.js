const defaultDatatableConfig = {
  processing: true,
  serverSide: true,
  pagingType: 'simple_numbers',
  serverSide: true,
  autoWidth: false,
  processing: true,
  createdRow: function (row, data, dataIndex) {
    $(row).addClass(`
                        border-t border-zinc-200
                        ${dataIndex % 2 ? '!bg-zinc-200' : '!bg-white'} 
                        justify-center
                    `)
  },
  language: {
    url: '/js/i18n/fr-FR.json',
  },
  initComplete: function () {
    $('.dt-search').append($('#custom-filter').removeClass('hidden'))
    $('#custom-filter').append($('.dt-buttons'))
    //updateRowsEditButtonsUrls();
  },
}
