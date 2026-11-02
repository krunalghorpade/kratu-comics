'use strict';
document.getElementById('year').textContent = new Date().getFullYear();
// Only final-approved episodes belong in the public manifest. Drafts stay private.
fetch('episodes.json').then(r => {if(!r.ok) throw new Error('Manifest unavailable');return r.json();}).then(data => {
 const episodes = data.episodes.filter(e => e.status === 'published' && e.approved === true);
 if (!episodes.length) return;
 const list = document.getElementById('episode-list'); list.replaceChildren();
 for (const episode of episodes) {
  const card = document.createElement('article'); card.className = 'coming-card';
  const cover = document.createElement('img'); cover.src = episode.thumbnail; cover.alt = episode.thumbnailAlt; cover.className = 'cover-placeholder'; cover.loading = 'lazy';
  const copy = document.createElement('div'); copy.className = 'episode-copy';
  const title = document.createElement('h3'); title.textContent = episode.title;
  const link = document.createElement('a'); link.className = 'button'; link.href = `read.html?episode=${encodeURIComponent(episode.id)}`;link.textContent = `READ EPISODE #${String(episode.number).padStart(3,'0')} →`;
  copy.append(title,document.createElement('br'),link);card.append(cover,copy);list.append(card);
 }
}).catch(() => { /* Keep the honest static coming-soon state. */ });
