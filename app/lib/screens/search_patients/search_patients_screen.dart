import 'package:flutter/material.dart';

import 'package:get/get.dart';

import 'package:app/models/patient_model.dart';
import 'package:app/models/response_wrapper.dart';
import 'package:app/widgets/patient_card_item.dart';
import 'search_patients_controller.dart';

class SearchPatientsScreen extends StatelessWidget {
  const SearchPatientsScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Buscar Pacientes"),
      ),
      body: GetBuilder<SearchPatientsController>(builder: (controller) {
        Widget bodyWidget;

        switch (controller.patientResponse.status) {
          case Status.initial:
            bodyWidget = const SizedBox();
            break;
          case Status.loading:
            bodyWidget = showLoading();
            break;
          case Status.completed:
            bodyWidget = showPatientList(controller.patientResponse.data);
            break;
          case Status.error:
            bodyWidget = showError(controller.patientResponse.message);
            break;
        }

        return Padding(
          padding: const EdgeInsets.all(16.0),
          child: SingleChildScrollView(
            child:
                Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              const Text("Busque por nome do paciente:",
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                  )),
              Form(
                key: controller.formKey,
                child: TextFormField(
                  decoration:
                      const InputDecoration(labelText: 'Nome do paciente'),
                  controller: controller.textController,
                  keyboardType: TextInputType.text,
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
                      controller.getAllPatientsByName();
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
      }),
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
        child: ListView.builder(
            shrinkWrap: true,
            itemCount: patients.length,
            itemBuilder: (ctx, index) {
              Patient patient = patients[index];
              return PatientCardItem(
                patient: patient,
                showFullData: false,
                itemClick: () {
                  Get.toNamed("/patient/" + patient.id.toString());
                },
              );
            }),
      );
    } else {
      return showError("Nenhum dado encontrado");
    }
  }
}
