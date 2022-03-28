import 'package:dio/dio.dart';
import 'package:get/get.dart';

import 'package:app/repositories/patient/patient_repository.dart';
import 'package:app/repositories/patient/patient_repository_interface.dart';

import 'patient_details_controller.dart';

class PatientDetailsBinding implements Bindings {
  @override
  void dependencies() {
    Get.lazyPut<PatientRepository>(
        () => PatientRepositoryImpl(Get.find<Dio>()));

    Get.lazyPut<PatientDetailsController>(
        () => PatientDetailsController(Get.find<PatientRepository>()));
  }
}
