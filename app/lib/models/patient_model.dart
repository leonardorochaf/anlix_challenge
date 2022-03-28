import 'package:json_annotation/json_annotation.dart';

import 'characteristic_model.dart';

part 'patient_model.g.dart';

@JsonSerializable(explicitToJson: true)
class Patient {
  int id;
  String name;
  int age;
  String cpf;
  String rg;
  String birthday;
  String gender;
  String zodiacSign;
  String motherName;
  String fatherName;
  String email;
  String password;
  String cep;
  String address;
  String district;
  String city;
  String state;
  String phone;
  String cellphone;
  String bloodType;
  String color;
  List<Characteristic>? characteristics;

  Patient(
      {required this.id,
      required this.name,
      required this.age,
      required this.cpf,
      required this.rg,
      required this.birthday,
      required this.gender,
      required this.zodiacSign,
      required this.motherName,
      required this.fatherName,
      required this.email,
      required this.password,
      required this.cep,
      required this.address,
      required this.district,
      required this.city,
      required this.state,
      required this.phone,
      required this.cellphone,
      required this.bloodType,
      required this.color,
      required this.characteristics});

  factory Patient.fromJson(Map<String, dynamic> json) =>
      _$PatientFromJson(json);

  Map<String, dynamic> toJson() => _$PatientToJson(this);
}
