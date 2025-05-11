// Initialize Charts
function initializeCharts() {
    // Spending Chart
    const spendingCtx = document.getElementById('spendingChart').getContext('2d');
    const spendingChart = new Chart(spendingCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Spending',
                data: [3200, 3800, 3500, 4200, 3850, 3600],
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
}

// Load Dashboard Data
function loadDashboardData() {
    // Load user info
    const userEmail = sessionStorage.getItem('userEmail');
    if (userEmail) {
        document.getElementById('userEmail').textContent = userEmail;
        document.getElementById('userName').textContent = userEmail.split('@')[0];
    }

    // Load recent transactions
    loadRecentTransactions();
}

// Load Recent Transactions
function loadRecentTransactions() {
    const transactions = [
        { date: '2023-08-15', description: 'Grocery Shopping', amount: -120.50, category: 'Food' },
        { date: '2023-08-14', description: 'Salary Deposit', amount: 3200.00, category: 'Income' },
        { date: '2023-08-13', description: 'Electric Bill', amount: -85.20, category: 'Utilities' }
    ];

    const transactionsList = document.querySelector('.transactions-list');
    transactionsList.innerHTML = transactions.map(transaction => `
        <div class="transaction-item">
            <div class="transaction-info">
                <h4>${transaction.description}</h4>
                <span>${transaction.date}</span>
            </div>
            <span class="transaction-amount ${transaction.amount > 0 ? 'positive' : 'negative'}">
                ${transaction.amount > 0 ? '+' : ''}$${Math.abs(transaction.amount).toFixed(2)}
            </span>
        </div>
    `).join('');
}

// Mobile Menu Toggle
document.querySelector('.menu-toggle').addEventListener('click', () => {
    document.querySelector('.sidebar').classList.toggle('active');
});

// Logout Function
function logout() {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userEmail');
    window.location.href = 'login.html';
}

// Chart Period Change
document.getElementById('chartPeriod').addEventListener('change', (e) => {
    // Update chart data based on selected period
    // This would typically fetch new data from the server
    console.log('Period changed to:', e.target.value);
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeCharts();
    loadDashboardData();
});