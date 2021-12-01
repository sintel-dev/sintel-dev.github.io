window.addEventListener('load', function() {
        
  const githubTopicsItems = Array.prototype.slice.call(document.querySelectorAll('.software-project'))
  
  function reqError(err) {
    console.log('Fetch Error', err);
  }

  githubTopicsItems.forEach((item,idx) => {
    const url = `https://api.github.com/repos/${item.dataset.project}`
    const currentRequest = new XMLHttpRequest();
    currentRequest.onload = function() {
      if (this.status != 200) {
        console.log(`STATUS ${JSON.stringify(this.status)}`);  
      } else {
        var data = JSON.parse(this.responseText);
        console.log(data);
        
        const {
          description, 
          language, 
          stargazers_count, 
          forks_count, 
          html_url, 
          name
        } = data


        let color = language === 'JavaScript' ? '#f1e05a' : '#3572A5';

        let forksItem = forks_count === 0 ? '' : `<div class="col-auto justify-content-center d-flex align-items-center">
            <img src="/images/branch.svg" alt="branch" width="10" height="13" class="ml-3 mr-1 d-inline-block"> <div>${forks_count}</div>
          </div>`;
        let starsItem = stargazers_count === 0 ? '' : `<div class="col-auto justify-content-center d-flex align-items-center">
            <img src="/images/star.svg" alt="star" width="14" height="13" class="ml-3 mr-1 d-inline-block"> <div>${stargazers_count}</div>
          </div>`;

        item.innerHTML = `
          <div class="row no-gutters text-dark project-data">
            <div class="col-auto justify-content-center d-flex">
              <svg width="14" height="14" class="mr-1">
                <circle xmlns="http://www.w3.org/2000/svg" cx="7" cy="7" r="6" stroke="none" fill="${color}"/>
              </svg>
              <div class="">${language}</div>
            </div>
            
            ${forksItem}
            ${starsItem}
          </div>
        `

      }
    };
    currentRequest.onerror = reqError;
    currentRequest.open('get', url, true);
    currentRequest.setRequestHeader('Accept', 'application/vnd.github.mercy-preview+json');
    currentRequest.send();

  })

  
})