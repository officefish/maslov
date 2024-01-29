import { FC, useMemo } from 'react'
//import { ISeries, ISlot } from '@/client/models/exchange.types'
//import { AxisOptions, Chart } from 'react-charts'
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('react-charts').then((mod) => mod.Chart), {
  ssr: false,
})

import { UserSerie } from 'react-charts'

// const AxisOptions = dynamic(
//   () => import('react-charts').then((mod) => mod.options),
//   {
//     ssr: false,
//   })

interface IWidgetCharts {
  data: UserSerie<unknown>[]
}

const WidgetCharts: FC<IWidgetCharts> = (props) => {
  const { data } = props

  const primaryAxis = useMemo(
    () => ({
      getValue: (datum) => datum.primary || datum.date,
    }),
    [],
  )

  const secondaryAxes = useMemo(
    () => [
      {
        getValue: (datum) => datum.secondary,
      },
    ],
    [],
  )

  return (
    <div className="w-full h-36">
      <Chart
        options={{
          data,
          primaryAxis,
          secondaryAxes,
        }}
      />
    </div>
  )
}
export default WidgetCharts
