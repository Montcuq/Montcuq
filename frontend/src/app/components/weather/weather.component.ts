import {Component, OnInit} from '@angular/core';
import {WeatherService} from "../../services/weather.service";
import {PlayerService} from "../../services/player.service";

@Component({
    selector: 'app-weather',
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
    public lang: string = "fr";
    public username: string = this.getUsername();
    public welcome: string = "Bienvenue " + this.username + ", voici la météo de maintenant :";
    public city: string = "Montcuq";
    public pic: string;
    public temp: string;
    public loadingWelcome: boolean = false;
    public loadingWeather: boolean = false;

    constructor(private weatherService: WeatherService,
                private playerService: PlayerService) {
    }

    ngOnInit(): void {
        this.printWeather(this.city);
    }

    getUsername() {
        return this.playerService.pseudo;
    }

    changeLang(lang): void {
        this.loadingWelcome = true;
        const src: string = this.lang;
        this.lang = lang;
        this.weatherService.translate(this.welcome, src, this.lang)
            .then((translate: string) => {
                this.welcome = translate;
                this.loadingWelcome = false;
            });
    }

    changeCity(city): void {
        this.city = city;

        switch (city) {
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
            case "Froidcul":
                this.printWeather("Moyeuvre-Grande");
                break;
        }
    }

    printWeather(city) {
        this.loadingWeather = true;
        this.weatherService.getWeather(city)
            .then(weather => {
                // @ts-ignore
                this.pic = weather.pic;
                // @ts-ignore
                this.temp = weather.temp;
                this.loadingWeather = false;

            });
    }
}
