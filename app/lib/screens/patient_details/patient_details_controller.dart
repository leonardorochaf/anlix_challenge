import 'package:get/get.dart';

import 'package:app/models/error_exception.dart';
import 'package:app/models/patient_model.dart';
import 'package:app/models/response_wrapper.dart';
import 'package:app/repositories/patient/patient_repository_interface.dart';
import '../../constants.dart';

class PatientDetailsController extends GetxController {
  static PatientDetailsController get to => Get.find();

  final PatientRepository patientRepository;

  PatientDetailsController(this.patientRepository);

  ResponseWrapper<Patient> patientDetailsResponse = ResponseWrapper.initial();

  loadPatientDetails(int id) async {
    patientDetailsResponse = ResponseWrapper.loading();
    update();

    try {
      Patient patient = await (patientRepository.getDetailsById(id));

      patientDetailsResponse = ResponseWrapper.completed(patient);
      update();
    } on ErrorException catch (ex) {
      patientDetailsResponse = ResponseWrapper.error(ex.cause);
      update();
    } catch (e) {
      patientDetailsResponse = ResponseWrapper.error(kDefaultError);
      update();
    }
  }
}
