import {AfterViewInit, Component, OnInit} from '@angular/core';
import {GameService} from '../../services/game.service';

/**
 * Show game related information on the screen.
 */
@Component({
  selector: 'app-game-score',
  templateUrl: './game-score.component.html',
  styleUrls: ['./game-score.component.css']
})
export class GameScoreComponent implements OnInit, AfterViewInit {

  constructor(public gameService: GameService) {}

  ngOnInit() {
    // init a new game
    this.gameService.reset();
  }

  ngAfterViewInit() { }

}
