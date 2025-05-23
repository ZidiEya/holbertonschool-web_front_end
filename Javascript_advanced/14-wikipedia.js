function createElement(data) {
  const paragraph = document.createElement('p');
  paragraph.textContent = data;
  document.body.appendChild(paragraph);
}

function queryWikipedia(callback) {
  const url = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Stack%20Overflow&origin=*';
  
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  
  xhr.onload = function () {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      const pages = response.query.pages;
      const extract = pages[Object.keys(pages)[0]].extract;
      callback(extract);
    } else {
      console.error('Failed to fetch Wikipedia article:', xhr.status);
    }
  };

  xhr.onerror = function () {
    console.error('Request error');
  };

  xhr.send();
}

// Call the function with createElement as callback
queryWikipedia(createElement);
