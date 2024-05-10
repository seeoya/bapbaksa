import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import 'swiper/css';
import 'swiper/css/navigation';
import "swiper/css/pagination";

import { Autoplay, Pagination, A11y, Navigation } from 'swiper/modules';

const Market = () => {
    return (
        <div className='recipe-grid'>
            <div className='swiper-container'>
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                    }}
                    pagination={{
                    clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, A11y, Navigation]}
                    className="mySwiper"
                >
                    <SwiperSlide>Slide 1</SwiperSlide>
                    <SwiperSlide>Slide 2</SwiperSlide>
                    <SwiperSlide>Slide 3</SwiperSlide>
                    <SwiperSlide>Slide 4</SwiperSlide>
                    <SwiperSlide>Slide 5</SwiperSlide>
                </Swiper>
            </div>
            <div className='item'>
                <div className='today-recommend'>
                    <h3>전월 대비 저렴한 재료</h3>
                    <div className='today-recommend-swiper'>
                        <Swiper
                            spaceBetween={30}
                            autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                            }}
                            centeredSlides={true}
                            pagination={{
                            clickable: true,
                            }}
                            modules={[Autoplay, Pagination]}
                            className="mySwiper"
                        >
                            <SwiperSlide>Slide 1</SwiperSlide>
                            <SwiperSlide>Slide 2</SwiperSlide>
                            <SwiperSlide>Slide 3</SwiperSlide>
                            <SwiperSlide>Slide 4</SwiperSlide>
                            <SwiperSlide>Slide 5</SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </div>
            <div className='item'>
                <div className='today-recommend'>
                    <h3>이런 재료는 어떠세요?</h3>
                        <div className='today-recommend-swiper'>
                        <Swiper
                            spaceBetween={30}
                            autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                            }}
                            centeredSlides={true}
                            pagination={{
                            clickable: true,
                            }}
                            modules={[Autoplay, Pagination]}
                            className="mySwiper"
                        >
                            <SwiperSlide>Slide 1</SwiperSlide>
                            <SwiperSlide>Slide 2</SwiperSlide>
                            <SwiperSlide>Slide 3</SwiperSlide>
                            <SwiperSlide>Slide 4</SwiperSlide>
                            <SwiperSlide>Slide 5</SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Market;