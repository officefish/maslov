import { Injectable } from '@nestjs/common'
import { AppConfigService } from '../../config/config.service'
import axios from 'axios'

export interface IAlphaVintageOptions {
  symbol: string
  interval: string
  adjusted: boolean
  extended_hours: boolean
  month: string
  outputsize: 'compact' | 'full'
  datatype: 'json' | 'scv'
}

@Injectable()
export class AlphaVintageService {
  private readonly url = 'https://www.alphavantage.co/query?'
  constructor(private readonly env: AppConfigService) {}
  get apikey() {
    return this.env.getAlphaVintageApiKey()
  }

  async intraday({
    options = {},
  }: { options?: Partial<IAlphaVintageOptions> } = {}) {
    const {
      symbol = 'IBM',
      interval = '60min',
      adjusted = true,
      extended_hours = true,
      month = '2009-01',
      outputsize = 'compact',
      datatype = 'json',
    } = options

    const params = {
      function: 'TIME_SERIES_INTRADAY',
      apikey: this.apikey,
      symbol,
      interval,
      adjusted,
      extended_hours,
      month,
      outputsize,
      datatype,
    }

    return axios.get(this.url, {
      params,
      headers: {
        'User-Agent': 'request',
      },
    })
  }
}
