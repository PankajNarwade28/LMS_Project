// API Base URL
const API_URL = '/api/videos';

// State
let allVideos = [];
let filteredVideos = [];
let currentCategory = 'all';

// DOM Elements
const videosGrid = document.getElementById('videosGrid');
const loadingSpinner = document.getElementById('loadingSpinner');
const noResults = document.getElementById('noResults');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const categoryFilters = document.getElementById('categoryFilters');
const sortSelect = document.getElementById('sortSelect');
const videoModal = document.getElementById('videoModal');
const modalBody = document.getElementById('modalBody');
const closeModal = document.querySelector('.close');

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    loadVideos();
    loadCategories();
    setupEventListeners();
});

// Helper: get YouTube video ID and thumbnail URL
function getYouTubeThumbnailURL(url) {
    try {
        if (!url) return '';
        // handle common YouTube URL patterns
        // examples: https://youtu.be/ID, https://www.youtube.com/watch?v=ID, watch?v=ID&...
        const ytMatch = url.match(/(?:youtu\.be\/|v=|embed\/)([A-Za-z0-9_-]{6,11})/);
        const id = ytMatch ? ytMatch[1] : null;
        if (!id) return '';
        return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
    } catch (e) {
        return '';
    }
}

// Setup event listeners
function setupEventListeners() {
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
    
    sortSelect.addEventListener('change', handleSort);
    
    closeModal.addEventListener('click', () => {
        videoModal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            videoModal.style.display = 'none';
        }
    });
}

// Load all videos
async function loadVideos() {
    try {
        showLoading();
        const response = await fetch(API_URL);
        const data = await response.json();
        
        if (data.success) {
            allVideos = data.data;
            filteredVideos = allVideos;
            displayVideos(filteredVideos);
            updateStats();
        }
    } catch (error) {
        console.error('Error loading videos:', error);
        showError('Failed to load videos. Please try again.');
    } finally {
        hideLoading();
    }
}

// Load categories
async function loadCategories() {
    try {
        const response = await fetch(`${API_URL}/categories/all`);
        const data = await response.json();
        
        if (data.success) {
            displayCategories(data.data);
            updateCategoriesCount(data.count);
        }
    } catch (error) {
        console.error('Error loading categories:', error);
    }
}

// Display categories
function displayCategories(categories) {
    const allButton = categoryFilters.querySelector('[data-category="all"]');
    
    categories.forEach(category => {
        const btn = document.createElement('button');
        btn.className = 'category-btn';
        btn.dataset.category = category;
        btn.textContent = category;
        btn.addEventListener('click', () => filterByCategory(category));
        categoryFilters.appendChild(btn);
    });
}

// Filter by category
function filterByCategory(category) {
    currentCategory = category;
    
    // Update active button
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        }
    });
    
    // Filter videos
    if (category === 'all') {
        filteredVideos = allVideos;
    } else {
        filteredVideos = allVideos.filter(video => video.category === category);
    }
    
    displayVideos(filteredVideos);
}

