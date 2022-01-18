import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Box, Button, Flex, Input, Text } from '@becoswap-libs/uikit'
import { useUserSlippageTolerance } from 'state/user/hooks'
import QuestionHelper from '../QuestionHelper'

const MAX_SLIPPAGE = 5000
const RISKY_SLIPPAGE_LOW = 50
const RISKY_SLIPPAGE_HIGH = 500

const Option = styled.div`
  padding: 0 2px;
`

const Options = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;

  ${Option}:first-child {
    padding-left: 0;
  }

  ${Option}:last-child {
    padding-right: 0;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
  }
`

const predefinedValues = [
  { label: '0.1%', value: 0.1 },
  { label: '2.1%', value: 2.1 },
  { label: '5%', value: 5 },
]

type SlippageToleranceSettingsModalProps = {
  translateString: (translationId: number, fallback: string) => string
}

const SlippageToleranceSettings = ({ translateString }: SlippageToleranceSettingsModalProps) => {
  const [userSlippageTolerance, setUserslippageTolerance] = useUserSlippageTolerance()
  const [value, setValue] = useState(userSlippageTolerance / 100)
  const [error, setError] = useState<string | null>(null)
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = evt.target
    setValue(parseFloat(inputValue))
  }

  // Updates local storage if value is valid
  useEffect(() => {
    try {
      const rawValue = value * 100
      if (!Number.isNaN(rawValue) && rawValue > 0 && rawValue < MAX_SLIPPAGE) {
        setUserslippageTolerance(rawValue)
        setError(null)
      } else {
        setError(translateString(1144, 'Enter a valid slippage percentage'))
      }
    } catch {
      setError(translateString(1144, 'Enter a valid slippage percentage'))
    }
  }, [value, setError, setUserslippageTolerance, translateString])

  // Notify user if slippage is risky
  useEffect(() => {
    if (userSlippageTolerance < RISKY_SLIPPAGE_LOW) {
      setError(translateString(1146, 'Your transaction may fail'))
    } else if (userSlippageTolerance > RISKY_SLIPPAGE_HIGH) {
      setError(translateString(1148, 'Your transaction may be frontrun'))
    }
  }, [userSlippageTolerance, setError, translateString])

  return (
    <Box >
      <Flex alignItems="center" mb="2px">
        <Text bold fontSize="12px">{translateString(88, 'Slippage tolerance')}</Text>
        <QuestionHelper
          text={translateString(
            186,
            'Your transaction will revert if the price changes unfavorably by more than this percentage.'
          )}
        />
      </Flex>
      <Options>
        <Flex alignItems="center">
          {predefinedValues.map(({ label, value: predefinedValue }) => {
            const handleClick = () => setValue(predefinedValue)

            return (
              <Option key={predefinedValue}>
                <Button variant={value === predefinedValue ? 'primary' : 'tertiary'} onClick={handleClick}>
                  {label}
                </Button>
              </Option>
            )
          })}
            <Option>
            <Input
              style={{width: 80}}
              type="number"
              scale="md"
              step={0.1}
              min={0.1}
              placeholder="5%"
              value={value}
              onChange={handleChange}
              // isWarning={error !== null}
            />
          </Option>
          <Option>
            <Text fontSize="18px">%</Text>
          </Option>
        </Flex>
        <Flex alignItems="center">
          {/* <Option>
            <Input
              style={{width: '15%'}}
              type="number"
              scale="lg"
              step={0.1}
              min={0.1}
              placeholder="5%"
              value={value}
              onChange={handleChange}
              // isWarning={error !== null}
            />
          </Option> */}
          {/* <Option>
            <Text fontSize="18px">%</Text>
          </Option> */}
        </Flex>
      </Options>
      {error && (
        <Text mt="1px" color="failure">
          {error}
        </Text>
      )}
    </Box>
  )
}

export default SlippageToleranceSettings
