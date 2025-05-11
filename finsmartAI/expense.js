// Categories data
let categories = [
    { name: 'Shopping', icon: 'fa-shopping-cart' },
    { name: 'Food', icon: 'fa-utensils' },
    { name: 'Housing', icon: 'fa-home' },
    { name: 'Transport', icon: 'fa-car' }
];

// Show category modal
function showAddCategoryModal() {
    document.getElementById('categoryModal').style.display = 'block';
}

// Close category modal
function closeCategoryModal() {
    document.getElementById('categoryModal').style.display = 'none';
}

// Add new category
function addNewCategory() {
    const name = document.getElementById('categoryName').value;
    const icon = document.getElementById('categoryIcon').value;
    
    if (!name) {
        alert('Please enter a category name');
        return;
    }
    
    // Create new category object
    const category = {
        name: name,
        icon: icon,
        id: Date.now(),
        count: 0
    };
    
    // Get existing categories from localStorage
    let categories = JSON.parse(localStorage.getItem('categories') || '[]');
    categories.push(category);
    
    // Save to localStorage
    localStorage.setItem('categories', JSON.stringify(categories));
    
    // Update UI
    updateCategoryUI();
    
    // Reset form and close modal
    document.getElementById('categoryName').value = '';
    document.getElementById('categoryIcon').value = 'fa-shopping-cart';
    closeCategoryModal();
}

function updateCategoryUI() {
    const categories = JSON.parse(localStorage.getItem('categories') || '[]');
    
    // Update categories tab content
    const categoriesTab = document.getElementById('categories-tab');
    const categoryList = document.createElement('div');
    categoryList.className = 'category-grid';
    
    categoryList.innerHTML = categories.map(category => `
        <div class="category-card">
            <div class="category-icon">
                <i class="fas ${category.icon}"></i>
            </div>
            <div class="category-name">${category.name}</div>
            <div class="category-count">${category.count} transactions</div>
            <button class="button button-small" onclick="editCategory(${category.id})">
                <i class="fas fa-edit"></i>
            </button>
        </div>
    `).join('');
    
    // Replace existing content or append new content
    const existingGrid = categoriesTab.querySelector('.category-grid');
    if (existingGrid) {
        existingGrid.replaceWith(categoryList);
    } else {
        categoriesTab.appendChild(categoryList);
    }
    
    // Update category selector in transactions
    updateCategorySelectors();
}

function updateCategorySelectors() {
    const categories = JSON.parse(localStorage.getItem('categories') || '[]');
    const selectors = document.querySelectorAll('.category-selector');
    
    selectors.forEach(selector => {
        selector.innerHTML = categories.map(category => `
            <div class="category-option" data-category="${category.name.toLowerCase()}">
                <i class="fas ${category.icon}"></i> ${category.name}
            </div>
        `).join('');
    });
}

// Initialize categories on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCategoryUI();
});

// Add this to your existing category selection code
document.addEventListener('click', function(e) {
    if (e.target.closest('.category-option')) {
        const option = e.target.closest('.category-option');
        const category = option.dataset.category;
        const transactionItem = option.closest('.transaction-item');
        const categoryButton = transactionItem.querySelector('.transaction-category');
        
        // Update the category button
        categoryButton.innerHTML = `
            <i class="fas fa-tag"></i> ${category.charAt(0).toUpperCase() + category.slice(1)}
        `;
        
        // Update category count
        updateCategoryCount(category);
    }
});

function updateCategoryCount(categoryName) {
    let categories = JSON.parse(localStorage.getItem('categories') || '[]');
    const category = categories.find(c => c.name.toLowerCase() === categoryName.toLowerCase());
    
    if (category) {
        category.count++;
        localStorage.setItem('categories', JSON.stringify(categories));
        updateCategoryUI();
    }
}

// Export transactions
function exportTransactions() {
    // Sample transaction data - replace with your actual data
    const transactions = [
        { date: '2023-08-01', description: 'Grocery Shopping', amount: 150.00, category: 'Shopping' },
        { date: '2023-08-02', description: 'Restaurant', amount: 45.00, category: 'Food' }
    ];

    // Create CSV content
    const csvContent = 'Date,Description,Amount,Category\n' +
        transactions.map(t => `${t.date},"${t.description}",${t.amount},${t.category}`).join('\n');

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.csv';
    a.click();
    window.URL.revokeObjectURL(url);
}

// Initialize when document is loaded
document.addEventListener('DOMContentLoaded', function() {
    updateCategoryOptions();
});