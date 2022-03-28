import 'package:json_annotation/json_annotation.dart';

part 'api_error_response_model.g.dart';

@JsonSerializable(explicitToJson: true)
class ApiErrorResponse {
  final ApiErrorBody error;

  ApiErrorResponse(this.error);

  factory ApiErrorResponse.fromJson(Map<String, dynamic> json) =>
      _$ApiErrorResponseFromJson(json);

  Map<String, dynamic> toJson() => _$ApiErrorResponseToJson(this);
}

@JsonSerializable(explicitToJson: true)
class ApiErrorBody {
  final String code;
  final String message;
  final String debug;

  ApiErrorBody(this.code, this.message, this.debug);

  factory ApiErrorBody.fromJson(Map<String, dynamic> json) =>
      _$ApiErrorBodyFromJson(json);

  Map<String, dynamic> toJson() => _$ApiErrorBodyToJson(this);
}
