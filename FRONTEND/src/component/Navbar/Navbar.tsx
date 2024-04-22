import React from 'react';
import * as style from './navbar.css.ts';

export default function Navbar() {
  return (
    <nav className={style.navbar}>
      <div className={style.leftMenu}>
        <a href="/" className={style.menuLink}>홈</a>
        <a href="/exam" className={style.menuLink}>시험 보기</a>
      </div>
      <div className={style.rightMenu}>
        <a href="/login" className={style.menuLink}>로그인</a>
      </div>
    </nav>
  );
}
