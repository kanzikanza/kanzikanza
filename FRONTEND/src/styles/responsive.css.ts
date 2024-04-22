import { style, styleVariants } from '@vanilla-extract/css';

// 기본 스타일 정의
export const gridContainer = style({
  minWidth: '768px',
  margin: '0 auto',
  maxWidth: '100%',
  display: 'flex',
  alignItems: 'center',
});

// 미디어 쿼리에 따른 스타일 변형
export const responsiveGridContainer = styleVariants({
  columnLayout: {
    '@media': {
      '(max-width: 768px)': {
        flexDirection: 'column',
      },
    },
  },
});

// 조합된 스타일
export const combinedGridContainer = style([
  gridContainer,
  responsiveGridContainer.columnLayout,
]);
