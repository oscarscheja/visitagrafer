import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts";
import round from "../Utils/DecimalHandler";
import FileSaver from "file-saver";
import { useCallback } from "react";
import { useCurrentPng } from "recharts-to-png";
import { MonthlyKpiChangeProps } from "../../Interfaces/IMonthlyKpiChange";

const customLabel = (props: any) => {
    const {
       x, y, value
      } = props;
        const customValue = round(value, 1).toFixed(1);
        return(
        <text x={x} y={y} dy={-10} textAnchor='top'>
          {customValue}
        </text>
        )
  };

  interface Props {
    data: MonthlyKpiChangeProps[],
    yAxisDomain: number[]
  }

const ChartKpiMonthlyChange: React.FC<Props> = ({data, yAxisDomain}) => {
    const [getPng, { ref, isLoading }] = useCurrentPng();

    const handleDownload = useCallback(async () => {
      const png = await getPng();
      if (png) {
        FileSaver.saveAs(png, 'KPI restaurang månadstakt.png');
      }
    }, [getPng]);
    
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div>
              <BarChart width={800} height={500} data={data} ref={ref}
                margin={{ top: 100, right: 40, left: 40, bottom: 50 }}>
                  <text x={20} y={20} 
                  style={{fontSize: 24, fontWeight: 'bold', fill: '#595959'}}>
                    Restaurangprisernas utveckling, månadstakt
                  </text>
                  <text x={20} y={45} 
                  style={{fontSize: 18, fill: '#595959'}}>
                    Procentuell förändring jämfört med föregående månad
                  </text>
                  <text x={20} y={70} 
                  style={{fontSize: 16, fontStyle:'italic', fill: '#595959'}}>
                    Källa: KPI/SCB
                  </text>
                <XAxis dataKey="month" interval={0} angle={-45} textAnchor="end" 
                tickMargin={10}/>
                <YAxis hide domain={yAxisDomain} />
                <Tooltip />
                <Bar isAnimationActive={false} dataKey="index" fill="#AEBD15" label={customLabel}/>
              </BarChart>
            <br/>
            <button onClick={handleDownload}>
              {isLoading ? 'Laddar ner...' : 'Exportera'}
            </button>
          </div>
        </div>
      );
}

export default ChartKpiMonthlyChange;