// Handle search
async function handleSearch() {
    const query = searchInput.value.trim();
    
    if (!query) {
        filteredVideos = allVideos;
        displayVideos(filteredVideos);
        return;
    }
    
    try {
        showLoading();
        const response = await fetch(`${API_URL}/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        
        if (data.success) {
            filteredVideos = data.data;
            displayVideos(filteredVideos);
        }
    } catch (error) {
        console.error('Error searching videos:', error);
        showError('Search failed. Please try again.');
    } finally {
        hideLoading();
    }
}

// Handle sort
function handleSort() {
    const sortBy = sortSelect.value;
    
    switch (sortBy) {
        case 'newest':
            filteredVideos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            break;
        case 'oldest':
            filteredVideos.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            break;
        case 'title':
            filteredVideos.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'views':
            filteredVideos.sort((a, b) => b.views - a.views);
            break;
    }
    
    displayVideos(filteredVideos);
}

// Display videos
function displayVideos(videos) {
    videosGrid.innerHTML = '';
    
    if (videos.length === 0) {
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    
    videos.forEach(video => {
        const videoCard = createVideoCard(video);
        videosGrid.appendChild(videoCard);
    });
}

// Create video card
function createVideoCard(video) {
    const card = document.createElement('div');
    card.className = 'video-card';
    card.onclick = () => showVideoDetails(video._id);

    // Determine thumbnail: prefer stored thumbnail, fall back to YouTube thumbnail
    const thumb = (video.thumbnail && video.thumbnail.trim()) ? video.thumbnail : getYouTubeThumbnailURL(video.url);

    card.innerHTML = `
        <div class="video-thumbnail">
            ${thumb ? `<img src="${thumb}" alt="${escapeHtml(video.title)} thumbnail">` : `<i class="fab fa-youtube"></i>`}
        </div>
        <div class="video-info">
            <span class="video-category">${escapeHtml(video.category || '')}</span>
            <h3 class="video-title">${escapeHtml(video.title)}</h3>
            <p class="video-description">${escapeHtml(video.description || '')}</p>
            <div class="video-meta">
                <div class="video-stats">
                    <span><i class="fas fa-eye"></i> ${video.views || 0}</span>
                    <span><i class="fas fa-heart"></i> ${video.likes || 0}</span>
                </div>
                ${video.duration ? `<span class="video-duration"><i class="fas fa-clock"></i> ${escapeHtml(video.duration)}</span>` : ''}
            </div>
        </div>
    `;
    
    return card;
}

// Show video details
async function showVideoDetails(videoId) {
    try {
        const response = await fetch(`${API_URL}/${videoId}`);
        const data = await response.json();
        
        if (data.success) {
            displayVideoModal(data.data);
        }
    } catch (error) {
        console.error('Error loading video details:', error);
        showError('Failed to load video details.');
    }
}

// Display video modal
function displayVideoModal(video) {
    // thumbnail for modal
    const thumb = (video.thumbnail && video.thumbnail.trim()) ? video.thumbnail : getYouTubeThumbnailURL(video.url);

    modalBody.innerHTML = `
        ${thumb ? `<div style="width:100%;height:360px;overflow:hidden;border-radius:12px;margin-bottom:20px;"><img src="${thumb}" alt="${escapeHtml(video.title)} thumbnail" style="width:100%;height:100%;object-fit:cover;display:block;border-radius:12px;"></div>` : ''}
        <div class="modal-video-header">
            <h2 class="modal-video-title">${escapeHtml(video.title)}</h2>
            <div class="modal-video-meta">
                <span><i class="fas fa-tag"></i> ${escapeHtml(video.category)}</span>
                ${video.duration ? `<span><i class="fas fa-clock"></i> ${escapeHtml(video.duration)}</span>` : ''}
                ${video.instructor ? `<span><i class="fas fa-user"></i> ${escapeHtml(video.instructor)}</span>` : ''}
                <span><i class="fas fa-eye"></i> ${video.views} views</span>
                <span><i class="fas fa-heart"></i> ${video.likes} likes</span>
            </div>
        </div>
        <div class="modal-video-description">
            <p>${escapeHtml(video.description)}</p>
        </div>
        <div class="modal-video-actions">
            <button class="btn btn-primary" onclick="watchVideo('${video.url}')">
                <i class="fab fa-youtube"></i> Watch on YouTube
            </button>
            <button class="btn btn-secondary" onclick="likeVideo('${video._id}')">
                <i class="fas fa-heart"></i> Like
            </button>
        </div>
    `;

    videoModal.style.display = 'block';
}

// Watch video
function watchVideo(url) {
    window.open(url, '_blank');
}

// Like video
async function likeVideo(videoId) {
    try {
        const response = await fetch(`${API_URL}/${videoId}/like`, {
            method: 'POST'
        });
        const data = await response.json();
        
        if (data.success) {
            showSuccess('Video liked!');
            // Reload video details
            showVideoDetails(videoId);
            // Reload all videos
            loadVideos();
        }
    } catch (error) {
        console.error('Error liking video:', error);
    }
}

// Update stats
function updateStats() {
    document.getElementById('totalVideos').textContent = allVideos.length;
}

// Update categories count
function updateCategoriesCount(count) {
    document.getElementById('totalCategories').textContent = count;
}

// Show loading
function showLoading() {
    loadingSpinner.style.display = 'block';
    videosGrid.style.display = 'none';
}

// Hide loading
function hideLoading() {
    loadingSpinner.style.display = 'none';
    videosGrid.style.display = 'grid';
}

// Show error
function showError(message) {
    alert(message);
}

// Show success
function showSuccess(message) {
    alert(message);
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Small helper to escape HTML to avoid XSS from data
function escapeHtml(unsafe) {
    if (unsafe === null || unsafe === undefined) return '';
    return String(unsafe)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
}
