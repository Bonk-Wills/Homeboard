import { useState, useEffect } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: grid;
  text-align: center;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`

const TextField = styled.div`
  align-self: self-end;
  font-size: 16px;
  margin-left: 5px;
  color: #3b444b;
`

const FirstNumber = styled.div`
  font-size: 24px;
  font-weight: bold;
`

const SecondNumber = styled.div`
  align-self: self-end;
  font-size: 18px;
  color: #3b444b;
`

const TimeContainer = styled.div`
  display: flex;
`

const TimeCountdownShow = ({ birthdate }) => {
  const [pastYears, setPastYears] = useState(0)
  const [remainingYear, setRemainingYear] = useState(0)
  let remainingDaysInParts = birthdate && ((new Date().getTime() - birthdate.getTime()) / 86400000).toFixed(6).toString().split(".")
  let remainingSeconds = birthdate && Math.trunc((new Date().getTime() - birthdate.getTime()) / 1000).toString()

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentDate = new Date()
      const nextBirthdate = new Date(birthdate)
      nextBirthdate.setFullYear(currentDate.getFullYear())
      if (nextBirthdate < currentDate) {
        nextBirthdate.setFullYear(nextBirthdate.getFullYear() + 1)
      }


      let timeYear = currentDate.getFullYear() - birthdate.getFullYear()
      let timeMonth = currentDate.getMonth() - birthdate.getMonth()
      let timeDay = currentDate.getDate() - birthdate.getDate()
      if (timeMonth < 0 || (timeMonth === 0 && timeDay < 0)) { timeYear = timeYear - 1 }

      setPastYears(timeYear)
      const timeRemaining = nextBirthdate - currentDate;
      const _ = (1 - (timeRemaining / (365 * 24 * 60 * 60 * 1000))).toFixed(8)
      setRemainingYear(_.toString().slice(2, 10))
    }, 1000)
    return () => clearInterval(intervalId)
  }, [birthdate])

  return (
    <>
      <TimeContainer>
        <FirstNumber>{pastYears}</FirstNumber>
        <SecondNumber>{remainingYear}</SecondNumber>
        <TextField>years</TextField>
      </TimeContainer>
      <TimeContainer>
        <FirstNumber>{remainingDaysInParts[0]}</FirstNumber>
        <SecondNumber>{remainingDaysInParts[1]}</SecondNumber>
        <TextField>days</TextField>
      </TimeContainer>
      <TimeContainer>
        <FirstNumber>{remainingSeconds.slice(0, remainingSeconds.length - 1)}</FirstNumber>
        <SecondNumber>{remainingSeconds.slice(remainingSeconds.length - 1, remainingSeconds.length)}</SecondNumber>
        <TextField>secondes</TextField>
      </TimeContainer>
    </>
  )
}

const TimeCountdown = () => {
  const [birthdate, setBirthdate] = useState(window.localStorage.getItem('bd'))

    return (
      <Container>
        {!birthdate ? (
          <input type="date" onChange={e => {
            if (new Date(e.target.value).getFullYear().toString().length === 4) {
              window.localStorage.setItem('bd', e.target.value)
              setBirthdate(window.localStorage.getItem('bd'))
            }
          }}/>)
          :
          <TimeCountdownShow birthdate={new Date(birthdate)} />
        }
      </Container>
    )
}

export default TimeCountdown
