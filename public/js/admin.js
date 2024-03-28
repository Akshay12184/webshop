import { getPurchaseHistory } from './script.js';


function extractPurchaseInfo() {
    const purchaseHistory = getPurchaseHistory();

    const tableBody = document.getElementById('purchaseTableBody');

    purchaseHistory.forEach(purchase => {
        const row = document.createElement('tr');
        const timestampCell = document.createElement('td');
        timestampCell.textContent = new Date(purchase.timestamp).toLocaleString();
        row.appendChild(timestampCell);



        tableBody.appendChild(row);
    });
}

extractPurchaseInfo();
