// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'patient_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Patient _$PatientFromJson(Map<String, dynamic> json) => Patient(
      id: json['id'] as int,
      name: json['name'] as String,
      age: json['age'] as int,
      cpf: json['cpf'] as String,
      rg: json['rg'] as String,
      birthday: json['birthday'] as String,
      gender: json['gender'] as String,
      zodiacSign: json['zodiacSign'] as String,
      motherName: json['motherName'] as String,
      fatherName: json['fatherName'] as String,
      email: json['email'] as String,
      password: json['password'] as String,
      cep: json['cep'] as String,
      address: json['address'] as String,
      district: json['district'] as String,
      city: json['city'] as String,
      state: json['state'] as String,
      phone: json['phone'] as String,
      cellphone: json['cellphone'] as String,
      bloodType: json['bloodType'] as String,
      color: json['color'] as String,
      characteristics: (json['characteristics'] as List<dynamic>?)
          ?.map((e) => Characteristic.fromJson(e as Map<String, dynamic>))
          .toList(),
    );

Map<String, dynamic> _$PatientToJson(Patient instance) => <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'age': instance.age,
      'cpf': instance.cpf,
      'rg': instance.rg,
      'birthday': instance.birthday,
      'gender': instance.gender,
      'zodiacSign': instance.zodiacSign,
      'motherName': instance.motherName,
      'fatherName': instance.fatherName,
      'email': instance.email,
      'password': instance.password,
      'cep': instance.cep,
      'address': instance.address,
      'district': instance.district,
      'city': instance.city,
      'state': instance.state,
      'phone': instance.phone,
      'cellphone': instance.cellphone,
      'bloodType': instance.bloodType,
      'color': instance.color,
      'characteristics':
          instance.characteristics?.map((e) => e.toJson()).toList(),
    };
