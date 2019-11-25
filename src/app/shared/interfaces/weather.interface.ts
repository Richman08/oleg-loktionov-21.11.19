export interface IWeather {
  WeatherIcon: number;
  Temperature: ITemperature;
}

export interface ITemperature {
  Metric: {
    Value: number,
    Unit: string,
  };
}


