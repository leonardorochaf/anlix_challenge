import 'package:json_annotation/json_annotation.dart';

part 'characteristic_type_model.g.dart';

@JsonSerializable()
class CharacteristicType {
  int id;
  String name;

  CharacteristicType({required this.id, required this.name});

  factory CharacteristicType.fromJson(Map<String, dynamic> json) =>
      _$CharacteristicTypeFromJson(json);

  Map<String, dynamic> toJson() => _$CharacteristicTypeToJson(this);
}
