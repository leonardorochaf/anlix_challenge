import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

import 'package:get/get.dart';

import 'package:app/screens/home/home_controller.dart';
import 'package:app/csv_utils.dart';
import 'package:app/models/patient_model.dart';
import 'package:app/models/response_wrapper.dart';
import 'package:app/widgets/patient_card_item.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: const Text("Home"),
          actions: [
            IconButton(
              icon: const Icon(Icons.search),
              onPressed: () => {Get.toNamed("/search")},
            ),
          ],
        ),
        body: GetBuilder<HomeController>(builder: (controller) {
          Widget bodyWidget;

          switch (controller.patientsCharacteristicsResponse.status) {
            case Status.initial:
              bodyWidget = const SizedBox();
              break;
            case Status.loading:
              bodyWidget = showLoading();
              break;
            case Status.completed:
              bodyWidget = showPatientList(
                  controller.patientsCharacteristicsResponse.data);
              break;
            case Status.error:
              bodyWidget =
                  showError(controller.patientsCharacteristicsResponse.message);
              break;
          }

          return Padding(
            padding: const EdgeInsets.all(16.0),
            child: SingleChildScrollView(
              child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                        "Encontre todas as caracteristicas filtradas por:",
                        style: TextStyle(
                          fontWeight: FontWeight.bold,
                        )),
                    Form(
                      key: controller.formKey,
                      child: TextFormField(
                        decoration: const InputDecoration(labelText: 'Data'),
                        controller: controller.dateController,
                        inputFormatters: [controller.dateMask],
                        keyboardType: TextInputType.number,
                        validator: (value) {
                          if (value == null || value.trim().isEmpty) {
                            return 'Campo obrigatório';
                          }
                          return null;
                        },
                      ),
                    ),
                    Center(
                      child: Padding(
                        padding: const EdgeInsets.only(top: 8.0),
                        child: ElevatedButton(
                          onPressed: () {
                            controller.getAllPatientsCharacteristicsByDate();
                          },
                          style: ElevatedButton.styleFrom(
                            primary: Colors.blueAccent,
                            padding: const EdgeInsets.symmetric(
                                vertical: 20, horizontal: 40),
                            shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(50)),
                          ),
                          child: const Text(
                            'Buscar',
                            style: TextStyle(
                              fontSize: 14,
                              color: Colors.white,
                            ),
                          ),
                        ),
                      ),
                    ),
                    bodyWidget
                  ]),
            ),
          );
        }));
  }

  Widget showLoading() {
    return Column(
      children: const [
        Center(child: CircularProgressIndicator(color: Colors.blueAccent))
      ],
    );
  }

  Widget showError(String? message) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child:
          Center(child: Text(message ?? "Ops, um erro inesperado aconteceu")),
    );
  }

  Widget showPatientList(List<Patient>? patients) {
    if (patients != null && patients.isNotEmpty) {
      return Padding(
        padding: const EdgeInsets.all(8.0),
        child: Column(
          children: [
            kIsWeb
                ? TextButton.icon(
                    onPressed: () {
                      CSVUtils.generateAndDownloadCSVForWeb(patients);
                    },
                    icon: const Icon(Icons.download, color: Colors.black),
                    label: const Text(
                      "Baixar CSV de todos os resultados",
                      style: TextStyle(
                        fontSize: 16,
                        color: Colors.black,
                      ),
                    ))
                : const SizedBox(),
            ListView.builder(
                shrinkWrap: true,
                itemCount: patients.length,
                itemBuilder: (ctx, index) {
                  return PatientCardItem(
                    patient: patients[index],
                    showFullData: true,
                  );
                }),
          ],
        ),
      );
    } else {
      return showError("Nenhum dado encontrado");
    }
  }
}
