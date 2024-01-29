import { Injectable } from '@nestjs/common'
import { AppConfigService } from '../../config/config.service'
import axios from 'axios'
import { IBM_DAILY } from './ibm.daily'

export interface IAlphaVintageMinOptions {
  symbol: string
  adjusted?: boolean
  extended_hours?: boolean
  month?: string
  outputsize?: 'compact' | 'full'
  datatype?: 'json' | 'scv'
}

export interface IAlphaVintageOptions extends IAlphaVintageMinOptions {
  interval: '1min' | '5min' | '15min' | '30min' | '60min'
}

@Injectable()
export class AlphaVintageService {
  private readonly url = 'https://www.alphavantage.co/query?'
  private readonly getFakeDaily = () => IBM_DAILY
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

  async daily({
    options = {},
  }: { options?: Partial<IAlphaVintageMinOptions> } = {}) {
    const {
      symbol = 'IBM',
      adjusted = true,
      extended_hours = true,
      month = '2009-01',
      outputsize = 'compact',
      datatype = 'json',
    } = options

    return { data: this.getFakeDaily()} 

    // const params = {
    //   function: 'TIME_SERIES_INTRADAY',
    //   apikey: this.apikey,
    //   symbol,
    //   adjusted,
    //   extended_hours,
    //   month,
    //   outputsize,
    //   datatype,
    // }

    // return axios.get(this.url, {
    //   params,
    //   headers: {
    //     'User-Agent': 'request',
    //   },
    // })
  }
}
