import 'package:dio/dio.dart';
import 'package:get/get.dart';

import 'package:app/repositories/characteristic/characteristic_repository.dart';
import 'package:app/repositories/characteristic/characteristic_repository.interface.dart';
import '../../api.dart';
import 'home_controller.dart';

class HomeBinding implements Bindings {
  @override
  void dependencies() {
    Get.lazyPut<Dio>(() => Api.getNodeApi());

    Get.lazyPut<CharacteristicRepository>(
        () => CharacteristicRepositoryImpl(Get.find<Dio>()));

    Get.lazyPut<HomeController>(
        () => HomeController(Get.find<CharacteristicRepository>()));
  }
}
