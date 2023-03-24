function tsvToJson(tsv) {
  var lines = tsv.split('\n');
  var result = [];
  var headers = lines[0].split('\t');

  for (var i = 1; i < lines.length; i++) {
    var obj = {};
    var currentline = lines[i].split('\t');

    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j] || null; // 使用 null 來代表缺失值
    }

    result.push(obj);
  }

  return result;
}

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
      { 
        "data": "庫存",
        "defaultContent": "",
        "render": function(data, type, row, meta) {
          if (type === 'display') {
            var select = $('<select/>').attr({ 'id': 'inventory', 'name': 'inventory' });
            for (var i = 1; i <= 10; i++) {
              var option = $('<option/>').attr({ 'value': i }).text(i);
              if (i.toString() === data) {
                option.attr('selected', 'selected');
              }
              select.append(option);
            }
            return $('<div/>').append(select).html();
          }
          return data;
        }
      },
      { "data": "備註", "defaultContent": "" },
    ],
    
  });
});
