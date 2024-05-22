import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import "swiper/css/pagination";

import { A11y, Autoplay, Navigation, Pagination } from 'swiper/modules';
import { setTitle } from '../../util/setTitle';
import Loading from '../include/Loading';

const Main = () => {

    const [randomRecipe, setRandomRecipe] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        randomRecipeAxios();
        setTitle("레시피 홈");
    }, []);

    const randomRecipeAxios = async () => {
        await axios.get(process.env.REACT_APP_REST_SERVER_URL + "/recipe/random", {
            params: {
            }
        }).then((data) => {
            setRandomRecipe(data.data);
            setIsLoading(false);
        }).catch((error) => {
            return { type: "error", error }
            setIsLoading(false);
        });
    }

    const banner_img = [
        '/imgs/banner/recipe/grandopen.png',
        '/imgs/banner/recipe/bapbaksaEvent.png',
        '/imgs/banner/recipe/bapdoduk.png',
    ];

    return (
        <>
            {isLoading ? <Loading /> : null}
            <div className='recipe-grid'>
                <div className='swiper-container'>
                    <Swiper
                        spaceBetween={30}
                        centeredSlides={true}
                        loop={true}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        navigation={true}
                        modules={[Autoplay, Pagination, A11y, Navigation]}
                        className="my-swiper"
                    >
                        <div className='banner'>
                            <SwiperSlide>
                                <img src='/imgs/banner/recipe/main.png' draggable="false" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src='/imgs/banner/recipe/bapbaksaEvent.png' draggable="false" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src='/imgs/banner/recipe/bapdoduk.png' draggable="false" />
                            </SwiperSlide>
                        </div>
                    </Swiper>
                </div>
                <div className='recommend-container'>
                    <div className='today-recommend'>
                        <h2>오늘의 추천 요리</h2>
                        <div className='line'></div>
                        <div className='today-recommend-swiper'>
                            <Swiper
                                spaceBetween={40}
                                autoplay={{
                                    delay: 4000,
                                    disableOnInteraction: false,
                                }}
                                centeredSlides={true}
                                loop={true}
                                modules={[Autoplay]}
                                className="my-swiper"
                            >
                                {randomRecipe && randomRecipe.length > 0 ? (
                                    randomRecipe.map((recipe) => (
                                        <SwiperSlide key={recipe.RECP_CODE}>
                                            <div className='random-recipe-info'>
                                                <Link to={`/recipe/view/${recipe.RECP_CODE}`}>
                                                    <img src={recipe.RECP_MAIN_IMG} alt={recipe.RECP_NAME} draggable="false" />
                                                    <div className='random-recipe-detail'>
                                                        <h3>{recipe.RECP_NAME}</h3>
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
                        </div>
                    </div>
                </div>
                <div className='menu-wrap'>
                    <div className='menu'>
                        <h2>네비게이션</h2>
                        <div className='line'></div>
                        <div className='nav-link'>
                            <Link to={'/recipe/list'} className='btn main'><FontAwesomeIcon className='icon' icon="fa-solid fa-bowl-rice" /><div className='banner'>레시피 보러가기</div></Link>
                            <Link to={'/market'} className='btn highlight'><FontAwesomeIcon className='icon' icon="fa-solid fa-store" /><div className='banner'>마켓으로 이동</div></Link>
                            <a href='https://www.youtube.com/@paik_jongwon' target="_blank" rel="noopener noreferrer" className='btn sub'><FontAwesomeIcon className='icon' icon="fa-brands fa-youtube" /><div className='banner'>백종원 유튜브</div></a>
                            <a href='https://www.youtube.com/@1mincook' target="_blank" rel="noopener noreferrer" className='btn sub'><FontAwesomeIcon className='icon' icon="fa-brands fa-youtube" /><div className='banner'>1분요리 유튜브</div></a>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default Main;