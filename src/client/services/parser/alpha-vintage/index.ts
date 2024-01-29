// interface ISlot {
//   date: Date
//   open: number
//   close: number
//   high: number
//   low: number
//   volume: number
// }

import { UserSerie } from 'react-charts'

function parseDailyData(rawData: any): UserSerie<unknown>[] {
  //console.log(rawData)
  const serieKey = Object.keys(rawData)[1]

  //console.log(serieKey)
  //console.log(rawData[serieKey])

  const data = rawData[serieKey]

  //console.log(data)

  const slots = Object.entries(data).map(([date, values]) => ({
    date: new Date(date),
    open: parseFloat(values['1. open']),
    high: parseFloat(values['2. high']),
    low: parseFloat(values['3. low']),
    close: parseFloat(values['4. close']),
    volume: parseFloat(values['5. volume']),
  })) //satisfies ISlot[]

  //console.log(slots)

  const serie = {
    label: serieKey,
    data: slots,
  }

  //return []

  return [serie]
}

export function parser(
  api_function: string,
  rawData: any,
): UserSerie<unknown>[] {
  const slots = parseDailyData(rawData)
  //console.log(slots)

  return slots
}
