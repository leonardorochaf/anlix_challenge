// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'characteristic_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Characteristic _$CharacteristicFromJson(Map<String, dynamic> json) =>
    Characteristic(
      id: json['id'] as int,
      date: DateTime.parse(json['date'] as String),
      value: (json['value'] as num).toDouble(),
      characteristicType: CharacteristicType.fromJson(
          json['characteristicType'] as Map<String, dynamic>),
    );

Map<String, dynamic> _$CharacteristicToJson(Characteristic instance) =>
    <String, dynamic>{
      'id': instance.id,
      'date': instance.date.toIso8601String(),
      'value': instance.value,
      'characteristicType': instance.characteristicType.toJson(),
    };
