import 'package:app/models/patient_model.dart';

abstract class PatientRepository {
  Future<List<Patient>> getAllByName(String name);

  Future<Patient> getDetailsById(int id);
}
