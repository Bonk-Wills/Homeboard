import { useState, useEffect } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
  gap: 0px;
  color: ${({ theme }) => theme.type === 'dark' ? '#C1C2C5' : '#000000'};
`

const TextField = styled.div`
  align-self: self-end;
  font-size: 16px;
  margin-left: 5px;
  color: #868e96;
`

const FirstNumber = styled.div`
  font-size: 24px;
  font-weight: bold;
`

const SecondNumber = styled.div`
  align-self: self-end;
  font-size: 18px;
  color: #868e96;
`

const TimeContainer = styled.div`
  display: flex;
`

const DisplayAgeCountdown = ({ settings }) => {
  const [pastYears, setPastYears] = useState(0)
  const [remainingYear, setRemainingYear] = useState(0)
  let remainingDaysInParts = new Date(settings.birthdate) && ((new Date().getTime() - new Date(settings.birthdate).getTime()) / 86400000).toFixed(6).toString().split(".")
  let remainingSeconds = new Date(settings.birthdate) && Math.trunc((new Date().getTime() - new Date(settings.birthdate).getTime()) / 1000).toString()

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentDate = new Date()
      const nextBirthdate = new Date(settings.birthdate)
      nextBirthdate.setFullYear(currentDate.getFullYear())
      if (nextBirthdate < currentDate) {
        nextBirthdate.setFullYear(nextBirthdate.getFullYear() + 1)
      }

      let timeYear = currentDate.getFullYear() - new Date(settings.birthdate).getFullYear()
      let timeMonth = currentDate.getMonth() - new Date(settings.birthdate).getMonth()
      let timeDay = currentDate.getDate() - new Date(settings.birthdate).getDate()
      if (timeMonth < 0 || (timeMonth === 0 && timeDay < 0)) { timeYear = timeYear - 1 }

      setPastYears(timeYear)
      const timeRemaining = nextBirthdate - currentDate;
      const _ = (1 - (timeRemaining / (365 * 24 * 60 * 60 * 1000))).toFixed(8)
      setRemainingYear(_.toString().slice(2, 10))
    }, 1000)
    return () => clearInterval(intervalId)
  }, [settings.birthdate])

  return (
    <>
      {(settings.displayOnly === 'all' || settings.displayOnly === 'years') && (
        <TimeContainer>
          <FirstNumber>{pastYears}</FirstNumber>
          <SecondNumber>{remainingYear}</SecondNumber>
          {settings.displayUnits && <TextField>years</TextField>}
        </TimeContainer>
      )}
      {(settings.displayOnly === 'all' || settings.displayOnly === 'days') && (
        <TimeContainer>
          <FirstNumber>{remainingDaysInParts[0]}</FirstNumber>
          <SecondNumber>{remainingDaysInParts[1]}</SecondNumber>
          {settings.displayUnits && <TextField>days</TextField>}
        </TimeContainer>
      )}
      {(settings.displayOnly === 'all' || settings.displayOnly === 'secondes') && (
        <TimeContainer>
          <FirstNumber>{remainingSeconds.slice(0, remainingSeconds.length - 1)}</FirstNumber>
          <SecondNumber>{remainingSeconds.slice(remainingSeconds.length - 1, remainingSeconds.length)}</SecondNumber>
          {settings.displayUnits && <TextField>secondes</TextField>}
        </TimeContainer>
      )}
    </>
  )
}

const AgeCountdown = ({ settings, theme }) => {
    return (
      <Container theme={theme}>
        {settings && settings.birthdate ? (
          <DisplayAgeCountdown settings={settings}/>
        ) : (
          <>🎂 Birthday required</>
        )}
      </Container>
    )
}

export default AgeCountdown
