import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { selectUser } from "../store/userSlice";

const Chart = () => {

    const [chartData, setChartData] = useState([]);
    const userSelector = useSelector(selectUser);

    useEffect(() => {
        setChartData(userSelector.data);
    }, [userSelector.data])

    const years = Array.from({ length: 12 }, (_, index) => 2000 + index);

    return (
        <div className="chart">
              {chartData &&
            <LineChart className="linechart" width={500} height={500} data={years.map((year, index) => ({ year, ...chartData.reduce((acc, curr) => ({ ...acc, [curr.category]: curr.values[index] }), {}) }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                {chartData.map(({ category }, index) => (
                    <Line key={index} type="monotone" dataKey={category} name={category} />
                ))}
            </LineChart>
        }
       
        </div>
    )
};

export default Chart;