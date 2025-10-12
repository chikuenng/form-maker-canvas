/* eslint-env browser */
/* global window, document, prompt, confirm */

// DOM Elements (will be initialized when DOM is ready)
let loadingEl, errorEl, errorMessageEl, itemsGridEl, addFormEl;

// API Configuration
const API_BASE_URL = 'https://web-production-9c4a.up.railway.app';

// Get authentication token
function getToken() {
  return window.localStorage.getItem('token');
}

// Get current user
function getUser() {
  const userJson = window.localStorage.getItem('user');
  return userJson ? JSON.parse(userJson) : null;
}

// Logout
function logout() {
  window.localStorage.removeItem('token');
  window.localStorage.removeItem('user');
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
  itemsGridEl = document.getElementById('items-grid');
  addFormEl = document.getElementById('add-form');

  // Add user info and logout button to header
  const user = getUser();
  if (user) {
    const header =
      document.querySelector('h1') ||
      document.querySelector('header') ||
      document.body;
    const userInfoDiv = document.createElement('div');
    userInfoDiv.id = 'user-info';
    userInfoDiv.style.cssText =
      'position: fixed; top: 20px; right: 20px; display: flex; align-items: center; gap: 15px; background: white; padding: 10px 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); z-index: 1000;';
    userInfoDiv.innerHTML = `
      <span style="font-size: 14px; color: #666;">Welcome, <strong>${escapeHtml(user.username)}</strong></span>
      <button id="logout-btn" style="padding: 8px 16px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 500;">Logout</button>
    `;

    if (header.tagName === 'H1') {
      header.parentElement.insertBefore(userInfoDiv, header.nextSibling);
    } else {
      document.body.insertBefore(userInfoDiv, document.body.firstChild);
    }

    document.getElementById('logout-btn').addEventListener('click', logout);
  }

  fetchCanvasItems();
  setupFormHandlers();
});

// Fetch canvas items from API
async function fetchCanvasItems() {
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
      '<p style="text-align: center; color: #666; padding: 40px;">No canvas items yet. Create your first one!</p>';
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
    btn.addEventListener('click', () =>
      handleEdit(
        btn.dataset.id,
        items.find((item) => item.id == btn.dataset.id)
      )
    );
  });

  document.querySelectorAll('.btn-delete').forEach((btn) => {
    btn.addEventListener('click', () => handleDelete(btn.dataset.id));
  });
}

// Setup form handlers
function setupFormHandlers() {
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
        fetchCanvasItems();
        hideError();
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
async function handleEdit(id, currentItem) {
  const name = prompt('Enter new name:', currentItem ? currentItem.Name : '');
  if (!name) return;

  const type = prompt(
    'Enter type (form/canvas):',
    currentItem ? currentItem.Type : ''
  );
  if (!type) return;

  const width = parseInt(
    prompt('Enter width:', currentItem ? currentItem.Width : '')
  );
  if (isNaN(width)) return;

  const height = parseInt(
    prompt('Enter height:', currentItem ? currentItem.Height : '')
  );
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
      fetchCanvasItems();
      hideError();
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
      fetchCanvasItems();
      hideError();
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
