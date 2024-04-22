'use client'

import Layout from "@/component/Layout/Layout";
import Image from "next/image"
import axios from 'axios'
import kakaoLoginImage from "@/public/assets/kakao_login_large_narrow.png"
import * as style from './index.css'
import SmallButton from "../../component/Button/SmallButton";

export default function LoginPage() {

  const handleLogin = async () => {
    console.log('로그인 시작!')
    try {
      const response = await axios.get('http://localhost:8080/auth/Oauth2/KakaoLogin')
      .then(response => {
        // 받은 을 DOM에 추가하여 렌더링
        // document.getElementById('kakao-login-container').inner = response.data;
        console.log(response.data)
        const api_key = "e0fa9c3226566a2dcda49e672fe892ac"
        let queryString = `${response.data.link}?response_type=code&client_id=${api_key}&redirect_uri=${response.data.redirect}`
        console.log(queryString)
        window.open(queryString, 'socialLoginPopup', 'width=500,height=600');

      });
    } catch (error) {
      console.error('Error initiating Kakao OAuth:', error);
    }
  };

  return (
    <div className={style.mainContainer}>
      <Image src={kakaoLoginImage} alt="Kakao Login" />
      <p className={style.questionText}>보유한 아이디가 없으신가요?</p>
      <div className={style.goJoin}>
        카카오톡으로 1초만에 <SmallButton onClick={handleLogin}>가입</SmallButton>하기!
      </div>
    </div>
  )
}
