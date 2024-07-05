import { useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { U } from "./math/f";

export default function App() {
  const [d, setD] = useState(0.7);
  const [h, setH] = useState(2);
  const [p0, setP0] = useState(0);
  const [p1, setP1] = useState(0);
  const [p2, setP2] = useState(0);

  const data = [];
  for (let i = 0; i <= 90; i += 0.1) {
    data.push({
      x: i,
      y: U(i, h, d, p0, p1, p2),
    });
  }

  return (
    <div
      style={{
        padding: "10px",
      }}
    >
      <div>d</div>
      <input type="range" min={0} max={2} step={0.1} value={d} onChange={(e) => setD(+e.target.value)} />
      <span>{d}</span>

      <div>h</div>
      <input type="range" min={0} max={5} step={0.1} value={h} onChange={(e) => setH(+e.target.value)} />
      <span>{h}</span>

      <div>p0</div>
      <input type="range" min={-1} max={1} step={0.01} value={p0} onChange={(e) => setP0(+e.target.value)} />
      <span>{p0}</span>

      <div>p1</div>
      <input type="range" min={-1} max={1} step={0.01} value={p1} onChange={(e) => setP1(+e.target.value)} />
      <span>{p1}</span>

      <div>p2</div>
      <input type="range" min={-1} max={1} step={0.01} value={p2} onChange={(e) => setP2(+e.target.value)} />
      <span>{p2}</span>

      <LineChart width={500} height={300} data={data}>
        <XAxis dataKey="x" />
        <YAxis />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line type="monotone" dataKey="y" stroke="#8884d8" dot={false} />
      </LineChart>
    </div>
  );
}
