import { Component, OnInit } from '@angular/core';
import {WeatherService} from "../../services/weather.service";

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  public lang: string = "fr";
  public username: string = this.getUsername();
  public city: string = "Montcuq";
  public strToPrint: string = "Bienvenue, " + this.username + " voici la météo de " + this.city + " :";

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit(): void {
    this.printWeather(this.city);
  }

  getUsername(){
    return "TODO";
  }

  changeLang(lang): void {
    let src: string = this.lang;
    this.lang = lang;

    this.strToPrint = this.strToPrint; //TODO: Appel API
  }

  changeCity(city): void {
    this.city = city;
    this.strToPrint = "Bienvenue, " + this.username + " voici la météo de " + this.city + " :";
    let currentLang = this.lang;
    this.lang = "fr";
    this.changeLang(currentLang);

    switch (city){
      case "Montcuq":
        this.printWeather("Montcuq");
        break;
      case "Anus":
        this.printWeather("Fouronnes");
        break;
      case "Le Fion":
        this.printWeather("Chevenoz");
        break;
      case "Duranus":
        this.printWeather("Duranus");
        break;
      case "Froiscul":
        this.printWeather("Moyeuvre-Grande");
        break;
      }
  }

  printWeather(city){
    //Appel API
  }
}
