import { Component, OnInit } from '@angular/core';
import {WeatherService} from "../../services/weather.service";

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  public lang: string = "fr";
  public username: string = "TODO";
  public city: string = "Montcuq";
  public strToPrint: string = "Bienvenue, " + this.username + " voici la météo de " + this.city + " :";

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit(): void {
  }

  changeLang(lang): void {
    let src: string = this.lang;
    this.lang = lang;

    //TODO: Appel API
  }

  changeCity(city): void {
    switch (city){
      case "Montcuq":
        this.city = "";
        break;
      case "Belleville":
        this.city = "";
        break;
      case "Le Fion":
        this.city = "";
        break;
    }
  }

  updateStrToPrint(): void{
    this.strToPrint = "";
  }
}
