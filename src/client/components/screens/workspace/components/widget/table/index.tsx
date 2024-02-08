import { FC, useEffect, useState } from 'react'
//import { ISlot } from '@/client/models/exchange.types'
import { useWidgetStore } from '@/client/providers/widget-provider'
import { ISlide } from '@/client/models/exchange/alpha-vintage.types'
import { chunkSlots } from '@/client/services/parser/alpha-vintage'
import WidgetTableSlide from './slide'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

interface IWidgetTable {
  //data: UserSerie<unknown>[]
}

const WidgetTable: FC<IWidgetTable> = () => {
  const { intervalSeries } = useWidgetStore()

  //const [sliced, setSliced] = useState<ISlot[]>(null)
  const [slides, setSlides] = useState<ISlide[]>(null)

  useEffect(() => {
    if (!intervalSeries) return
    if (!intervalSeries[0]) return
    if (!intervalSeries[0].data) return
    //setSliced(intervalSeries[0].data.slice(0, 24))

    const slots = intervalSeries[0].data

    if (!slots) return

    const newSlides = chunkSlots(slots, 25)
    setSlides(newSlides)
  }, [intervalSeries])

  return (
    <div className="mt-4 w-full">
      <Swiper
        className="w-full h-full relative"
        pagination={{
          type: 'fraction',
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
      >
        {slides?.map((slide: ISlide, i) => (
          <SwiperSlide
            key={i}
            className="card w-full h-full items-center justify-center mb-12"
          >
            {/* Slide {i} */}
            <WidgetTableSlide data={slide} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
export default WidgetTable
