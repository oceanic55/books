// Generate index from h3 titles
document.addEventListener('DOMContentLoaded', function() {
  const indexLink = document.querySelector('.comments-link');
  
  if (!indexLink) {
    console.error('Index link not found');
    return;
  }
  
  // Create index modal/dropdown
  const indexContainer = document.createElement('div');
  indexContainer.className = 'index-dropdown';
  indexContainer.style.display = 'none';
  
  // Add "Top of Page" link
  const topLink = document.createElement('a');
  topLink.href = '#top';
  topLink.className = 'index-item';
  topLink.textContent = '↑ Top of Page';
  indexContainer.appendChild(topLink);
  
  // Find all h3 elements in the article
  const h3Elements = document.querySelectorAll('.main-article h3');
  
  console.log('Found h3 elements:', h3Elements.length);
  
  h3Elements.forEach((h3, index) => {
    // Create ID for the h3 if it doesn't have one
    if (!h3.id) {
      h3.id = `section-${index + 1}`;
    }
    
    // Create link in index
    const link = document.createElement('a');
    link.href = `#${h3.id}`;
    link.className = 'index-item';
    link.textContent = h3.textContent;
    indexContainer.appendChild(link);
  });
  
  // Add index container to actions div (parent of indexLink)
  const actionsDiv = indexLink.parentElement;
  actionsDiv.style.position = 'relative';
  actionsDiv.appendChild(indexContainer);
  
  // Toggle index on click
  indexLink.addEventListener('click', function(e) {
    e.preventDefault();
    const isVisible = indexContainer.style.display === 'block';
    indexContainer.style.display = isVisible ? 'none' : 'block';
    console.log('Index toggled:', indexContainer.style.display);
  });
  
  // Close index when clicking outside
  document.addEventListener('click', function(e) {
    if (!actionsDiv.contains(e.target)) {
      indexContainer.style.display = 'none';
    }
  });
  
  // Add smooth scroll behavior
  indexContainer.addEventListener('click', function(e) {
    if (e.target.classList.contains('index-item')) {
      e.preventDefault();
      const targetId = e.target.getAttribute('href').substring(1);
      const targetElement = targetId === 'top' ? document.body : document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        indexContainer.style.display = 'none';
      }
    }
  });
});
