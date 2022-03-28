import 'package:flutter/material.dart';

import 'package:get/get.dart';

import 'package:app/screens/home/home_binding.dart';
import 'package:app/screens/home/home_screen.dart';
import 'package:app/screens/search_patients/search_patients_binding.dart';
import 'package:app/screens/search_patients/search_patients_screen.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final theme = ThemeData(
      primaryColor: Colors.blue,
      // This makes the visual density adapt to the platform that you run
      // the app on. For desktop platforms, the controls will be smaller and
      // closer together (more dense) than on mobile platforms.
      visualDensity: VisualDensity.adaptivePlatformDensity,
    );

    return GetMaterialApp(
      title: 'Anlix App',
      debugShowCheckedModeBanner: false,
      theme: theme.copyWith(
        colorScheme: theme.colorScheme.copyWith(secondary: Colors.blueAccent),
      ),
      initialRoute: '/',
      getPages: [
        GetPage(
            name: '/', page: () => const HomeScreen(), binding: HomeBinding()),
        GetPage(
            name: '/search',
            page: () => const SearchPatientsScreen(),
            binding: SearchPatientsBinding()),
      ],
    );
  }
}
