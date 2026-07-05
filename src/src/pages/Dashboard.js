import React, { useEffect, useState } from "react";
import { apiGet } from "../api";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    apiGet("/api/dashboard").then(res => {
      setData(res);
    });
  }, []);

  if (!data) return <div className="loading">Loading dashboard...</div>;

  return (
    <div className="dashboard">
      <h1>Sentinel‑Black Dashboard</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
