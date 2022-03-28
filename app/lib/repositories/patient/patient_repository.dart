import 'package:dio/dio.dart';

import 'package:app/models/api_error_response_model.dart';
import 'package:app/models/api_response_model.dart';
import 'package:app/models/error_exception.dart';
import 'package:app/models/patient_model.dart';
import 'package:app/repositories/patient/patient_repository_interface.dart';

class PatientRepositoryImpl implements PatientRepository {
  final Dio api;

  PatientRepositoryImpl(this.api);

  @override
  Future<List<Patient>> getAllByName(String name) async {
    try {
      Response response =
          await api.get("v1/patients", queryParameters: {'name': name});

      List<Patient> patients = [];

      ApiResponse apiResponse = ApiResponse.fromJson(response.data);

      apiResponse.data.forEach((json) {
        patients.add(Patient.fromJson(json));
      });

      return patients;
    } on DioError catch (error) {
      if (error.response != null && error.response!.data != null) {
        ApiErrorResponse errorResponse =
            ApiErrorResponse.fromJson(error.response!.data);
        throw ErrorException(errorResponse.error.message);
      } else {
        throw Exception(error.toString());
      }
    }
  }

  @override
  Future<Patient> getDetailsById(int id) async {
    try {
      Response response =
          await api.get("v1/patients/" + id.toString() + "/chars");

      ApiResponse apiResponse = ApiResponse.fromJson(response.data);

      Patient patient = Patient.fromJson(apiResponse.data);

      return patient;
    } on DioError catch (error) {
      if (error.response != null && error.response!.data != null) {
        ApiErrorResponse errorResponse =
            ApiErrorResponse.fromJson(error.response!.data);
        throw ErrorException(errorResponse.error.message);
      } else {
        throw Exception(error.toString());
      }
    }
  }
}
