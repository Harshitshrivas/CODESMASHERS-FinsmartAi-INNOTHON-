
        // Initialize Performance Chart
        const performanceCtx = document.getElementById('performanceChart').getContext('2d');
        new Chart(performanceCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Portfolio Performance',
                    data: [100, 120, 115, 134, 168, 132],
                    borderColor: '#4a6bff',
                    tension: 0.4,
                    fill: true,
                    backgroundColor: 'rgba(74, 107, 255, 0.1)'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            display: false
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });

        // Initialize Asset Allocation Chart
        const allocationCtx = document.getElementById('allocationChart').getContext('2d');
        new Chart(allocationCtx, {
            type: 'doughnut',
            data: {
                labels: ['Stocks', 'Bonds', 'Cash', 'Real Estate'],
                datasets: [{
                    data: [65, 20, 10, 5],
                    backgroundColor: [
                        '#4a6bff',
                        '#00d4ff',
                        '#28a745',
                        '#ffc107'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            boxWidth: 12
                        }
                    }
                }
            }
        });

        // Function to update stock data (simulated)
        function updateStockData() {
            const stocks = [
                { symbol: 'AAPL', price: 175.25 },
                { symbol: 'MSFT', price: 285.50 }
            ];

            stocks.forEach(stock => {
                // Simulate price changes
                const change = (Math.random() - 0.5) * 2;
                const newPrice = stock.price + change;
                const changePercent = (change / stock.price * 100).toFixed(1);
                
                // Update DOM elements
                const holdingItem = document.querySelector(`.holding-item:has(.stock-symbol:contains('${stock.symbol}'))`);
                if (holdingItem) {
                    const priceElement = holdingItem.children[2];
                    const valueElement = holdingItem.children[3];
                    const changeElement = holdingItem.children[4];

                    priceElement.textContent = `$${newPrice.toFixed(2)}`;
                    valueElement.textContent = `$${(newPrice * (stock.symbol === 'AAPL' ? 25 : 30)).toFixed(2)}`;
                    changeElement.textContent = `${changePercent}%`;
                    changeElement.className = `change ${change >= 0 ? 'positive' : 'negative'}`;
                }
            });
        }

        // Update stock data every 5 seconds
        setInterval(updateStockData, 5000);
 