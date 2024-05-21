import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { setTitle } from '../../util/setTitle';
import Loading from '../include/Loading';

const AdminUserQuestions = () => {

    const [loadQuest, setLoadQuest] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadQuestion();
        setTitle('고객 문의 LIST');
    }, []);

    const loadQuestion = async () => {
        await axios({
            url: process.env.REACT_APP_SERVER_URL + "/admin/get_all_question",
            method: 'get',
        }).then((data) => {
            setLoadQuest(data.data);
        }).catch((error) => {
            return { type: "error", error }
        }).finally(( )=>{
            setIsLoading(false);
        })
    }

    return (
        <>
            {isLoading ? <Loading /> : null}
            <div className='admin-question-wrap'>
                <h2>고객 문의 LIST</h2>
                <div className='admin-question-header'>
                    <div>고객 ID</div>
                    <div>제목</div>
                    <div>작성일</div>
                    <div>답변 상태</div>
                    <div>답변 완료일</div>
                    <div>답변 등록</div>
                </div>
                {
                    loadQuest.length > 0 
                    ? (Object.keys(loadQuest).map((el) => (
                        <div key={loadQuest[el].ques_no} className='admin-question-detail'>
                            <div>{loadQuest[el].u_id}</div>
                            <div>{loadQuest[el].ques_title}</div>
                            <div>{loadQuest[el].ques_write_date}</div>
                            <div>{loadQuest[el].ques_state === 0 ? '답변 안됨' : '답변 완료'}</div>
                            <div>{loadQuest[el].ques_answer ? (<p className="question-reply-date">
                                                            {loadQuest[el].ques_answer_date}
                                                        </p>) : ""}</div>
                            <div>
                                {loadQuest[el].ques_state === 0 
                                ? <Link to={"/admin/user/question/" + loadQuest[el].ques_no}><button type='button'>답변 작성</button></Link> 
                                : <Link to={"/admin/user/question/" + loadQuest[el].ques_no}><button type='button'>답변 수정</button></Link>}
                            </div>
                        </div>
                    )))
                    : <div>작성된 문의가 없습니다.</div>
                }
            </div>
        </>
    );
};

export default AdminUserQuestions;