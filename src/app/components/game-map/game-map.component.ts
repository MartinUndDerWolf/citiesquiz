import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {MouseEvent} from '@agm/core';
import {GoogleMapsAPIWrapper} from '@agm/core';
import {GameService} from '../../services/game.service';

/**
 * Just an interface for type safety.
 */
interface MapMarker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}


/**
 * This component shows the map of europe and manages interaction with it.
 */
@Component({
  selector: 'app-game-map',
  templateUrl: './game-map.component.html',
  styleUrls: ['./game-map.component.css'],
  providers: [GoogleMapsAPIWrapper]
})
export class GameMapComponent implements OnInit {
  @ViewChild('msitBtnRow') private msitBtnRow: ElementRef;

  msitMapHeight = 50;
  msitMapWidth = 50;

  /**
   * The style for the google map.
   * style generated with: https://mapstyle.withgoogle.com
   * @type {({elementType: string; stylers: {visibility: string}[]} | {featureType: string; elementType: string; stylers: ({color: string} | {weight: number})[]} | {featureType: string; stylers: {visibility: string}[]})[]}
   */
  mapStyles = [
    {
      'elementType': 'labels',
      'stylers': [
        {
          'visibility': 'off'
        }
      ]
    },
    {
      'featureType': 'administrative.country',
      'elementType': 'geometry.fill',
      'stylers': [
        {
          'color': '#ffeb3b'
        },
        {
          'weight': 5.5
        }
      ]
    },
    {
      'featureType': 'administrative.land_parcel',
      'stylers': [
        {
          'visibility': 'off'
        }
      ]
    },
    {
      'featureType': 'administrative.neighborhood',
      'stylers': [
        {
          'visibility': 'off'
        }
      ]
    },
    {
      'featureType': 'road',
      'stylers': [
        {
          'visibility': 'off'
        }
      ]
    }
  ];
  /**
   * Default options for agm
   * @type {{zoom: number; initLat: number; initLng: number}}
   */
  defaultOptions = {
    // google maps zoom level
    zoom: 4,
    // initially center position for the map at this coordinates
    initLat: 51,
    initLng: 11
  };
  userGuessMarker: MapMarker;

  constructor(public gameService: GameService, private el: ElementRef) { }

  mapClicked($event: MouseEvent) {
    // update the userGuessMarker with the event
    this.userGuessMarker = {
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true,
      label: '?'
    };
  }

  /**
   *
   * @param {MapMarker} m The dragged marker
   * @param {MouseEvent} e This is an agm mouse event!
   */
  markerDragEnd(m: MapMarker, e: MouseEvent) {
    // update the marker with the new coords from the event
    this.userGuessMarker.lat = e.coords.lat;
    this.userGuessMarker.lng = e.coords.lng;
    console.log('dragEnd', m, e);
  }

  ngOnInit() {
    // initially set the size of the map
    this.setSizeOfCanvas();
  }

  // HostListener without '$event', because event is not interesting enough
  @HostListener('window:resize', [])
  onResize() {
    // set new dimensions to the msit-canvas
    this.setSizeOfCanvas();
  }

  /**
   * The dimension of the map must be set explicitly.
   * This will be done by calculating the height and width from the component host.
   */
  private setSizeOfCanvas() {
    setTimeout(() => {
      const elCRect = this.el.nativeElement.getBoundingClientRect();
      const btnCRect = this.msitBtnRow.nativeElement.getBoundingClientRect();
      console.log('btnCRect: ', btnCRect);
      console.log('elCRect: ', elCRect);
      // subtract the margin from each dimension
      this.msitMapHeight = elCRect.height - btnCRect.height - 20;
      this.msitMapWidth = elCRect.width - 20;
    }, 0);
  }

  placeCurrentMarkerFn() {
    // pass the current markers lat/lng to the gameService
    this.gameService.checkPlace(this.userGuessMarker.lat, this.userGuessMarker.lng);
    // ask for a new city in any case
    this.gameService.newCity();
    this.userGuessMarker = undefined;
  }

  newGameFn() {
    this.gameService.reset();
    this.userGuessMarker = undefined;
  }

}
