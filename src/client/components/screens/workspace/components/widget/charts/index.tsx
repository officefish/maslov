import { FC, useMemo } from 'react'
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('react-charts').then((mod) => mod.Chart), {
  ssr: false,
})

import { useWidgetStore } from '@/client/providers/widget-provider'
interface IWidgetCharts {
  //data: UserSerie<unknown>[]
}

const WidgetCharts: FC<IWidgetCharts> = () => {
  const { intervalSeries } = useWidgetStore()
  const primaryAxis = useMemo(
    () => ({
      getValue: (datum) => datum.primary ?? datum.date,
    }),
    [],
  )

  const secondaryAxes = useMemo(
    () => [
      {
        getValue: (datum) => datum.secondary ?? datum.close,
      },
    ],
    [],
  )

  return (
    <div className="w-full h-96">
      <Chart
        options={{
          data: intervalSeries,
          primaryAxis,
          secondaryAxes,
        }}
      />
    </div>
  )
}
export default WidgetCharts
