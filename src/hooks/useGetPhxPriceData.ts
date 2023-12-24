import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useMulticallContract } from './useContract'
import ERC20_INTERFACE from '../constants/abis/erc20'

type ApiResponse = {
  prices: {
    [key: string]: string
  }
  update_at: string
}
const priceContracts: { novaAddress: string; phxAddress: string; lpAddress: string } = {
  novaAddress: '0x56E344bE9A7a7A1d27C854628483Efd67c11214F',
  phxAddress: '0x0F925153230C836761F294eA0d81Cef58E271Fb7',
  lpAddress: '0xe283b646891AF96b003DB63c272520fDa3b66057',
}

/**
 * Due to Cors the api was forked and a proxy was created
 * @see https://github.com/shibanovaswap/gatsby-pancake-api/commit/e811b67a43ccc41edd4a0fa1ee704b2f510aa0ba
 */
const api = 'https://api.shibanovaswap.com/api/v1/price'

const useGetPhxPriceData = () => {
  const [data, setData] = useState<number>(0)

  const multicallContract = useMulticallContract()

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (multicallContract) {
          const { novaAddress, phxAddress, lpAddress } = priceContracts
          const calls = [
            [novaAddress, ERC20_INTERFACE.encodeFunctionData('balanceOf', [lpAddress])],
            [phxAddress, ERC20_INTERFACE.encodeFunctionData('balanceOf', [lpAddress])],
          ]

          const [resultsBlockNumber, result] = await multicallContract.aggregate(calls)
          const [novaAmount, phxAmount] = result.map((r) => ERC20_INTERFACE.decodeFunctionResult('balanceOf', r))
          const nova = new BigNumber(novaAmount)
          const phx = new BigNumber(phxAmount)
          const novaPrice = nova.div(phx).toNumber()
          setData(novaPrice)
        }
      } catch (error) {
        console.error('Unable to fetch price data:', error)
      }
    }

    fetchData()
  }, [multicallContract])

  return data
}

export default useGetPhxPriceData
