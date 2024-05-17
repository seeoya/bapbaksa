-- DB_BAPBAKSA
-- CREATE DATABASE DB_BAPBAKSA;
-- USE DB_BAPBAKSA;

DROP TABLE IF EXISTS TBL_USER;
CREATE TABLE TBL_USER (
    u_no             INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    u_id             VARCHAR(50) NOT NULL,
    u_pw             VARCHAR(200) NOT NULL,
    u_mail           VARCHAR(100) NOT NULL,
    u_phone          VARCHAR(50) NOT NULL,
    u_google_id      VARCHAR(100),
    u_kakao_id       VARCHAR(100),
    u_naver_id       VARCHAR(100),
    u_status         INT NOT NULL DEFAULT 1,
    u_zip_code       VARCHAR(50),
    u_first_address  VARCHAR(100),
    u_second_address VARCHAR(100),
    pi_name          VARCHAR(200) DEFAULT "",
    u_refresh_token  VARCHAR(500) DEFAULT NULL,
    u_reg_date       TIMESTAMP DEFAULT NOW(),
    u_mod_date       TIMESTAMP DEFAULT NOW()
);

DROP TABLE IF EXISTS TBL_USER_STATUS;
CREATE TABLE TBL_USER_STATUS (
    u_status INT NOT NULL DEFAULT 1,
    u_status_name VARCHAR(30) NOT NULL
);

INSERT INTO TBL_USER_STATUS VALUES(0, '탈퇴 회원');
INSERT INTO TBL_USER_STATUS VALUES(1, '정상 회원');
INSERT INTO TBL_USER_STATUS VALUES(2, '계정 정지 회원');
INSERT INTO TBL_USER_STATUS VALUES(999, '관리자');

DROP TABLE IF EXISTS TBL_USER_PROFILE_IMG;
CREATE TABLE TBL_USER_PROFILE_IMG (
    pi_no 		INT	NOT NULL AUTO_INCREMENT PRIMARY KEY,
    pi_name 	VARCHAR(200) NOT NULL,
    u_no 		INT NOT NULL,
    pi_reg_date	TIMESTAMP DEFAULT NOW()
);


DROP TABLE IF EXISTS TBL_FRIDGE;
CREATE TABLE TBL_FRIDGE (
    u_no		INT	NOT NULL,
    ig_no		INT	NOT NULL,
    f_reg_date	TIMESTAMP DEFAULT NOW()
);

DROP TABLE IF EXISTS TBL_LIKE_RECIPE;
CREATE TABLE TBL_LIKE_RECIPE (
    u_no		INT	NOT NULL PRIMARY KEY,
    r_no		INT	NOT NULL,
    lr_reg_date	TIMESTAMP DEFAULT NOW()
);


DROP TABLE IF EXISTS TBL_ORDER;
CREATE TABLE TBL_ORDER (
    o_no			    INT	NOT NULL AUTO_INCREMENT PRIMARY KEY,
    pm_no               INT,
    o_id			    VARCHAR(50)	NOT NULL,
    u_no			    INT	NOT NULL,
    o_s_no			    INT	NOT NULL DEFAULT 1,
    p_no		        INT	NOT NULL,
    o_count			    INT	NOT NULL,
    o_price			    INT	NOT NULL,
    o_final_price	    INT	NOT NULL,
    p_zip_code          VARCHAR(50),
    p_first_address     VARCHAR(100),
    p_second_address    VARCHAR(100),
    o_reg_date		    TIMESTAMP DEFAULT NOW(),
    o_mod_date		    TIMESTAMP DEFAULT NOW()
);


DROP TABLE IF EXISTS TBL_MARKET_CART;
CREATE TABLE TBL_MARKET_CART (
    mc_no			INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    u_no			INT	NOT NULL,
    i_no			INT	NOT NULL,
    mc_count		INT	DEFAULT 1,
    mc_reg_date		TIMESTAMP DEFAULT NOW(),
    mc_mod_date		TIMESTAMP DEFAULT NOW()
);

DROP TABLE IF EXISTS TBL_ORDER_STATUS;
CREATE TABLE TBL_ORDER_STATUS (
    o_s_no		INT	NOT NULL DEFAULT 1,
    o_s_name	VARCHAR(30)	NOT NULL
);

INSERT INTO TBL_ORDER_STATUS (o_s_no, o_s_name) VALUES(-1,'결제 대기 중');
INSERT INTO TBL_ORDER_STATUS (o_s_no, o_s_name) VALUES(0,'배송 준비 중');
INSERT INTO TBL_ORDER_STATUS (o_s_no, o_s_name) VALUES(1,'배송 중');
INSERT INTO TBL_ORDER_STATUS (o_s_no, o_s_name) VALUES(2,'환불 요청');
INSERT INTO TBL_ORDER_STATUS (o_s_no, o_s_name) VALUES(3,'환불 완료');
INSERT INTO TBL_ORDER_STATUS (o_s_no, o_s_name) VALUES(4,'구매 취소');
INSERT INTO TBL_ORDER_STATUS (o_s_no, o_s_name) VALUES(5,'구매 확정');
INSERT INTO TBL_ORDER_STATUS (o_s_no, o_s_name) VALUES(6,'배송 완료');

DROP TABLE IF EXISTS TBL_PUSH;
CREATE TABLE TBL_PUSH (
    p_no		INT	NOT NULL AUTO_INCREMENT PRIMARY KEY,
    u_no		INT	NOT NULL,
    p_c_no		INT	NOT NULL,
    p_title		VARCHAR(100) NOT NULL,
    p_content	VARCHAR(255) NOT NULL,
    p_status	BOOLEAN DEFAULT FALSE,
    p_reg_date	TIMESTAMP DEFAULT NOW()
);

DROP TABLE IF EXISTS TBL_PUSH_CATE;
CREATE TABLE TBL_PUSH_CATE (
    p_c_no		INT	NOT NULL,
    p_c_name	VARCHAR(30)	NOT NULL
);

DROP TABLE IF EXISTS TBL_PAYMENT;
CREATE TABLE TBL_PAYMENT (
    pm_no		INT	NOT NULL AUTO_INCREMENT PRIMARY KEY,
    o_no        INT	NOT NULL,
    u_no		INT	NOT NULL,
    pm_price	INT	NOT NULL,
    pm_method   VARCHAR(50),
    p_reg_date	TIMESTAMP DEFAULT NOW(),
    p_mod_date	TIMESTAMP DEFAULT NOW()
);

DROP TABLE IF EXISTS TBL_USER_QUESTIONS;
CREATE TABLE TBL_USER_QUESTIONS (
    ques_no             INT AUTO_INCREMENT PRIMARY KEY,
    u_id                VARCHAR(50) NOT NULL,
    o_id                INT,
    ques_title          VARCHAR(300) NOT NULL,
    ques_detail         VARCHAR(1200) NOT NULL,
    ques_answer         VARCHAR(1200),
    ques_write_date     TIMESTAMP DEFAULT NOW(),
    ques_state          INT DEFAULT 0,
    ques_answer_date    TIMESTAMP
)