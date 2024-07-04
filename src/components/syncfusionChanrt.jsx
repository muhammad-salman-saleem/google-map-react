import * as React from "react";
import { Browser } from '@syncfusion/ej2-base';
import { ChartComponent, SeriesCollectionDirective, AxesDirective, AxisDirective, SeriesDirective, Inject, Category, Tooltip, DateTime, Logarithmic, Crosshair, StripLine, MacdIndicator, ColumnSeries, IndicatorsDirective, IndicatorDirective } from '@syncfusion/ej2-react-charts';
import { chartData } from "./datasource";

function syncfusionChanrt() {
    const primaryxAxis = { valueType: 'DateTime', intervalType: 'Months', majorGridLines: { width: 0 }, crosshairTooltip: { enable: true } };
    const animation = { enable: true };
    const chartarea = { border: { width: 0 } };
    const crosshair = { enable: true, lineType: 'Vertical' };
    const tooltip = { enable: true, shared: true };
    const lines = { width: 0 };
    return (
      <div style={{}}>
    <ChartComponent id='charts' primaryXAxis={primaryxAxis}  tooltip={tooltip} crosshair={crosshair} chartArea={chartarea} width={Browser.isDevice ? '100%' : '80%'} title='AAPL 2012-2017'>
      <Inject services={[ Category, Tooltip, StripLine, DateTime, Logarithmic, Crosshair, MacdIndicator,  ColumnSeries]}/>
      <AxesDirective>
        <AxisDirective opposedPosition={true} rowIndex={0} name='secondary' majorGridLines={lines} lineStyle={lines} minimum={-4.0} maximum={4.0} interval={1} majorTickLines={lines} title='MACD'>
        </AxisDirective>
      </AxesDirective>
      <SeriesCollectionDirective>
        <SeriesDirective dataSource={chartData} width={2} xName='x' yName='y' low='low' high='high' close='close' volume='volume' open='open' name='Apple Inc' bearFillColor='#2ecd71' bullFillColor='#e74c3d' type='Candle' animation={animation}>
        </SeriesDirective>
      </SeriesCollectionDirective>
      <IndicatorsDirective>
        <IndicatorDirective type='Macd' period={3} fastPeriod={8} slowPeriod={5} seriesName='Apple Inc' macdType='Both' width={2} macdPositiveColor='#6063ff' macdNegativeColor='#e74c3d' fill='#6063ff' yAxisName='secondary'>
        </IndicatorDirective>
      </IndicatorsDirective>
    </ChartComponent>
    </div>
    );
};
export default syncfusionChanrt;
