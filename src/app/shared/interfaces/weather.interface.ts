export interface IWeather {
  WeatherIcon: number;
  WeatherText: string;
  Temperature: ITemperature;
}

export interface ITemperature {
  Metric: {
    Value: number,
    Unit: string,
  };
}


