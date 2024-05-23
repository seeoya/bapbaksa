import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { setTitle } from '../../util/setTitle';
import Loading from '../include/Loading';

const AdminUserQuestions = () => {

    const { no } = useParams();

    const [uId, setUId] = useState('');
    const [quesTitle, setQuesTitle] = useState('');
    const [oId, setOId] = useState('');
    const [quesDetail, setQuesDetail] = useState('');
    const [quesAnswer, setQuesAnswer] = useState('');

    const [isLoading, setIsLoading] = useState(true);

    const [loadQuest, setLoadQuest] = useState([]);

    useEffect(() => {
        initQuestion();
        setTitle('1:1 문의 답변');
    }, [no]);

    const initQuestion = async () => {
        await axios.get(process.env.REACT_APP_SERVER_URL + "/admin/get_question", {
            params: {
                ques_no: no
            }
        }).then((data) => {
            let question = data.data[0];

            setLoadQuest(data.data);
            setUId(question.u_id);
            setQuesTitle(question.ques_title);
            setOId(question.o_id);
            setQuesDetail(question.ques_detail);
            setQuesAnswer(question.ques_answer);
        }).catch((err) => {
            return { type: "error" };
        }).finally(() => {
            setIsLoading(false);
        })
    }

    const questionClickBtnHandler = async () => {
        if (quesAnswer === '') {
            alert('문의 답변을 입력해 주세요');
            document.getElementById("ques_answer").focus();
        } else {
            await axios.put(process.env.REACT_APP_SERVER_URL + `/admin/answer_question`, {
                params: {
                    ques_answer: quesAnswer,
                    ques_no: no
                }
            }).then(res => {
                if (res.data && Number(parseInt(res.data.affectedRows)) > 0) {
                    alert('답변 등록에 성공하였습니다.');
                    initQuestion();
                }
            })
                .catch(error => {
                    alert('답변 등록에 실패하였습니다.');
                })
        }
    }

    const questionAnswerChangeHandler = (e) => {
        let input_name = e.target.name;
        let input_value = e.target.value;

        if (input_name === "ques_answer") {
            setQuesAnswer(input_value);
        }
    }

    return (
        <>
            {isLoading ? <Loading /> : null}
            <div className='admin-question-answer-wrap'>
                <h2>1:1 고객 문의 답변</h2>
                <div className="question-answer-wrap, form">
                    <h3>고객 ID</h3>
                    <input type="text" name="u_id" defaultValue={uId} readOnly disabled />
                    <h3>문의 제목</h3>
                    <input type="text" name="ques_title" defaultValue={quesTitle} readOnly disabled />
                    <h3>문의 내용</h3>
                    <textarea type='text' className='ques_detail' name="ques_detail" defaultValue={quesDetail} readOnly disabled></textarea>
                    <h3>판매 번호</h3>
                    <input type="text" name="o_id" defaultValue={oId} readOnly disabled />
                    <h3>문의 답변</h3>
                    <textarea name="ques_answer" id='ques_answer' defaultValue={quesAnswer} onChange={(e) => questionAnswerChangeHandler(e)} placeholder="문의 답변을 입력해주세요" ></textarea>
                    <Link to={"/admin/user/question/"}>
                        <button type="button" onClick={questionClickBtnHandler} className="btn main">답변 작성</button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default AdminUserQuestions;