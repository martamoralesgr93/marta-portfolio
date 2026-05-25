const fs = require('fs');

// Process index.html directly
let html = fs.readFileSync('index.html', 'utf8');

// Normalize quotes
html = html.replace(/[“”]/g, '"');
html = html.replace(/[‘’]/g, "'");

// Function to process a specific block of text containing S T A R
function processSTAR(content) {
  // Replace S
  content = content.replace(/<h4 class="detail-label">S — ([^<]+)<\/h4>/g, '<div class="star-stepper">\n  <div class="stepper-item">\n    <div class="stepper-badge">S</div>\n    <div class="stepper-content">\n      <h5 class="stepper-title">$1</h5>');
  
  // Replace T
  content = content.replace(/<h4 class="detail-label">T — ([^<]+)<\/h4>/g, '    </div>\n  </div>\n  <div class="stepper-item">\n    <div class="stepper-badge">T</div>\n    <div class="stepper-content">\n      <h5 class="stepper-title">$1</h5>');
  
  // Replace A
  content = content.replace(/<h4 class="detail-label">A — ([^<]+)<\/h4>/g, '    </div>\n  </div>\n  <div class="stepper-item">\n    <div class="stepper-badge">A</div>\n    <div class="stepper-content">\n      <h5 class="stepper-title">$1</h5>');
  
  // Replace R
  content = content.replace(/<h4 class="detail-label">R — ([^<]+)<\/h4>/g, '    </div>\n  </div>\n  <div class="stepper-item">\n    <div class="stepper-badge">R</div>\n    <div class="stepper-content">\n      <h5 class="stepper-title">$1</h5>');
  
  // Upgrade the table wrapper inside R if present
  content = content.replace(/<div class="table-responsive">/g, '<div class="results-card"><div class="table-responsive">');
  content = content.replace(/<\/table>\s*<\/div>/g, '</table>\n            </div>\n            </div>');
  
  return content;
}

// We will split the file by `<div data-lang="` and process each block if it has STAR headers
const blocks = html.split(/(<div data-lang="[a-z]{2}"[^>]*>)/);
let result = blocks[0];

for(let i=1; i<blocks.length; i+=2) {
  let openingTag = blocks[i];
  let blockContent = blocks[i+1];
  
  if (blockContent.includes('class="detail-label"')) {
    // This block has STAR headers.
    // We split the block content to find where the "R" section ends.
    // The "R" section ends before the closing tags of the data-lang block.
    // Let's assume the block content ends with `</div>` tags.
    // We can find the last occurrence of `</div>` and insert the closing tags for the stepper there!
    
    // Better: Since we know the block content ends with `<!-- /ES -->` or `<!-- /EN -->` and some tags before it.
    // Let's just find the sequence of closing tags at the end.
    
    let processed = processSTAR(blockContent);
    
    // Now we need to append the closing tags for the stepper.
    // The stepper started at S and needs to close after the R content.
    // Since we replaced S with `<div class="star-stepper">` and each header closes the previous one,
    // we only need to close the LAST stepper-item and the star-stepper itself!
    // So we need to insert `</div>\n  </div>\n</div>` at the end of the content, but BEFORE the closing tags of the container.
    
    // Let's find the last `</div>` in the processed string.
    // Wait, the processed string still has the original closing tags at the end.
    // Let's find where the original closing tags start.
    // A safe place is before the `<!-- /ES -->` or `<!-- /EN -->` comment.
    
    if (processed.includes('<!-- /ES -->')) {
      processed = processed.replace('<!-- /ES -->', '    </div>\n  </div>\n</div>\n<!-- /ES -->');
    } else if (processed.includes('<!-- /EN -->')) {
      processed = processed.replace('<!-- /EN -->', '    </div>\n  </div>\n</div>\n<!-- /EN -->');
    }
    
    result += openingTag + processed;
  } else {
    result += openingTag + blockContent;
  }
}

fs.writeFileSync('index.html', result);
console.log('Safer Stepper Applied!');
