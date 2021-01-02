import React, { Fragment, useEffect, useState } from 'react'
import Chart from 'react-google-charts'
import { GET_TRANSACTIONS } from '../queries/transaction-queries'
import { useQuery } from '@apollo/react-hooks'
import { css } from '@emotion/core'

export function Home () {
  const { data } = useQuery(GET_TRANSACTIONS)
  const [lineChartData, setLineChartData] = useState([])
  const [pieChartData, setPieChartData] = useState([])

  useEffect(() => {
    if (data && data.transactions) {
      createHistogramData(data.transactions)
      createPieChartData(data.transactions)
    }
  }, [data])

  function createHistogramData (dataToConvert) {
    let newData = [['Date', 'Amount Spent']]
    let tempData = {}
    for (let index = 0; index < dataToConvert.length; index++) {
      const item = dataToConvert[index]
      const dateAdded = new Date(Date.parse(item.insertedAt))
      const month = dateAdded.getUTCMonth() + 1
      const day = dateAdded.getUTCDate()
      const year = dateAdded.getUTCFullYear()
      const formattedDate = year + '/' + month + '/' + day
      if (tempData.hasOwnProperty(formattedDate)) {
        // Substract credits from the spent amount per day
        tempData[formattedDate] += tempData[formattedDate] + item.credit ? -item.amount : item.amount
      } else {
        tempData[formattedDate] = item.credit ? -item.amount : item.amount
      }
    }
    for (const property of Object.keys(tempData)) {
      newData.push([property, tempData[property]])
    }
    setLineChartData(newData)
  }

  function createPieChartData (dataToConvert) {
    let newData = [['Category', 'Amount Spent']]
    let tempData = {}
    for (let index = 0; index < dataToConvert.length; index++) {
      const item = dataToConvert[index]
      const category = item.category
      if (tempData.hasOwnProperty(category)) {
        // Pie charts only support positive numbers, since it's spent per category, we ignore credit
        tempData[category] += tempData[category] + item.credit ? 0 : item.amount
      } else {
        tempData[category] = item.credit ? 0 : item.amount
      }
    }
    for (const property of Object.keys(tempData)) {
      newData.push([property, tempData[property]])
    }
    setPieChartData(newData)
  }

  return (
    <Fragment>
      <h1>Welcome to the Dashboard</h1>
      <div css={chartWrapper}>
        <Chart
          chartType='LineChart'
          data={lineChartData}
          height={'300px'}
          loader={<div>Loading Chart</div>}
          options={{
            title: 'Amount Spent per Day',
            legend: { position: 'bottom' }
          }}
          width={'600px'}
        />
        <Chart
          chartType='PieChart'
          data={pieChartData}
          height={'300px'}
          loader={<div>Loading Chart</div>}
          options={{
            title: 'Amount Spent per Category',
            legend: { position: 'bottom' }
          }}
          width={'600px'}
        />
      </div>
    </Fragment>
  )
}

const chartWrapper = css` 
  display: flex;
`
