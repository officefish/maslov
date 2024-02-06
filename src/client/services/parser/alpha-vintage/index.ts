// interface ISlot {
//   date: Date
//   open: number
//   close: number
//   high: number
//   low: number
//   volume: number
// }

//import { UserSerie } from 'react-charts'
import {
  IMetadata,
  ISerie,
  ISlot,
} from '@/client/models/exchange/alpha-vintage.types'

export interface ParserError {
  message: string
}

interface ParseResponse {
  metadata: IMetadata
  series: ISerie[]
  error: ParserError
}

function parseData(data: any): ParseResponse {
  if (data.statusCode === 403) {
    return { metadata: null, series: null, error: { message: data.message } }
  }
  const rawData = data.data
  //console.log(rawData)
  const keys = Object.keys(rawData)
  const metadataKey = keys[0]
  const serieKey = keys[1]

  const metadataSrc = rawData[metadataKey]
  const informationFirstWord = metadataSrc['1. Information'].match(
    /\b\w+\b/,
  )[0] satisfies string
  // Retrieving the value of the "Symbol" key
  const symbol = metadataSrc['2. Symbol']

  const metadata = {
    symbol,
    api_function: informationFirstWord.toUpperCase(),
  } satisfies IMetadata

  const seriesData = rawData[serieKey]
  const slots = Object.entries(seriesData).map(([date, values]) => ({
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

  return { metadata, series: [serie], error: null }
}

export function parser(data: any): ParseResponse {
  const { metadata, series, error } = parseData(data)
  //console.log(slots)
  return { metadata, series, error }
}

export function extractInterval(series: ISerie[]) {
  const firstDate = series[0]?.data[0]?.date

  let mostEarlyDate = firstDate
  let mostLateDate = firstDate

  const slots = series[0].data satisfies ISlot[]

  for (let i = 1; i < slots.length; i++) {
    const currentDate = slots[i].date

    console.log(currentDate)

    // Check for the most early date
    if (currentDate < mostEarlyDate) {
      mostEarlyDate = currentDate
    }

    // Check for the most late date
    if (currentDate > mostLateDate) {
      mostLateDate = currentDate
    }
  }
  return { mostEarlyDate, mostLateDate }
}
