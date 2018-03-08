import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MaterialModules} from '../material-modules/material.module';
import { MainComponent } from './components/main/main.component';
import { GameComponent } from './components/game/game.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { GameScoreComponent } from './components/game-score/game-score.component';
import { GameMapComponent } from './components/game-map/game-map.component';
import {AgmCoreModule} from '@agm/core';
import {GameService} from './services/game.service';
import { MapComponent } from './components/map/map.component';
import {environment} from '../environments/environment.prod.local';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    GameComponent,
    GameScoreComponent,
    GameMapComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModules,
    FlexLayoutModule,
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: environment.apiKey,
      libraries: ['geometry']
    })
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
