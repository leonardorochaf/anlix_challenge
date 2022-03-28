import 'package:json_annotation/json_annotation.dart';

import 'characteristic_type_model.dart';

part 'characteristic_model.g.dart';

@JsonSerializable(explicitToJson: true)
class Characteristic {
  int id;
  DateTime date;
  double value;
  CharacteristicType characteristicType;

  Characteristic(
      {required this.id,
      required this.date,
      required this.value,
      required this.characteristicType});

  factory Characteristic.fromJson(Map<String, dynamic> json) =>
      _$CharacteristicFromJson(json);

  Map<String, dynamic> toJson() => _$CharacteristicToJson(this);
}
