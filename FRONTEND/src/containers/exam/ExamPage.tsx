'use client'

import { useRef, useEffect, useState } from "react";
import { Button, Grid, Typography, TextField, InputAdornment } from '@mui/material/';
import { Edit } from '@mui/icons-material';
import CongratulationModal from '@/src/component/Modal/CongratulationModal';
import axios from 'axios';
import * as style from './index.css'

type kanzas = {
  kanzas: string;
  mean: string;
  sound: string;
}

function ExamPage() {
  const [kanzas, setKanzas] = useState<kanzas[]>([]);
  const [index, setIndex] = useState<number>(0);
  const [inputValue, setInputValue] = useState("");
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [isInputValid, setIsInputValid] = useState<boolean>(true);

  const [totalQuestions, setTotalQuestions] = useState<number>(10);
  const [progress, setProgress] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const QuestionType = useRef<number>(0);
  const [showCongratulationModal, setShowCongratulationModal] = useState<boolean>(false);

  const handleCorrectAnswers = () => {
    setShowCongratulationModal(true);
  };

  const handleCloseCongratulationModal = () => {
    setShowCongratulationModal(false);
    window.location.reload();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!inputValue.trim()) {
      setIsInputValid(false);
      return;
    }

    setIsInputValid(true);

    if (!QuestionType.current) {
      if (inputValue === kanzas[index].mean) {
        setIndex((prev) => prev + 1);
      }
    } else {
      if (inputValue === kanzas[index].sound) {
        setIndex((prev) => prev + 1);
      }
    }
    QuestionType.current = getRandomInt(0, 2);
    setInputValue("");

    setCount(count + 1);
  };

  useEffect(() => {
    setProgress((count / totalQuestions) * 100);
  }, [count, totalQuestions]);

  useEffect(() => {
    if (index >= totalQuestions) {
      setProgress(100);
      setIsEnd(true);

      if (count === totalQuestions) {
        setShowCongratulationModal(true);
      }
    }
  }, [index, totalQuestions, count]);

  function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/kanzi/problem');
        setKanzas(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {isEnd ? (
        <div>
          <CongratulationModal open={showCongratulationModal} onClose={handleCloseCongratulationModal} />
        </div>
      ) : (
        <Grid container className={style.combinedGridContainer}>

          <Grid className={style.kanziGrid} item xs={5}>
            {kanzas.length > 0 ? (
              <Typography variant='h1' style={{ fontSize: '20rem' }}>{kanzas[index].kanza}</Typography>
            ) : null}
          </Grid>

          <Grid className={style.inputGrid} item xs={5}>
            <Typography variant='h4'>다음 한자의 {QuestionType.current ? '뜻' : '음'}을 적으시오</Typography>
            <br /><br />
            <Typography variant='h3'>{progress}%</Typography>

            <form className={style.inputForm} onSubmit={handleSubmit}>
              <TextField 
                className={style.inputText}
                id="message"
                placeholder="입력창"
                multiline
                color="warning"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  setIsInputValid(true);
                }}
                onKeyDown={handleKeyDown}
                error={!isInputValid}
                helperText={!isInputValid ? "입력값이 필요합니다." : ""}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Edit />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        type="submit"
                        color="warning"
                      >
                        제출
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
            </form>
          </Grid>
        </Grid>
      )}
    </div>
  );
}

export default ExamPage;
