/* eslint-env browser */
/* global document, alert, confirm */
// DOM Elements (will be initialized when DOM is ready)
let loadingEl, errorEl, errorMessageEl, canvasItemsEl, itemsGridEl, addFormEl;

// Initialize the app
document.addEventListener('DOMContentLoaded', function () {
  // API Configuration
  const API_BASE_URL = window.location.origin.replace(':3000', ':3001');
  // Initialize DOM elements
  loadingEl = document.getElementById('loading');
  errorEl = document.getElementById('error');
  errorMessageEl = document.getElementById('error-message');
  canvasItemsEl = document.getElementById('canvas-items');
  itemsGridEl = document.getElementById('items-grid');
  addFormEl = document.getElementById('add-form');

  fetchCanvasItems(API_BASE_URL);
  setupFormHandlers(API_BASE_URL);
});

// Fetch canvas items from API
async function fetchCanvasItems(API_BASE_URL) {
  try {
    showLoading();
    hideError();

    const response = await fetch(`${API_BASE_URL}/api/canvas`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    displayCanvasItems(data, API_BASE_URL);
  } catch (error) {
    console.error('Error fetching canvas items:', error);
    showError(error.message);
  }
}

// Display canvas items
function displayCanvasItems(items, API_BASE_URL) {
  hideLoading();
  hideError();

  if (items.length === 0) {
    itemsGridEl.innerHTML = '<p>No canvas items found.</p>';
  } else {
    itemsGridEl.innerHTML = items
      .map(
        (item) => `
            <div class="canvas-item" data-id="${item.id}">
                <h3>${escapeHtml(item.Name)}</h3>
                <p><strong>Type:</strong> ${escapeHtml(item.Type)}</p>
                <p><strong>Size:</strong> ${item.Width} x ${item.Height}</p>
                <div class="actions">
                    <button onclick="editItem(${item.id})">Edit</button>
                    <button class="delete" onclick="deleteItem(${item.id}, '${API_BASE_URL}')">Delete</button>
                </div>
            </div>
        `
      )
      .join('');
  }

  canvasItemsEl.style.display = 'block';
}

// Show loading state
function showLoading() {
  loadingEl.style.display = 'block';
  canvasItemsEl.style.display = 'none';
  errorEl.style.display = 'none';
}

// Hide loading state
function hideLoading() {
  loadingEl.style.display = 'none';
}

// Show error message
function showError(message) {
  errorMessageEl.textContent = message;
  errorEl.style.display = 'block';
  canvasItemsEl.style.display = 'none';
  hideLoading();
}

// Hide error message
function hideError() {
  errorEl.style.display = 'none';
}

// Setup form handlers
function setupFormHandlers(API_BASE_URL) {
  addFormEl.addEventListener('submit', (e) => handleAddItem(e, API_BASE_URL));
}

// Handle add item form submission
async function handleAddItem(event, API_BASE_URL) {
  event.preventDefault();

  const formData = new FormData(addFormEl);
  const itemData = {
    Name: formData.get('name'),
    Type: formData.get('type'),
    Width: parseInt(formData.get('width')),
    Height: parseInt(formData.get('height')),
  };

  try {
    const response = await fetch(`${API_BASE_URL}/api/canvas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(itemData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Clear form and refresh items
    addFormEl.reset();
    fetchCanvasItems(API_BASE_URL);
  } catch (error) {
    console.error('Error adding canvas item:', error);
    alert('Failed to add canvas item: ' + error.message);
  }
}

// Edit item (placeholder function)
function editItem(id) {
  alert(`Edit functionality for item ${id} will be implemented soon!`);
}

// Delete item
async function deleteItem(id, API_BASE_URL) {
  if (!confirm('Are you sure you want to delete this item?')) {
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/canvas/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Refresh items
    fetchCanvasItems(API_BASE_URL);
  } catch (error) {
    console.error('Error deleting canvas item:', error);
    alert('Failed to delete canvas item: ' + error.message);
  }
}

// Utility function to escape HTML
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
