import 'package:app/models/patient_model.dart';

abstract class CharacteristicRepository {
  Future<List<Patient>> getAllByDate(String date);
}
