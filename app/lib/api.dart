import 'dart:io';

import 'package:dio/dio.dart';

import 'package:app/constants.dart';

class Api {
  static Dio getNodeApi() {
    BaseOptions options = _createDefaultApiOptions(kApiEndpoint);

    final dio = Dio(options);

    return dio;
  }

  static BaseOptions _createDefaultApiOptions(String baseUrl) {
    return BaseOptions(
        baseUrl: baseUrl,
        connectTimeout: 60 * 1000, // 60 seconds
        receiveTimeout: 60 * 1000, // 60 seconds
        headers: {HttpHeaders.contentTypeHeader: "application/json"});
  }
}
