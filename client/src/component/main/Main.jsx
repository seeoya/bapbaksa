import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import { Link } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/navigation';
import "swiper/css/pagination";

import { Autoplay, Pagination, A11y, Navigation } from 'swiper/modules';

const Main = () => {

    const [randomRecipe, setRandomRecipe] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        ramdomRecipe();
    }, []);

    const ramdomRecipe = async () => {
        await axios.get(process.env.REACT_APP_REST_SERVER_URL + "/recipe/random", {
            params: {
            }
        }).then((data) => {
            setRandomRecipe(data.data);
            setIsLoading(false);
        }).catch((error) => {
            return {type: "error", error}
            setIsLoading(false);
        });
    }

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
                    <h3>오늘의 추천 요리</h3>
                        <div className='today-recommend-swiper'>
                        {isLoading ? (
                            <div>Loading recipes...</div> // 로딩 중 메시지 또는 스피너
                        ) : (
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
                                className="my-swiper"
                            >
                                {randomRecipe.length > 0 ? (
                                    randomRecipe.map((recipe) => (
                                        <SwiperSlide key={recipe.RECP_CODE}>
                                            <div className='random-recipe-info'>
                                                <Link to={`/recipe/view/${recipe.RECP_CODE}`}>
                                                    <img src={recipe.RECP_MAIN_IMG} alt={recipe.RECP_NAME} />
                                                    <div className='random-recipe-detail'>
                                                        <h3>{recipe.RECP_NAME}</h3> {/* ${} 대신 {} */}
                                                        <p>{recipe.RECP_INTRO}</p>
                                                    </div>
                                                </Link>
                                            </div>
                                        </SwiperSlide>
                                    ))
                                ) : (
                                    <SwiperSlide>
                                        <p>No recipes found.</p>
                                    </SwiperSlide>
                                )}
                            </Swiper>
                        )}
                    </div>
                </div>
            </div>
            <div className='item'>
                <a href='/market' className='btn main'><FontAwesomeIcon className='icon' icon="fa-solid fa-store"/><div className='banner'>마켓으로 이동</div></a>
                <a href='/recipe/list' className='btn main'><FontAwesomeIcon className='icon' icon="fa-solid fa-bowl-rice"/><div className='banner'>레시피 보러가기</div></a>
            </div>
        </div>
    );
};

export default Main;