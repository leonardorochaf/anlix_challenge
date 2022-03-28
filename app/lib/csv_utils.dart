import 'dart:convert';

import 'package:universal_html/html.dart' as html;
import 'package:app/models/patient_model.dart';
import 'package:csv/csv.dart';

class CSVUtils {
  static generateAndDownloadCSVForWeb(List<Patient> patients) {
    List<String> rowHeader = ["CPF", "TIPO", "VALOR", "DATA"];

    List<List<dynamic>> rows = [];
    rows.add(rowHeader);

    for (var patient in patients) {
      if (patient.characteristics != null) {
        for (var characteristic in patient.characteristics!) {
          List<dynamic> dataRow = [];
          dataRow.add(patient.cpf);
          dataRow.add(characteristic.characteristicType.name);
          dataRow.add(characteristic.value.toString());
          dataRow.add(characteristic.date.toString());

          rows.add(dataRow);
        }
      }
    }

    String csv = const ListToCsvConverter().convert(rows);

    final bytes = utf8.encode(csv);

    final blob = html.Blob([bytes]);

    final url = html.Url.createObjectUrlFromBlob(blob);

    final anchor = html.document.createElement('a') as html.AnchorElement
      ..href = url
      ..style.display = 'none'
      ..download = DateTime.now().toString() + '.csv';

    html.document.body!.children.add(anchor);

    anchor.click();

    html.Url.revokeObjectUrl(url);
  }
}
