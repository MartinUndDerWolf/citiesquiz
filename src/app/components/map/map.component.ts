import { Component, OnInit } from '@angular/core';
import {GameService} from '../../services/game.service';
import {GoogleMapsAPIWrapper} from '@agm/core';

/**
 * This component is a workaround to use the native map from agm to access the
 * geometry methods of the geometry library.
 * Should be removed, if the agm module wraps the geometry library correctly
 * or the injection of the GoogleMapsAPIWrapper works as expected.
 */
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor(public mapApiWrapper: GoogleMapsAPIWrapper, private gameService: GameService) { }

  ngOnInit() {

    // get the native map from agm to use geometry methods.
    this.mapApiWrapper.getNativeMap()
      .then((map) => {
        // pass the map instance to the gameService
        this.gameService.mapInstance = map;
      });

  }
}
