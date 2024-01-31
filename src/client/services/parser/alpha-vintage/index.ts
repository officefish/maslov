// interface ISlot {
//   date: Date
//   open: number
//   close: number
//   high: number
//   low: number
//   volume: number
// }

import { UserSerie } from 'react-charts'
import { Metadata } from '@/client/models/exchange/alpha-vintage.types'

interface ParseResponse {
  metadata: Metadata
  slots: UserSerie<unknown>[]
}

function parseData(rawData: any): ParseResponse {
  console.log(rawData)
  const keys = Object.keys(rawData)
  const metadataKey = keys[0]
  const serieKey = keys[1]

  const metadataSrc = rawData[metadataKey]  
  const informationFirstWord = metadataSrc["1. Information"].match(/\b\w+\b/)[0] satisfies string
  // Retrieving the value of the "Symbol" key
  const symbol = metadataSrc["2. Symbol"]

  const metadata = {
    symbol,
    api_function: informationFirstWord.toUpperCase()
  } satisfies Metadata

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

  return { metadata, slots: [serie] }
}

export function parser(rawData: any): ParseResponse {
  const { metadata, slots } = parseData(rawData)
  //console.log(slots)
  return { metadata, slots }
}
