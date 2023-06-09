import React, {useCallback} from "react";
import { LineChart, Line, XAxis, YAxis,Tooltip, Legend} from "recharts";
import FileSaver from "file-saver";
import { useCurrentPng } from "recharts-to-png";
import round from "../Utils/DecimalHandler";
import { YearlyChangeTotKpiAndRestProps } from "../../Interfaces/IYearlyChangeTotKpiAndRest";
  
interface Props {
    data: YearlyChangeTotKpiAndRestProps[],
    yAxisDomain: number[]
  }

  const customLabel = (props: any) => {
    const {
       x, y, value
      } = props;
      const customValue = round(value, 1).toFixed(1);
      return(
      <text x={x} y={y} dy={-5} fontSize='10' textAnchor='middle'>
        {customValue}
      </text>
      )
  };
  
const ChartKpiYearlyChangeTotAndRest: React.FC<Props> = ({data, yAxisDomain}) => 
{
  const [getPng, { ref, isLoading }] = useCurrentPng();

  const handleDownload = useCallback(async () => {
    const png = await getPng();

    if (png) {
      FileSaver.saveAs(png, 'KPI restaurang och totalt årstakt.png');
    }
  }, [getPng]);
  
  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <div>
          <LineChart width={800} height={500} data={data} ref={ref}
            margin={{ top: 100, right: 40, left: 50, bottom: 50 }}>
              <text x={20} y={20} 
              style={{fontSize: 24, fontWeight: 'bold', fill: '#595959'}}>
                Försäljningsprisutveckling på restaurang enligt KPI, och KPI totalt
              </text>
              <text x={20} y={45} 
              style={{fontSize: 24, fontWeight: 'bold', fill: '#595959'}}>
                Senaste 25 månaderna
              </text>
              <text x={20} y={70} 
              style={{fontSize: 18, fill: '#595959'}}>
                Procentuell förändring jämfört med motsvarande månad föregående år
              </text>
              <text x={20} y={95}
              style={{fontSize: 16, fontStyle:'italic', fill: '#595959'}}>
                Källa: KPI/SCB
              </text>
            <XAxis dataKey="month" interval={0} angle={-45} textAnchor="end" 
            tickMargin={20}/>
            <YAxis hide domain={yAxisDomain}/>
            <Tooltip />
            <Line dot={false} isAnimationActive={false} name="KPI totalt" type="monotone" dataKey="indexKPI" stroke="#479A96" label={customLabel} />
            <Line dot={false} isAnimationActive={false} name="Restaurang" type="monotone" dataKey="indexRest" stroke="#AEBD15" label={customLabel} />
            <Legend verticalAlign="top" height={36}/>
          </LineChart>
        <br/>
        <button onClick={handleDownload}>
          {isLoading ? 'Laddar ner...' : 'Exportera'}
        </button>
      </div>
    </div>
    );
};

export default ChartKpiYearlyChangeTotAndRest;