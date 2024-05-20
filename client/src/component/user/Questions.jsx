import axios from "axios";
import React, { useEffect, useState } from "react";
import { getToken } from "../../storage/loginedToken";
import { setTitle } from "../../util/setTitle";

axios.defaults.withCredentials = true;

const Questions = () => {

    const [uId, setUId] = useState('');
    const [quesTitle, setQuesTitle] = useState('');
    const [oId, setOId] = useState('');
    const [quesDetail, setQuesDetail] = useState('');

    const [loadQuest, setLoadQuest] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [loadQrderNo, setLoadQrderNo] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState(false);

    const [isQuestionNo, setIsQuestionNo] = useState('');

    useEffect(() => {
        const loginedUId = getToken('loginedUId');
        setUId(loginedUId);
        setTitle('1:1 문의');
    }, []);

    useEffect(() => {
        if (uId) {
            getOrderNo();
            loadMyQuestion();
        }
    }, [uId]);

    const questionChangeHandler = (e) => {
        console.log('questionChangeHandler()');

        let input_name = e.target.name;
        let input_value = e.target.value;

        if (input_name === 'ques_title') {
            setQuesTitle(input_value);
        } else if (input_name === 'o_id') {
            setOId(input_value);
        } else if (input_name === 'ques_detail') {
            setQuesDetail(input_value);
        }
    }

    const questionClickBtnHandler = async () => {
        console.log('questionClickBtnHandler()');
        let form = document.question_form;
        if (quesTitle === '') {
            alert('문의 제목을 입력해 주세요');
            form.ques_title.focus();
        } else if (quesDetail === '') {
            alert('문의 내용을 입력해 주세요');
            form.ques_detail.focus();
        } else {
            let data = {
                "u_id": uId,
                "o_id": oId,
                "ques_title": quesTitle,
                "ques_detail": quesDetail,
            }
            await axios({
                url: process.env.REACT_APP_SERVER_URL + "/api/user/regiest_question",
                method: 'post',
                data: data,
            }).then(res => {
                if (res.data && Number(parseInt(res.data.affectedRows)) > 0) {
                    alert('문의 등록에 성공하였습니다.');
                    loadMyQuestion();
                }
            }).catch(error => {
                alert('문의 등록에 실패하였습니다.');
            }).finally(data => {
                console.log('AXIOS QUESTION_REGIST COMMUNICATION FINALLY');
            });
            setQuesTitle(''); setOId(''); setQuesDetail('');
        }
    }

    const getOrderNo = async () => {
        let data = {
            "u_id": uId,
        }
        await axios({
            url: process.env.REACT_APP_SERVER_URL + "/api/user/order_no",
            method: 'post',
            data: data,
        }).then((data) => {
            setLoadQrderNo(data.data);
            setIsLoading(false);
        }).catch((error) => {
            return { type: "error", error }
        })
    }

    const loadMyQuestion = async () => {
        let data = {
            "u_id": uId,
        }
        await axios({
            url: process.env.REACT_APP_SERVER_URL + "/api/user/load_question",
            method: 'post',
            data: data,
        }).then((data) => {
            setLoadQuest(data.data);
            setIsLoading(false);
        }).catch((error) => {
            return { type: "error", error }
        })
    }

    const titleClickHandler = (question) => {
        setIsModalOpen(true);
        if (selectedQuestion && selectedQuestion.ques_no === question.ques_no) {
            setIsQuestionNo(question.ques_no);
            setSelectedQuestion(null);
        } else {
            setSelectedQuestion(question);
        }
    }

    const deleteQuestion = async (question) => {
        let data = {
            "u_id": uId,
            "ques_no": question.ques_no,
        }
        console.log("deleteQuestion data : ", data);
        await axios({
            url: process.env.REACT_APP_SERVER_URL + "/api/user/delete_question",
            method: 'delete',
            data: data,
        }).then((data) => { 
            setLoadQuest(data.data);
            setIsLoading(false);
        }).catch((error) => {
            return { type: "error", error }
        })
    }

    return (
        <div className="content-wrap">

            <div className="question-wrap">
                <h2 className="title">1:1 문의</h2>
                <form name="question_form" className="qusetion-form" method="post">
                    <div className="question-input-wrap">
                        <input type="text" name="ques_title" value={quesTitle} onChange={(e) => { questionChangeHandler(e) }} placeholder="제목을 입력해주세요" />
                        <select name="o_id" value={oId} onChange={(e) => questionChangeHandler(e)}>
                            <option>주문번호 선택</option> {/* DB에서 값을 받은 뒤 map 돌려서 사용 */}
                            {loadQrderNo.length > 0 ? (loadQrderNo.map((order) => (
                                <option key={order.O_ID} value={order.O_ID}>{order.O_ID}</option>
                            ))) : (<option>주문 목록이 없습니다.</option>)}
                        </select>
                        <textarea name="ques_detail" value={quesDetail} onChange={(e) => { questionChangeHandler(e) }} placeholder="문의 내용을 입력해주세요" ></textarea>
                        <button type="button" onClick={questionClickBtnHandler} className="btn">문의 작성</button>
                    </div>
                </form>

                <div className="question-answer">
                    <div className="question-answer-title">{/* flex로 적용 */}
                        <h2>1:1 문의 내역</h2>
                        <p className="user-name">{uId}님</p>
                    </div>
                    <div className="question-answer-form">
                        {/* flex로 적용 */}
                        <div className="question-answer-form-title">
                            <div>제목</div>
                            <div>작성일</div>
                            <div>답변상태</div>
                            <div>삭제</div>
                        </div>
                        {loadQuest.length > 0 ? (
                            loadQuest.map((question) => (
                                <div key={question.ques_no}>
                                    <div className="question-answer-form-detail">
                                        <div onClick={() => titleClickHandler(question)} style={{ cursor: 'pointer' }}>
                                            {question.ques_title}
                                        </div>
                                        <div>{question.ques_write_date}</div>
                                        <div>{question.ques_state === 0 ? '답변 안됨' : '답변 완료'}</div>
                                        <div><button onClick={() => deleteQuestion(question)}>삭제</button></div>
                                    </div>
                                    {selectedQuestion === question && (
                                        <div className="modal-wrap">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    {selectedQuestion.ques_answer ? (<p className="question-reply-date">
                                                        답변일 : {selectedQuestion.ques_answer_date}
                                                    </p>) : ""}
                                                </div>
                                                <div className="modal-detail">
                                                    <p><span>Q : </span>{selectedQuestion.ques_detail}</p>
                                                    {selectedQuestion.ques_answer ? (
                                                        <p><span>A : </span>{selectedQuestion.ques_answer}</p>
                                                    ) : (
                                                        <p><span>A : </span>아직 답변이 없습니다.</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="no-questions">
                                작성된 문의 내용이 없습니다.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Questions;