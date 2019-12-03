export interface IWeather {
  WeatherIcon: number;
  WeatherText: string;
  Temperature: ITemperature;
  LocalizedName: string;
}

export interface ITemperature {
  Metric: {
    Value: number,
    Unit: string,
  };
}


