import 'package:flutter/material.dart';

import 'package:collection/collection.dart';
import 'package:get/get.dart';
import 'package:charts_flutter/flutter.dart' as charts;

import 'package:app/models/characteristic_model.dart';
import 'package:app/models/patient_model.dart';
import 'package:app/models/response_wrapper.dart';
import 'package:app/models/time_series_characteristics.dart';
import 'package:app/widgets/patient_card_item.dart';
import 'package:app/widgets/simple_time_series_chart.dart';
import 'patient_details_controller.dart';

class PatientDetailsScreen extends StatelessWidget {
  const PatientDetailsScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Detalhes do Paciente"),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: GetBuilder<PatientDetailsController>(initState: (state) {
            try {
              String? idString = Get.parameters['patientId'];
              if (idString == null) throw "Parametro inválido";

              int id = int.parse(idString);

              PatientDetailsController.to.loadPatientDetails(id);
            } catch (e) {
              Get.back();
            }
          }, builder: (controller) {
            switch (controller.patientDetailsResponse.status) {
              case Status.initial:
                return const SizedBox();
              case Status.loading:
                return showLoading();
              case Status.completed:
                return showPatientDetails(
                    controller.patientDetailsResponse.data!);
              case Status.error:
                return showError(controller.patientDetailsResponse.message);
            }
          }),
        ),
      ),
    );
  }

  Widget showLoading() {
    return Column(
      children: const [
        Center(child: CircularProgressIndicator(color: Colors.blueAccent))
      ],
    );
  }

  Widget showError(String? message) {
    return Column(
      children: [
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: Center(
              child: Text(message ?? "Ops, um erro inesperado aconteceu")),
        ),
      ],
    );
  }

  Widget showPatientDetails(Patient patient) {
    return Column(
      children: [
        PatientCardItem(patient: patient, showFullData: true),
        (patient.characteristics == null || patient.characteristics!.isEmpty)
            ? const SizedBox()
            : showPatientGraph(patient.characteristics!)
      ],
    );
  }

  Widget showPatientGraph(List<Characteristic> characteristics) {
    final groups = groupBy(characteristics, (Characteristic e) {
      return e.characteristicType.id;
    });

    var widgets = <Widget>[];

    for (var type in groups.values) {
      var typeList = <TimeSeriesCharacteristics>[];
      String typeName = "";

      type.asMap().forEach((i, char) {
        typeName = char.characteristicType.name;
        typeList.add(TimeSeriesCharacteristics(char.date, char.value));
      });

      var graphList = [
        charts.Series<TimeSeriesCharacteristics, DateTime>(
          id: 'Indices',
          colorFn: (_, __) => charts.MaterialPalette.blue.shadeDefault,
          domainFn: (TimeSeriesCharacteristics chars, _) => chars.time,
          measureFn: (TimeSeriesCharacteristics chars, _) => chars.value,
          data: typeList,
        )
      ];

      widgets.add(Padding(
        padding: const EdgeInsets.only(top: 8.0),
        child: Column(
          children: [
            Text(typeName, style: const TextStyle(fontWeight: FontWeight.bold)),
            const SizedBox(height: 10),
            SizedBox(
                height: 200, child: SimpleTimeSeriesChart(graphList, true)),
          ],
        ),
      ));
    }

    return Column(
      // ignore: prefer_const_literals_to_create_immutables
      children: widgets,
    );
  }
}
