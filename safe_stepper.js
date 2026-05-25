const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

function convertToStepper(htmlStr) {
  const splitRegex = /(<div\s+data-lang=["'](?:es|en)["'][^>]*>)/i;
  const blocks = htmlStr.split(splitRegex);
  
  let result = blocks[0];
  
  for(let i=1; i<blocks.length; i+=2) {
    let openingTag = blocks[i];
    let langBlock = blocks[i+1];
    
    if (!/<h4\s+class=["']detail-label["']/.test(langBlock)) {
       result += openingTag + langBlock;
       continue;
    }
    
    let sections = langBlock.split(/<h4\s+class=["']detail-label["']>([^<]+)<\/h4>/);
    let newLangBlock = sections[0] + '\n<div class="star-stepper">\n'; 
    
    for(let j=1; j<sections.length; j+=2) {
      let titleText = sections[j];
      let innerHtml = sections[j+1];
      
      let letter = titleText.charAt(0);
      let title = titleText.substring(1).replace(/^[-—\s·]+/, '').trim();
      let isResult = letter === 'R';
      
      let extraClosing = '';
      
      if (isResult) {
        // Upgrade the table wrapper
        innerHtml = innerHtml.replace(/<div class=["']table-responsive["']>/g, '<div class="results-card"><div class="table-responsive">');
        innerHtml = innerHtml.replace(/<\/table>\s*<\/div>/g, '</table>\n            </div>\n            </div>');
        
        // Safely extract ALL trailing closing tags (not just div) so we don't break the layout!
        // This regex matches any sequence of closing tags (</div>, </article>, </section>, etc) and whitespace at the very end of the string.
        const trailingHTMLMatch = innerHtml.match(/(<\/[a-z]+>\s*)+$/i);
        if (trailingHTMLMatch) {
          extraClosing = trailingHTMLMatch[0];
          innerHtml = innerHtml.substring(0, innerHtml.length - extraClosing.length);
        }
      }
      
      newLangBlock += `  <div class="stepper-item">
    <div class="stepper-badge">${letter}</div>
    <div class="stepper-content">
      <h5 class="stepper-title">${title}</h5>
${innerHtml}
    </div>
  </div>\n`;
  
      if (isResult) {
         newLangBlock += '</div>\n' + extraClosing; // close star-stepper BEFORE the trailing tags
      }
    }
    result += openingTag + newLangBlock;
  }
  return result;
}

fs.writeFileSync('index.html', convertToStepper(html));
console.log('Safe Stepper Applied!');
