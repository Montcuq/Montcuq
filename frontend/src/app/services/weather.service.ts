import {Injectable} from '@angular/core';
import {serverAddress} from "../../environments/environment.prod";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class WeatherService {

    constructor(private http: HttpClient) { /* nothing */
    }

    translate(message: string, source: string, target: string) {
        return new Promise((resolve, reject) => {
            this.http.post(
                (serverAddress + '/api/service/translate'),
                {message: message, source: source, target: target})
                .subscribe(
                    (response) => {
                    console.log(response)
                        resolve(response);
                    },
                    (error) => {
                        reject(error);
                    }
                );
        });
    }

    getWeather(town: string) {
        return new Promise((resolve, reject) => {
            this.http.get(
                (serverAddress + '/api/service/weather/' + town))
                .subscribe(
                    (response) => {
                        const weather = {
                            pic: response.current.condition.icon,
                            temp: response.current.temp_c
                        }
                        resolve(weather);
                    },
                    (error) => {
                        reject(error);
                    }
                );
        });
    }

}
