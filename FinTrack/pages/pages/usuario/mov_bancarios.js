import Layout from "@/layout/layout";
import { useState, useMemo } from "react";
import ExcelJS from "exceljs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { useTable } from "react-table";
import { Toast } from 'primereact/toast';
import axios from 'axios';

const movBancarios = () => {
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

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        try {
            const workbook = new ExcelJS.Workbook();
            await workbook.xlsx.load(file);

            const worksheet = workbook.worksheets[0]; // Usa la primera hoja
            const json = [];

            worksheet.eachRow((row, rowNumber) => {
                if (rowNumber === 1) return; // Salta la fila de encabezado
                const rowData = {};

                row.eachCell((cell, colNumber) => {
                    const header = worksheet.getRow(1).getCell(colNumber).value; // Obtiene el encabezado
                    let cellValue = cell.value;

                    // Verifica si la celda es una fecha
                    if (cellValue instanceof Date) {
                        // Convierte la fecha a un formato legible
                        cellValue = cellValue.toLocaleDateString(); // Puedes usar el formato que prefieras
                    }

                    rowData[header] = cellValue; // Asigna el valor de la celda al objeto usando el encabezado
                });
                json.push(rowData);
            });

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
        } catch (e) {
            setError("Hubo un error al procesar el archivo.");
            console.error(e);
        }
    };

    const columns = useMemo(
        () =>
            data.length > 0
                ? Object.keys(data[0]).map((key) => ({
                      Header: key,
                      accessor: key,
                  }))
                : [],
        [data]
    );

    const tableInstance = useTable({ columns, data });

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

    return (
        <Layout title="Movimientos Bancarios" description="Movimientos Bancarios">
         <div className="grid">
        <div className="col-12">
          <div className="card">
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
                        <table {...getTableProps()} className="table table-striped">
                            <thead>
                                {headerGroups.map((headerGroup) => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map((column) => (
                                            <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody {...getTableBodyProps()}>
                                {rows.map((row) => {
                                    prepareRow(row);
                                    return (
                                        <tr {...row.getRowProps()}>
                                            {row.cells.map((cell) => (
                                                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                            ))}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        <h3>Gráficos Comparativos</h3>
                        <div className="d-flex justify-content-around">
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
                    </>
                )}
            </div>
            </div>
            </div>
            </div>
            
        </Layout>
    );
}


export default movBancarios;