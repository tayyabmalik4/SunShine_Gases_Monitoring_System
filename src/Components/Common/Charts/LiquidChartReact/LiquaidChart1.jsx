import React from 'react'
import LiquidChart from 'react-liquidchart';

export default function LiquaidChart1(props) {
  let valueliquid = props.valuech 
    return (
        <>
          <div
        style={{
          width: '12rem',
          height: '300px',
            color : 'red',
        }}
      >
          <LiquidChart
            responsive
            legend= {"Available Fuel: "+valueliquid + " Ltr"}
            value={(valueliquid/540)*100}
            showDecimal
            amplitude={4}
            frequency={2}
            animationTime={2000}
            animationWavesTime={2250}
            waveScaleLimit = {false}
            outerStyle = {{
                fill : 'rgba(105,105,105,0.7)'
            }}
            wetStyle = {{
                fill : 'white'
            }}
            liquidStyle = {{
                fill: 'rgba(255,69,0,0.8)'
              }}
            gradient={{
                type: 2,
                x1: 0,
                x2: 0,
                y1: 100,
                y2: 0,
                }}
            postfix="%"
            legendFontSize={0.1}
            // fontSizes = {[40,200]}
          />
      </div>
    </>
  )
}
