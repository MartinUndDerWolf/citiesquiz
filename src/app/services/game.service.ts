import { Injectable } from '@angular/core';
import * as cities from '../../capitalCities.json';
import {CapitalCity} from '../capital-city';
import {isNullOrUndefined} from 'util';

// prevent complaining for missing name
declare var google: any;

/**
 * Service to provide access to the current game information and
 * manages all game related logic.
 */
@Injectable()
export class GameService {
  /**
   * The amount of kilometers around a searched city for which the users guess should be true.
   * @type {number}
   */
  private static thresholdRadius = 50;

  // needs to be casted, because the json format is unknown
  private allCities: Array<CapitalCity> = (<any> cities).capitalCities;
  /**
   * Reference to the google maps map.
   */
  private _mapInstance;
  set mapInstance(value) {
    this._mapInstance = value;
  }

  /**
   * The amount of cities correctly placed.
   * @type {number}
   */
  private _currentScore: number;
  get currentScore(): number {
    return this._currentScore;
  }

  /**
   * The kilometers left in this game session.
   * @type {number}
   */
  private _currentKilometers: number;
  get currentKilometers(): number {
    return this._currentKilometers;
  }

  /**
   * The current city, which should be placed.
   * @type {CapitalCity}
   */
  private _currentCity: CapitalCity;
  get currentCity(): CapitalCity {
    return this._currentCity;
  }

  /**
   * Game ended?
   * @type {boolean}
   */
  private _gameEnd = false;
  get gameEnd(): boolean {
    return this._gameEnd;
  }

  /**
   * Generate a random number between min and max.
   * @param min
   * @param max
   * @return number
   */
  private static generateRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Construct!
   */
  constructor() {
    console.log('cities: ', this.allCities);
  }

  /**
   * Calculate the distance between the current city and the
   * given lat/lng.
   * computeDistanceBetween returns meter which will be converted to km
   */
  private calcDistance(lat: number, lng: number) {
    const userCoords = new google.maps.LatLng(lat, lng);
    const currentCityCoords = new google.maps.LatLng(this._currentCity.lat, this._currentCity.long);
    const distInMeter = google.maps.geometry.spherical.computeDistanceBetween(userCoords, currentCityCoords);
    console.log('distance between: ', {lat: lat, lng: lng}, this.currentCity);
    console.log('distance: ', distInMeter * 1000);
    return distInMeter / 1000;
  }

  private updateGameInformation(distanceFromGuess) {
    const successfulGuess = distanceFromGuess - GameService.thresholdRadius <= 0;
    if (successfulGuess) {
      // increase the score by 1
      this._currentScore++;
    } else {
      // decrease the kilometers by the distance
      this._currentKilometers -= Math.floor(distanceFromGuess);
      // now check, if the kilometers are below zero
      if (this._currentKilometers < 0) {
        // this is the end
        this._gameEnd = true;
        this._currentKilometers = 0;
      }
    }
    return successfulGuess;
  }

  /**
   * Randomly choose a new city to be searched.
   */
  newCity(): CapitalCity {
    if (isNullOrUndefined(this._currentCity)) {
      this._currentCity = this.allCities[0];
    }
    // set the current city for later usage
    const lastCity = this._currentCity;
    let maxIterations = 3;
    while (this._currentCity.capitalCity === lastCity.capitalCity && maxIterations) {
      const rand = GameService.generateRandomValue(0, this.allCities.length - 1);
      this._currentCity = this.allCities[rand];
      maxIterations--;
    }
    console.log('currentCity: ', this._currentCity);
    return this._currentCity;
  }

  /**
   * Set the initial defaults for all attributes.
   */
  reset() {
    this._currentKilometers = 1500;
    this._currentScore = 0;
    this._gameEnd = false;
    this.newCity();
  }

  /**
   *
   * @param {number} lat
   * @param {number} lng
   * @return {any}
   */
  checkPlace(lat: number, lng: number) {
    const distance = this.calcDistance(lat, lng);
    return this.updateGameInformation(distance);
  }

}
