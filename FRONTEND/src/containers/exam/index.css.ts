import { style, styleVariants } from '@vanilla-extract/css';
import { combinedGridContainer } from '@/src/styles/responsive.css';

// 기본 스타일 정의
export const gridContainer = style({
  minWidth: '768px',
  margin: '0 auto',
  maxWidth: '100%',
  display: 'flex',
  alignItems: 'center',
});

// 기본 스타일 정의
export const kanjiGrid = style({
  height: '500px',
  display: 'flex',
  margin: '0',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#3e3e3e',
});

export const inputGrid = style({
  height: '500px',
  display: 'flex',
  margin: '0',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  color: '#3e3e3e',
});

export const inputForm = style({
  height: '100px',
  display: 'flex',
  alignItems: 'center',
});

export const inputText = style({
  width: '500px',
});

// 반응형 스타일 적용
// export const responsiveKanjiGrid = style([
//   kanjiGrid,
//   combinedGridContainer,
// ]);

// export const responsiveInputGrid = style([
//   inputGrid,
//   combinedGridContainer,
// ]);
