import Layout from "@/layout/layout";
import { useState } from "react";
import * as XLSX from "xlsx";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import { Toast } from 'primereact/toast';
import axios from 'axios';

export default function MainPage() {
const [data, setData] = useState([]);
const [maxMovement, setMaxMovement] = useState(null);
const [minMovement, setMinMovement] = useState(null);
const [percentiles, setPercentiles] = useState({});
const [error, setError] = useState("");

const calculatePercentiles = (values, percentiles) => {
    const sorted = [...values].sort((a, b) => a - b);
    const result = {};
    percentiles.forEach((p) => {
    const index = Math.ceil((p / 100) * sorted.length) - 1;
    result[p] = sorted[index];
    });
    return result;
};

const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: "array" });

    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const json = XLSX.utils.sheet_to_json(worksheet);
    if (json.length === 0) {
        setError("El archivo está vacío o no tiene datos válidos.");
        return;
    }

    setError("");
    setData(json);

    const amounts = json.map((row) => parseFloat(row.Monto)).filter(Boolean);

    const max = Math.max(...amounts);
    const min = Math.min(...amounts);
    const calculatedPercentiles = calculatePercentiles(amounts, [25, 50, 75]);

    setMaxMovement(max);
    setMinMovement(min);
    setPercentiles(calculatedPercentiles);
    };

    reader.readAsArrayBuffer(file);
};

return (
    <Layout title="Modificar Perfil" description="Modificar perfil del usuario">
        <div className="container mt-5">
    <h1 className="text-center">Análisis de Movimientos</h1>

    <div className="mb-4">
        <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
    </div>

    {error && <p className="text-danger">{error}</p>}

    {data.length > 0 && (
        <>
        <h2>Resultados</h2>
        <p>
            <strong>Movimiento mayor:</strong> {maxMovement}
        </p>
        <p>
            <strong>Movimiento menor:</strong> {minMovement}
        </p>
        <p>
            <strong>Percentiles:</strong>
        </p>
        <ul>
            {Object.keys(percentiles).map((p) => (
            <li key={p}>
                Percentil {p}: {percentiles[p]}
            </li>
            ))}
        </ul>

        <h3>Tabla de Movimientos</h3>
        <Table striped bordered hover>
            <thead>
            <tr>
                {Object.keys(data[0]).map((key) => (
                <th key={key}>{key}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {data.map((row, index) => (
                <tr key={index}>
                {Object.values(row).map((value, i) => (
                    <td key={i}>{value}</td>
                ))}
                </tr>
            ))}
            </tbody>
        </Table>

        <h3>Gráficos Comparativos</h3>
        <div className="d-flex justify-content-around">
            {/* Gráfico de Monto Mayor vs Monto Menor */}
            <div className="mb-4" style={{ flex: 1, marginRight: "20px" }}>
            <BarChart width={450} height={300} data={[
                { name: "Monto Mayor", valor: maxMovement || 0 },
                { name: "Monto Menor", valor: minMovement || 0 }
            ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="valor" fill="#ff7300" />
            </BarChart>
            </div>

            {/* Gráfico de Percentiles */}
            <div className="mb-4" style={{ flex: 1 }}>
            <BarChart width={450} height={300} data={[
                { name: 'Percentil 25', valor: percentiles[25] || 0 },
                { name: 'Percentil 50 (Mediana)', valor: percentiles[50] || 0 },
                { name: 'Percentil 75', valor: percentiles[75] || 0 }
            ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="valor" fill="#82ca9d" />
            </BarChart>
            </div>
        </div>

        <h3>Gráficos de todos los Movimientos</h3>
        <div className="d-flex justify-content-around">
            {/* Gráfico de Montos Barra */}
            <div className="mb-4" style={{ flex: 1, marginRight: "20px" }}>
            <BarChart width={500} height={300} data={data.map((row, index) => ({ name: `Movimiento ${index + 1}`, Monto: parseFloat(row.Monto) || 0 }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Monto" fill="#8884d8" />
            </BarChart>
            </div>

            {/* Gráfico de Montos Lineal */}
            <div className="mb-4" style={{ flex: 1 }}>
            <LineChart width={500} height={300} data={data.map((row, index) => ({ name: `Movimiento ${index + 1}`, Monto: parseFloat(row.Monto) || 0 }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Monto" stroke="#8884d8" />
            </LineChart>
            </div>
        </div>
        </>
    )}
    </div>
    </Layout>
);
}
