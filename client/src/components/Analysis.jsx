import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';
import "../css files/analysis.css";
import NavBar from './NavBar';
const Analysis = () => {
    const [paymentData, setPaymentData] = useState(null);
    const [loading, setLoading] = useState(true);
    const chartRef = useRef(null);

    

    const fetchTransactions = async () => {
        try {
            const response = await fetch('http://localhost:3000/account/transactions', {
                method: 'GET',
                headers: {
                    "auth-token": localStorage.getItem('jsonwebtoken')
                }
            });
            const data = await response.json();
            setPaymentData(data);
            setLoading(false); // Set loading to false after data is fetched
        } catch (error) {
            console.error('Error fetching transaction data:', error);
            setLoading(false); // Set loading to false on error
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []); // Fetch transactions only on component mount

    useEffect(() => {
        if (paymentData) {
            renderChart();
        }
    }, [paymentData]);

    const renderChart = () => {
        const categories = ['food', 'travel', 'clothes', 'medicines'];
        const categoryTotals = calculateCategoryTotals(paymentData, categories);

        const ctx = chartRef.current.getContext('2d');

        // Cleanup previous chart instance if it exists
        if (chartRef.current.chartInstance) {
            chartRef.current.chartInstance.destroy();
        }

        chartRef.current.chartInstance = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: categories,
                datasets: [{
                    label: 'Payments by Category',
                    data: categories.map(category => categoryTotals[category]),
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    };

    const calculateCategoryTotals = (data, categories) => {
        const categoryTotals = {};

        // Initialize category totals
        categories.forEach(category => {
            categoryTotals[category] = 0;
        });

        // Calculate category totals
        if (data) {
            data.forEach(payment => {
                categoryTotals[payment.category] += payment.amount;
            });
        }

        return categoryTotals;
    };

    return (
        <>
        <div className="analysis-navbar">
            < NavBar/>
        </div>
        <div className="analysis-main-section">

                <h2>Payments by Category</h2>
            <div className="chart-container" style={{position: "absolute"}}>
                {loading ? (
                    <p>Loading...</p>
                    ) : (
                        <canvas  ref={chartRef} ></canvas>
                        )}
            </div>
        </div>
        </>
    );
};

export default Analysis;
