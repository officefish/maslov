import { Injectable } from '@nestjs/common'
import { AppConfigService } from '../../config/config.service'
import axios from 'axios'
import { FakeService } from './fake.service'

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

export interface IAlphaVintageCoreintageOptions
  extends IAlphaVintageMinOptions {
  interval?: '1min' | '5min' | '15min' | '30min' | '60min'
}

@Injectable()
export class AlphaVintageService {
  private readonly url = 'https://www.alphavantage.co/query?'
  constructor(
    private readonly env: AppConfigService,
    private readonly faker: FakeService,
  ) {}
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
  }: { options?: Partial<IAlphaVintageCoreintageOptions> } = {}) {
    const {
      symbol = 'IBM',
      adjusted = true,
      extended_hours = true,
      month = '2009-01',
      outputsize = 'compact',
      datatype = 'json',
    } = options

    const params = {
      function: 'TIME_SERIES_DAILY',
      apikey: this.apikey,
      symbol,
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

  async fakeDaily() {
    return { data: this.faker.fakeDaily() }
  }

  async weekly({
    options = {},
  }: { options?: Partial<IAlphaVintageCoreintageOptions> } = {}) {
    const {
      symbol = 'IBM',
      adjusted = true,
      extended_hours = true,
      month = '2009-01',
      outputsize = 'compact',
      datatype = 'json',
    } = options

    const params = {
      function: 'TIME_SERIES_WEEKLY',
      apikey: this.apikey,
      symbol,
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

  async fakeWeekly() {
    return { data: this.faker.fakeWeekly() }
  }

  async monthly({
    options = {},
  }: { options?: Partial<IAlphaVintageCoreintageOptions> } = {}) {
    const {
      symbol = 'IBM',
      adjusted = true,
      extended_hours = true,
      month = '2009-01',
      outputsize = 'compact',
      datatype = 'json',
    } = options

    const params = {
      function: 'TIME_SERIES_MONTHLY',
      apikey: this.apikey,
      symbol,
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

  async fakeMonthly() {
    return { data: this.faker.fakeMonthly() }
  }
}
