interface ISlot {
  date: Date
  open: number
  close: number
  high: number
  low: number
  volume: number
}

export function parseData(api_function: string, rawData: any): ISlot[] {
  const timeSeriesData = rawData['Time Series (Daily)']

  const slots = Object.entries(timeSeriesData).map(([date, values]) => ({
    date: new Date(date),
    open: parseFloat(values['1. open']),
    high: parseFloat(values['2. high']),
    low: parseFloat(values['3. low']),
    close: parseFloat(values['4. close']),
    volume: parseFloat(values['5. volume']),
  })) satisfies ISlot[]

  //console.log(slots)

  return slots
}
