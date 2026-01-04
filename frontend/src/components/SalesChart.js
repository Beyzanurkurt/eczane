import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Artık veriyi 'data' prop'u olarak alıyor
const SalesChart = ({ data }) => {
  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3 bg-white">
        <h6 className="m-0 font-weight-bold text-primary">📈 Haftalık Satış Grafiği (Canlı)</h6>
      </div>
      <div className="card-body">
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSatis" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4e73df" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#4e73df" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip formatter={(value) => `${value} ₺`} />
              <Area type="monotone" dataKey="satis" stroke="#4e73df" fillOpacity={1} fill="url(#colorSatis)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SalesChart;