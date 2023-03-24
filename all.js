$(document).ready(function() {
  $('#example').DataTable({
    "processing": true,
    "deferRender": true,
    "responsive": true,
    "suppressWarnings": true,
    "ajax": {
      "url": "data.tsv",
      "dataType": "text",
      "dataSrc": function(tsv) {
        var data = tsvToJson(tsv);
        return data;
      }
    },
    "language": {
      "url": "https://cdn.datatables.net/plug-ins/1.11.3/i18n/zh_Hant.json"
    },
    "columns": [
      { "data": "三和簡碼", "defaultContent": "" },
      { "data": "成分", "defaultContent": "" },
      { "data": "劑量", "defaultContent": "" },
      { "data": "位置", "defaultContent": "" },
      { "data": "庫存",
        "render": function ( data, type, row ) {
          return '<select><option value="1">1</option><option value="2">2</option></select>';
        }
      },
      { "data": "備註", "defaultContent": "" },
    ],
    "initComplete": function () {
      var table = $('#example').DataTable();
      $('#example thead tr').append('<th>庫存</th>');
      table.columns().header().each(function (colIdx) {
        if (table.column(colIdx).header().textContent === '') {
          $('#example thead th').eq(colIdx).html('欄位' + (colIdx + 1));
        }
      });
    }
  });
});
