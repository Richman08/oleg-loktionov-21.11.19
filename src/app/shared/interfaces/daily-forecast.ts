export interface IDailyForecast {
  Date: string;
  Temperature: ITemperature;
  displayedDate: string;
}

export interface ITemperature {
  Maximum: {
    Value: string;
    Unit: string;
  };
}
