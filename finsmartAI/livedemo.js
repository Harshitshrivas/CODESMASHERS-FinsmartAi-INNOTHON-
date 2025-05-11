
    const demoModal = document.getElementById('demoModal');
    const closeModal = document.querySelector('.close-modal');
    const addAccountBtn = document.getElementById('addAccountBtn');
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notificationText');
    const savingsSlider = document.getElementById('savingsSlider');
    const savingsValue = document.getElementById('savingsValue');
    let analysisChart = null;

    
    closeModal.addEventListener('click', () => {
      demoModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    });

    
    window.addEventListener('click', (e) => {
      if (e.target === demoModal) {
        demoModal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });

    
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
       
        tabButtons.forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => {
          content.classList.remove('active');
        });
        
       
        button.classList.add('active');
        const tabId = button.getAttribute('data-tab') + '-tab';
        document.getElementById(tabId).classList.add('active');
        
        
        if (tabId === 'analysis-tab') {
          setTimeout(initDemoCharts, 300);
        }
      });
    });

    
    document.querySelectorAll('.bank-card').forEach(card => {
      card.addEventListener('click', function() {
        const bankName = this.getAttribute('data-bank');
        showNotification(`Viewing ${bankName} transactions`);
      });
    });

    
    addAccountBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const button = this;
      const originalText = button.innerHTML;
      
      button.innerHTML = '<span class="loading"></span> Connecting...';
      button.disabled = true;
      
      setTimeout(() => {
        
        const bankCards = document.querySelector('.bank-connections');
        const newBankCard = document.createElement('div');
        newBankCard.className = 'bank-card';
        newBankCard.setAttribute('data-bank', 'Credit Union');
        newBankCard.innerHTML = `
          <div class="bank-logo">CU</div>
          <div>
            <div class="transaction-merchant">Local Credit Union</div>
            <div class="transaction-date">•••• 6632</div>
          </div>
        `;
        bankCards.appendChild(newBankCard);
        
        // Add click event to new card
        newBankCard.addEventListener('click', function() {
          showNotification('Viewing Credit Union transactions');
        });
        
        // Reset button
        button.innerHTML = originalText;
        button.disabled = false;
        
        // Show success message
        showNotification('Account successfully connected! Transactions will sync shortly.');
      }, 2000);
    });

    // Savings slider
    savingsSlider.addEventListener('input', () => {
      const value = savingsSlider.value;
      savingsValue.textContent = `+$${value}/month`;
      
      // Simple simulation
      const monthsSaved = Math.floor(value / 50);
      document.querySelector('.simulation-result p').innerHTML = 
        `With this change, you'll reach your emergency fund goal <strong>${monthsSaved} months earlier</strong>.`;
    });

    // Show notification
    function showNotification(message) {
      notificationText.textContent = message;
      notification.classList.add('show');
      
      setTimeout(() => {
        notification.classList.remove('show');
      }, 3000);
    }

    // Update transaction category
    function updateCategory(selectElement, originalCategory) {
      if (selectElement.value !== "Change category") {
        const categoryTag = selectElement.closest('.transaction-category').querySelector('.category-tag');
        categoryTag.innerHTML = `<i class="fas fa-tag"></i> ${selectElement.value}`;
        showNotification(`Category changed from ${originalCategory} to ${selectElement.value}`);
        
        // Reset the select
        setTimeout(() => {
          selectElement.value = "Change category";
        }, 500);
      }
    }

    // Show goal details
    function showGoalDetails(goalName) {
      showNotification(`Viewing details for ${goalName} goal`);
    }

    // Initialize Charts
    function initDemoCharts() {
      // Clear existing charts if they exist
      if (analysisChart) {
        analysisChart.destroy();
      }
      
      // Analysis Chart (Bar)
      const analysisCtx = document.getElementById('analysisCanvas').getContext('2d');
      analysisChart = new Chart(analysisCtx, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
          datasets: [{
            label: 'Your Spending',
            data: [3200, 3500, 3800, 4100, 3850],
            backgroundColor: '#4a6bff'
          }, {
            label: 'Similar Households',
            data: [3500, 3600, 3700, 3800, 3900],
            backgroundColor: '#00d4ff'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Monthly Spending ($)'
              }
            }
          }
        }
      });
    }

    // Update chart view
    function updateChart(type) {
      if (!analysisChart) return;
      
      if (type === 'category') {
        analysisChart.data = {
          labels: ['Housing', 'Food', 'Transport', 'Utilities', 'Entertainment'],
          datasets: [{
            label: 'Your Spending',
            data: [1200, 600, 250, 200, 150],
            backgroundColor: '#4a6bff'
          }, {
            label: 'Budget',
            data: [1200, 600, 250, 200, 150],
            backgroundColor: '#00d4ff',
            type: 'line',
            borderColor: '#00d4ff',
            borderWidth: 2,
            pointRadius: 0
          }]
        };
        analysisChart.options.scales.y.title.text = 'Amount ($)';
      } else {
        analysisChart.data = {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
          datasets: [{
            label: 'Your Spending',
            data: [3200, 3500, 3800, 4100, 3850],
            backgroundColor: '#4a6bff'
          }, {
            label: 'Similar Households',
            data: [3500, 3600, 3700, 3800, 3900],
            backgroundColor: '#00d4ff'
          }]
        };
        analysisChart.options.scales.y.title.text = 'Monthly Spending ($)';
      }
      
      analysisChart.update();
      showNotification(`Viewing ${type === 'category' ? 'spending by category' : 'monthly spending'}`);
    }

    // Initialize the dashboard when page loads
    document.addEventListener('DOMContentLoaded', function() {
      initDemoCharts();
    });
