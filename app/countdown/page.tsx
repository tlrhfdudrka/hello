'use client';

import React, { useState, useEffect } from 'react';
import styles from './countDown.module.css';

const CountDown = () => {
  // const [years] = useState<number[]>([2024]); // 연도는 2024년으로 고정
  const [monthsDays, setMonthsDays] = useState<string[]>([]);
  const [hours] = useState<number[]>(
    Array.from({ length: 12 }, (_, i) => i + 1),
  );
  const [minutes] = useState<number[]>(Array.from({ length: 60 }, (_, i) => i));
  const [amPm] = useState<string[]>(['AM', 'PM']);

  const [selectedYear] = useState<number>(2024);
  const [selectedMonthDay, setSelectedMonthDay] = useState<string>(
    `${new Date().getMonth() + 1}-${new Date().getDate()}`,
  );
  const [selectedHour, setSelectedHour] = useState<number>(
    new Date().getHours() % 12 || 12,
  );
  const [selectedMinute, setSelectedMinute] = useState<number>(
    new Date().getMinutes(),
  );
  const [selectedAmPm, setSelectedAmPm] = useState<string>(
    new Date().getHours() >= 12 ? 'PM' : 'AM',
  );

  const [countdown, setCountdown] = useState<string | null>(null); // 카운트다운 시간
  const [isCountdownActive, setIsCountdownActive] = useState<boolean>(false); // 카운트다운 활성화 상태

  useEffect(() => {
    // 월과 일을 조합하여 월일 옵션 생성
    const monthsDaysOptions: string[] = [];
    for (let month = 1; month <= 12; month++) {
      const daysInMonth = new Date(selectedYear, month, 0).getDate();
      for (let day = 1; day <= daysInMonth; day++) {
        monthsDaysOptions.push(`${month}-${day}`);
      }
    }
    setMonthsDays(monthsDaysOptions);
  }, [selectedYear]);

  // 날짜 포맷팅 함수
  const formatMonthDay = (monthDay: string) => {
    const [month, day] = monthDay.split('-').map((num) => parseInt(num, 10));
    return `${month}월 ${day}일`;
  };

  const handleStartCountdown = () => {
    // 선택된 날짜와 시간으로 타임스탬프 생성
    const [month, day] = selectedMonthDay
      .split('-')
      .map((num) => parseInt(num, 10));
    const hour24 =
      selectedAmPm === 'PM' ? (selectedHour % 12) + 12 : selectedHour % 12;
    const endDate = new Date(
      selectedYear,
      month - 1,
      day,
      hour24,
      selectedMinute,
    );

    // 카운트다운 활성화
    setIsCountdownActive(true);

    // 카운트다운 업데이트 함수
    const updateCountdown = () => {
      const now = new Date();
      const remainingTime = endDate.getTime() - now.getTime();
      if (remainingTime <= 0) {
        setCountdown('시간이 종료되었습니다');
        setIsCountdownActive(false);
        return;
      }

      const hours = Math.floor(
        (remainingTime % (1000 * 3600 * 24)) / (1000 * 3600),
      );
      const minutes = Math.floor((remainingTime % (1000 * 3600)) / (1000 * 60));
      const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

      setCountdown(`${hours}시간 ${minutes}분 ${seconds}초`);
    };

    // 1초마다 카운트다운 업데이트
    const intervalId = setInterval(() => {
      updateCountdown();
    }, 1000);

    // 컴포넌트 언마운트 시 interval 클리어
    return () => clearInterval(intervalId);
  };

  return (
    <div className={styles.container}>
      {/* <select
        id="year"
        value={selectedYear}
        onChange={(e) => console.log(`Selected year: ${e.target.value}`)} // 연도 선택은 고정되어 있으므로 변경하지 않음
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select> */}
      <div className={styles.timerWrap}>
        <div className={styles.Timer}>카운트다운 설정</div>
        <div className={styles.Option}>
          <select
            id="monthDay"
            value={selectedMonthDay}
            onChange={(e) => setSelectedMonthDay(e.target.value)}
            className={styles.selectElement}
          >
            {monthsDays.map((monthDay) => (
              <option key={monthDay} value={monthDay}>
                {formatMonthDay(monthDay)}
              </option>
            ))}
          </select>

          <select
            id="amPm"
            value={selectedAmPm}
            onChange={(e) => setSelectedAmPm(e.target.value)}
            className={styles.selectElement}
          >
            {amPm.map((period) => (
              <option key={period} value={period}>
                {period}
              </option>
            ))}
          </select>

          <select
            id="hour"
            value={selectedHour}
            onChange={(e) => setSelectedHour(parseInt(e.target.value))}
            className={styles.selectElement}
          >
            {hours.map((hour) => (
              <option key={hour} value={hour}>
                {hour.toString().padStart(2, '0')}
              </option>
            ))}
          </select>

          <select
            id="minute"
            value={selectedMinute}
            onChange={(e) => setSelectedMinute(parseInt(e.target.value))}
            className={styles.selectElement}
          >
            {minutes.map((minute) => (
              <option key={minute} value={minute}>
                {minute.toString().padStart(2, '0')}
              </option>
            ))}
          </select>
          <button
            className={styles.Button}
            onClick={handleStartCountdown}
            disabled={isCountdownActive}
          >
            start
          </button>
        </div>

        <div className={styles.countDown}>
          <p>
            {selectedYear}년 {formatMonthDay(selectedMonthDay)}{' '}
            {selectedHour.toString().padStart(2, '0')}:
            {selectedMinute.toString().padStart(2, '0')} {selectedAmPm}
          </p>
          <p>{countdown}</p>
        </div>
      </div>
    </div>
  );
};

export default CountDown;
