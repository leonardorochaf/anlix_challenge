import 'package:dio/dio.dart';

import 'package:app/repositories/characteristic/characteristic_repository.interface.dart';
import 'package:app/models/api_response_model.dart';
import 'package:app/models/patient_model.dart';
import 'package:app/models/api_error_response_model.dart';
import 'package:app/models/error_exception.dart';

class CharacteristicRepositoryImpl implements CharacteristicRepository {
  final Dio api;

  CharacteristicRepositoryImpl(this.api);

  @override
  Future<List<Patient>> getAllByDate(String date) async {
    try {
      Response response =
          await api.get("v1/patients/chars", queryParameters: {'date': date});

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
}
