import 'package:flutter/foundation.dart';

const String kApiEndpoint = "http://127.0.0.1:3000/api/";
const String kDefaultError =
    "Não foi possível completar sua chamada. Verifique os dados novamente.";
final isWebDesktop = kIsWeb &&
    (defaultTargetPlatform != TargetPlatform.iOS &&
        defaultTargetPlatform != TargetPlatform.android);
