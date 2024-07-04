import React, { useEffect, useState } from "react";
// import ReactDOM from "react-dom";
import { format } from "d3-format";
// import { timeFormat } from "d3-time-format";
import {
  ema,
  discontinuousTimeScaleProviderBuilder,
  Chart,
  ChartCanvas,
  SingleValueTooltip,
  lastVisibleItemBasedZoomAnchor,
  XAxis,
  YAxis,
  CrossHairCursor,
  MouseCoordinateX,
  MouseCoordinateY,
  MACDSeries,
  macd,
} from "react-financial-charts";
import { getData } from "./data";

const FinancialCharts = () => {
  const [initialData, setInitialData] = useState([]);
  useEffect(() => {
    const fetchFinancialData = async () => {
      try {
        const data = await getData();
        setInitialData(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchFinancialData();
  }, []);

  const ScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor(
    (d) => new Date(d.date)
  );
  const renderChart = () => {
    const height = 300;
    const width = 900;
    const margin = { left: 0, right: 48, top: 0, bottom: 24 };

    const ema12 = ema()
      .id(1)
      .options({ windowSize: 12 })
      .merge((d, c) => {
        d.ema12 = c;
      })
      .accessor((d) => d.ema12);

    const ema26 = ema()
      .id(2)
      .options({ windowSize: 26 })
      .merge((d, c) => {
        d.ema26 = c;
      })
      .accessor((d) => d.ema26);

    const elder = macd();
    elder(ema26(ema12(initialData)));

    const { data, xScale, xAccessor, displayXAccessor } =
      ScaleProvider(initialData);

    const pricesDisplayFormat = format(".2f");
    const max = xAccessor(data[data.length - 1]);
    const min = xAccessor(data[Math.max(0, data.length - 100)]);
    const xExtents = [min, max + 5];

    const elderRayHeight = 200;
    const elderRayOrigin = (_, h) => [0, h - elderRayHeight];

    // const dateTimeFormat = "%b %d %y";
    // const timeDisplayFormat = timeFormat(dateTimeFormat);
    const timeDisplayFormat = (index) =>{
      if (typeof(date) == "number"){
        return
      }
      const date_to_send =  new Date(data[index]?.date).toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: '2-digit'
    }).replace(/\//g, ' ')
    if (date_to_send){
      return date_to_send
    }
    };
    const openCloseColor = (data) => {
      return data.macd.divergence > 0 ? "#6063ff" : "#ef5350";
    };

    return (
      <ChartCanvas
        height={height}
        ratio={3}
        width={width}
        margin={margin}
        data={data}
        displayXAccessor={displayXAccessor}
        seriesName="Data"
        xScale={xScale}
        xAccessor={xAccessor}
        xExtents={xExtents}
        zoomAnchor={lastVisibleItemBasedZoomAnchor}
      >
        <Chart
          id={4}
          height={elderRayHeight}
          yExtents={[0, elder.accessor()]}
          origin={elderRayOrigin}
          padding={{ top: 8, bottom: 8 }}
        >
          <XAxis showGridLines orient="top" axisAt="top" gridLinesStrokeStyle="#e0e3eb" getMouseDelta={elder.accessor()} tickFormat={timeDisplayFormat}  />
          <YAxis ticks={4} tickFormat={pricesDisplayFormat} />

          <MouseCoordinateX displayFormat={timeDisplayFormat} />
          <MouseCoordinateY
            rectWidth={margin.right}
            displayFormat={pricesDisplayFormat}
          />

          <MACDSeries
            yAccessor={elder.accessor()}
            strokeStyle={{
              macd: "#ffffff00",
              signal: "#ffffff00",
              zero: "#e7e7e7e7",
            }}
            widthRatio={0.5}
            fillStyle={{ divergence: openCloseColor }}
            clip={true}
            zeroLineOpacity={0.5}
          />

          <SingleValueTooltip
            yAccessor={(data) => {
              if (data) {
                return {
                  divergence: data.divergence,
                  signal: data.signal,
                  macd: data.macd,
                };
              }
              return undefined;
            }}
            yLabel="MACD Histogram"
            yDisplayFormat={(d) =>
              `MACD(${pricesDisplayFormat(
                d.macd.macd
              )}), signal(${pricesDisplayFormat(
                d.macd.signal
              )}),divergence(${pricesDisplayFormat(d.macd.divergence)})`
            }
            origin={[8, 16]}
          />
        </Chart>
        <CrossHairCursor />
      </ChartCanvas>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {initialData.length ? renderChart() : <div>Loading...</div>}
    </div>
  );
};

export default FinancialCharts;
