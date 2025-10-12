/* eslint-env browser */
/* global document, alert, confirm */

// DOM Elements (will be initialized when DOM is ready)
let loadingEl,
  errorEl,
  errorMessageEl,
  canvasItemsEl,
  itemsGridEl,
  addFormEl,
  userInfoEl,
  logoutBtn;

// API Configuration
const API_BASE_URL = 'https://web-production-9c4a.up.railway.app';

// Get authentication token
function getToken() {
  return localStorage.getItem('token');
}

// Get current user
function getUser() {
  const userJson = localStorage.getItem('user');
  return userJson ? JSON.parse(userJson) : null;
}

// Logout
function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = 'login.html';
}

// Check if user is authenticated
function checkAuth() {
  const token = getToken();
  if (!token) {
    window.location.href = 'login.html';
    return false;
  }
  return true;
}

// Initialize the app
document.addEventListener('DOMContentLoaded', function () {
  // Check authentication first
  if (!checkAuth()) return;

  // Initialize DOM elements
  loadingEl = document.getElementById('loading');
  errorEl = document.getElementById('error');
  errorMessageEl = document.getElementById('error-message');
  canvasItemsEl = document.getElementById('canvas-items');
  itemsGridEl = document.getElementById('items-grid');
  addFormEl = document.getElementById('add-form');

  // Add user info and logout button
  const user = getUser();
  if (user) {
    // Create user info element if it doesn't exist
    let header =
      document.querySelector('.header') ||
      document.querySelector('h1').parentElement;
    if (!document.getElementById('user-info')) {
      const userInfoDiv = document.createElement('div');
      userInfoDiv.id = 'user-info';
      userInfoDiv.style.cssText =
        'position: absolute; top: 20px; right: 20px; display: flex; align-items: center; gap: 15px;';
      userInfoDiv.innerHTML = `
        <span style="font-size: 14px; color: #666;">Welcome, <strong>${user.username}</strong></span>
        <button id="logout-btn" style="padding: 8px 16px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer;">Logout</button>
      `;
      document.body.insertBefore(userInfoDiv, document.body.firstChild);

      document.getElementById('logout-btn').addEventListener('click', logout);
    }
  }

  fetchCanvasItems(API_BASE_URL);
  setupFormHandlers(API_BASE_URL);
});

// Fetch canvas items from API
async function fetchCanvasItems(API_BASE_URL) {
  try {
    showLoading();
    hideError();

    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/api/canvas`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 401 || response.status === 403) {
      // Token expired or invalid
      logout();
      return;
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    displayCanvasItems(data);
  } catch (error) {
    console.error('Error fetching canvas items:', error);
    showError('Failed to load canvas items. Please try again.');
  } finally {
    hideLoading();
  }
}

// Display canvas items
function displayCanvasItems(items) {
  if (!itemsGridEl) return;

  if (items.length === 0) {
    itemsGridEl.innerHTML =
      '<p style="text-align: center; color: #666;">No canvas items yet. Create your first one!</p>';
    return;
  }

  itemsGridEl.innerHTML = items
    .map(
      (item) => `
    <div class="canvas-item" data-id="${item.id}">
      <h3>${escapeHtml(item.Name)}</h3>
      <p><strong>Type:</strong> ${escapeHtml(item.Type)}</p>
      <p><strong>Dimensions:</strong> ${item.Width} x ${item.Height}</p>
      <div class="item-actions">
        <button class="btn-edit" data-id="${item.id}">Edit</button>
        <button class="btn-delete" data-id="${item.id}">Delete</button>
      </div>
    </div>
  `
    )
    .join('');

  // Attach event listeners to edit and delete buttons
  document.querySelectorAll('.btn-edit').forEach((btn) => {
    btn.addEventListener('click', () => handleEdit(btn.dataset.id));
  });

  document.querySelectorAll('.btn-delete').forEach((btn) => {
    btn.addEventListener('click', () => handleDelete(btn.dataset.id));
  });
}

// Setup form handlers
function setupFormHandlers(API_BASE_URL) {
  if (!addFormEl) return;

  addFormEl.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
      Name: document.getElementById('name').value,
      Type: document.getElementById('type').value,
      Width: parseInt(document.getElementById('width').value),
      Height: parseInt(document.getElementById('height').value),
    };

    try {
      const token = getToken();
      const response = await fetch(`${API_BASE_URL}/api/canvas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 401 || response.status === 403) {
        logout();
        return;
      }

      if (response.ok) {
        addFormEl.reset();
        fetchCanvasItems(API_BASE_URL);
      } else {
        const error = await response.json();
        showError(error.error || 'Failed to create canvas item');
      }
    } catch (error) {
      console.error('Error creating canvas item:', error);
      showError('Failed to create canvas item. Please try again.');
    }
  });
}

// Handle edit
async function handleEdit(id) {
  const name = prompt('Enter new name:');
  if (!name) return;

  const type = prompt('Enter type (form/canvas):');
  if (!type) return;

  const width = parseInt(prompt('Enter width:'));
  if (isNaN(width)) return;

  const height = parseInt(prompt('Enter height:'));
  if (isNaN(height)) return;

  try {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/api/canvas/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        Name: name,
        Type: type,
        Width: width,
        Height: height,
      }),
    });

    if (response.status === 401 || response.status === 403) {
      logout();
      return;
    }

    if (response.ok) {
      fetchCanvasItems(API_BASE_URL);
    } else {
      const error = await response.json();
      showError(error.error || 'Failed to update canvas item');
    }
  } catch (error) {
    console.error('Error updating canvas item:', error);
    showError('Failed to update canvas item. Please try again.');
  }
}

// Handle delete
async function handleDelete(id) {
  if (!confirm('Are you sure you want to delete this canvas item?')) {
    return;
  }

  try {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/api/canvas/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 401 || response.status === 403) {
      logout();
      return;
    }

    if (response.ok) {
      fetchCanvasItems(API_BASE_URL);
    } else {
      const error = await response.json();
      showError(error.error || 'Failed to delete canvas item');
    }
  } catch (error) {
    console.error('Error deleting canvas item:', error);
    showError('Failed to delete canvas item. Please try again.');
  }
}

// Utility functions
function showLoading() {
  if (loadingEl) loadingEl.style.display = 'block';
}

function hideLoading() {
  if (loadingEl) loadingEl.style.display = 'none';
}

function showError(message) {
  if (errorEl && errorMessageEl) {
    errorMessageEl.textContent = message;
    errorEl.style.display = 'block';
  }
}

function hideError() {
  if (errorEl) errorEl.style.display = 'none';
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
