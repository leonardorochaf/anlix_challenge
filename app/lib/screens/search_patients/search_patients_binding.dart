import 'package:dio/dio.dart';
import 'package:get/get.dart';

import 'package:app/repositories/patient/patient_repository.dart';
import 'package:app/repositories/patient/patient_repository_interface.dart';
import 'search_patients_controller.dart';

class SearchPatientsBinding implements Bindings {
  @override
  void dependencies() {
    Get.lazyPut<PatientRepository>(
        () => PatientRepositoryImpl(Get.find<Dio>()));

    Get.lazyPut<SearchPatientsController>(
        () => SearchPatientsController(Get.find<PatientRepository>()));
  }
}
