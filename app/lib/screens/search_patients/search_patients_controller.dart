import 'package:flutter/material.dart';

import 'package:get/get.dart';

import 'package:app/models/error_exception.dart';
import 'package:app/models/patient_model.dart';
import 'package:app/models/response_wrapper.dart';
import 'package:app/repositories/patient/patient_repository_interface.dart';
import '../../constants.dart';

class SearchPatientsController extends GetxController {
  final formKey = GlobalKey<FormState>();
  final textController = TextEditingController();
  final PatientRepository patientRepository;

  ResponseWrapper<List<Patient>> patientResponse = ResponseWrapper.initial();

  SearchPatientsController(this.patientRepository);

  getAllPatientsByName() async {
    if (formKey.currentState == null || !formKey.currentState!.validate()) {
      return;
    }

    patientResponse = ResponseWrapper.loading();
    update();

    try {
      List<Patient> patients =
          await (patientRepository.getAllByName(textController.text));

      patientResponse = ResponseWrapper.completed(patients);
      update();
    } on ErrorException catch (ex) {
      patientResponse = ResponseWrapper.error(ex.cause);
      update();
    } catch (e) {
      patientResponse = ResponseWrapper.error(kDefaultError);
      update();
    }
  }
}
