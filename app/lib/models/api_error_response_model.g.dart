// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'api_error_response_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

ApiErrorResponse _$ApiErrorResponseFromJson(Map<String, dynamic> json) =>
    ApiErrorResponse(
      ApiErrorBody.fromJson(json['error'] as Map<String, dynamic>),
    );

Map<String, dynamic> _$ApiErrorResponseToJson(ApiErrorResponse instance) =>
    <String, dynamic>{
      'error': instance.error.toJson(),
    };

ApiErrorBody _$ApiErrorBodyFromJson(Map<String, dynamic> json) => ApiErrorBody(
      json['code'] as String,
      json['message'] as String,
      json['debug'] as String,
    );

Map<String, dynamic> _$ApiErrorBodyToJson(ApiErrorBody instance) =>
    <String, dynamic>{
      'code': instance.code,
      'message': instance.message,
      'debug': instance.debug,
    };
