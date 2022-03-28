import 'package:flutter/material.dart';

import 'package:get/get.dart';
import 'package:intl/intl.dart';
import 'package:mask_text_input_formatter/mask_text_input_formatter.dart';

import 'package:app/repositories/characteristic/characteristic_repository.interface.dart';
import 'package:app/models/response_wrapper.dart';
import 'package:app/models/error_exception.dart';
import 'package:app/models/patient_model.dart';
import '../../constants.dart';

class HomeController extends GetxController {
  final formKey = GlobalKey<FormState>();
  final dateController = TextEditingController();
  final dateMask = MaskTextInputFormatter(mask: "##/##/####");
  final CharacteristicRepository characteristicRepository;

  ResponseWrapper<List<Patient>> patientsCharacteristicsResponse =
      ResponseWrapper.initial();

  HomeController(this.characteristicRepository);

  getAllPatientsCharacteristicsByDate() async {
    if (formKey.currentState == null || !formKey.currentState!.validate()) {
      return;
    }

    patientsCharacteristicsResponse = ResponseWrapper.loading();
    update();

    try {
      final DateFormat brDateFormatter = DateFormat('dd/MM/yyyy');
      final DateTime brDate = brDateFormatter.parse(dateController.text);

      final DateFormat apiDateFormatter = DateFormat('yyyy-MM-dd');
      final String apiDate = apiDateFormatter.format(brDate);

      List<Patient> patients =
          await (characteristicRepository.getAllByDate(apiDate));

      patientsCharacteristicsResponse = ResponseWrapper.completed(patients);
      update();
    } on ErrorException catch (ex) {
      patientsCharacteristicsResponse = ResponseWrapper.error(ex.cause);
      update();
    } catch (e) {
      patientsCharacteristicsResponse = ResponseWrapper.error(kDefaultError);
      update();
    }
  }
}
