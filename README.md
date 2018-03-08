# CitiesQuiz

[Demo](https://martinschumann.cool)

This is the implementation of a small game, which was created in less then 8h. It also shows the usage of the GoogleMaps JavaScript API with the help of [AGM - Angular Google Maps](https://angular-maps.com/).
The site was tested on the following platforms:

## Testing
- Mac OS X 10.12.6
  - Firefox Quantum 58.0.2 (64-Bit)
  - Safari 11.0.3
  - Chrome Version 65.0.3325.146 (Official Build) (64-bit)
- Kubuntu 14.04
  - Firefox Quantum 57.0.1 (64-Bit)
- Android
  - Samsung S5 Mini (Had problems with the automatic google translation, but works if deactivated.)
- iPhone
  - iOS 11.2.6
- Windows
  - Windows 7 / IE 11
  - Firefox Quantum﻿57.0 (64-Bit)

### Explain how you would store the high score

With a REST server the high score could be saved on the server. A page could be added to display a ranking. For the ranking a user name must be provided by the user.

### Explain what you would do better

- More feedback.
  - If the placement was successful/unsuccessful.
  - If the game is over.
  - Dialog for user interaction after placement was set (next).
- Error messages.
- Some animation for the GUI. 
- Store the cities.json on the server and retrieve lat/lng automatically.
- REST Server to store the high score and other stuff.
- Replace Google Maps API with custom implementation for offline usage.
- Ranking page.
- Add preview of all cities.
- Extend list of cities. Add other geographic locations (lakes, rivers, mountains ...)
- Input of a user name, if the user reached a high score.

## Angular CLI
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.4.
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.
