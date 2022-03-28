import 'package:app/csv_utils.dart';
import 'package:app/models/patient_model.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

class PatientCardItem extends StatelessWidget {
  final Patient patient;
  final bool showFullData;
  final VoidCallback? itemClick;

  const PatientCardItem(
      {Key? key,
      required this.patient,
      required this.showFullData,
      this.itemClick})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return InkWell(
        onTap: itemClick != null ? () => itemClick!() : null,
        child: Card(
          margin: const EdgeInsets.only(top: 8.0, bottom: 8.0),
          elevation: 3,
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              children: [
                Text(patient.name,
                    style: const TextStyle(fontWeight: FontWeight.bold)),
                const SizedBox(height: 5),
                Text(patient.email),
                const SizedBox(height: 5),
                !showFullData
                    ? const SizedBox()
                    : Column(
                        children: [
                          Text('Quantidade de caractersticas: ' +
                              (patient.characteristics != null
                                  ? patient.characteristics!.length.toString()
                                  : "0")),
                          const SizedBox(height: 5),
                          !kIsWeb ||
                                  (patient.characteristics == null ||
                                      patient.characteristics!.isEmpty)
                              ? const SizedBox()
                              : TextButton.icon(
                                  onPressed: () {
                                    CSVUtils.generateAndDownloadCSVForWeb(
                                        [patient]);
                                  },
                                  icon: const Icon(Icons.download,
                                      color: Colors.black),
                                  label: const Text(
                                    "Baixar CSV individual",
                                    style: TextStyle(
                                      fontSize: 16,
                                      color: Colors.black,
                                    ),
                                  )),
                          (patient.characteristics == null ||
                                  patient.characteristics!.isEmpty)
                              ? const SizedBox()
                              : ExpansionTile(
                                  title: const Text("Caracteristicas"),
                                  collapsedBackgroundColor: Colors.grey[100],
                                  children: [
                                    DataTable(
                                      columns: const <DataColumn>[
                                        DataColumn(
                                          label: Text(
                                            'Tipo',
                                          ),
                                        ),
                                        DataColumn(
                                          label: Text(
                                            'Indice',
                                          ),
                                        ),
                                        DataColumn(
                                          label: Text(
                                            'Data',
                                          ),
                                        ),
                                      ],
                                      rows: patient.characteristics!
                                          .map((item) => DataRow(
                                                cells: <DataCell>[
                                                  DataCell(Text(item
                                                      .characteristicType
                                                      .name)),
                                                  DataCell(Text(
                                                      item.value.toString())),
                                                  DataCell(Text(
                                                      item.date.toString())),
                                                ],
                                              ))
                                          .toList(),
                                    )
                                  ],
                                )
                        ],
                      )
              ],
            ),
          ),
        ));
  }
}
