const searchBtn = document.getElementById('search-btn');
const input = document.getElementById('username-input');
const display = document.getElementById('profile-display');

async function fetchUser(username) {
    display.innerHTML = `<p>Loading profile...</p>`;
    
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        
        if (!response.ok) throw new Error("User not found");

        const data = await response.json();
        renderUser(data);
    } catch (err) {
        display.innerHTML = `<p style="color: #ff4444;">${err.message}</p>`;
    }
}

function renderUser(user) {
    display.innerHTML = `
        <div class="user-card">
            <img src="${user.avatar_url}" class="avatar">
            <h2>${user.name || user.login}</h2>
            <p style="color: #94a3b8; margin-top: 5px;">@${user.login}</p>
            <p style="margin-top: 15px;">${user.bio || 'No bio available'}</p>
            
            <div class="stats-grid">
                <div class="stat-item"><span>Repos</span><strong>${user.public_repos}</strong></div>
                <div class="stat-item"><span>Followers</span><strong>${user.followers}</strong></div>
                <div class="stat-item"><span>Following</span><strong>${user.following}</strong></div>
            </div>
            
            <a href="${user.html_url}" target="_blank" class="visit-btn">Visit GitHub →</a>
        </div>
    `;
}

searchBtn.addEventListener('click', () => {
    if (input.value.trim()) fetchUser(input.value.trim());
});

// Allow "Enter" key to trigger search
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchBtn.click();
});