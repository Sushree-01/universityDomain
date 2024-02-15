$(document).ready(function(){
    $('#results').on('click', '.btn-outline-primary',function(){
        const row=$(this).closest('tr');
        const name=row.find('td:nth-child(1)').text();
        const state=row.find('td:nth-child(2)').text();
        const web_pages=row.find('td:nth-child(3) a').attr('href');
    
        $.ajax({
          url:'/save-favourite',
          method:'POST',
          contentType:'application/json',
          data:JSON.stringify({name,state,web_pages}),
          success:function(response){
            alert(response.message);
          },
          error:function(err){
            console.error('Error saving favourite:',err);
            alert('Error saving favourite. Please try again.');
          }
        });
      });





    $('#searchForm').submit(function(e) {
      e.preventDefault();
  
      const country = $('#country').val();
  
      $.ajax({
        url: `https://universities.hipolabs.com/search?country=${country}`,
        method: 'GET',
        success: function(data) {
          displayResults(data);
        },
        error: function(err) {
          console.error('Error fetching data:', err);
        }
      });
    });
  
    function displayResults(universities) {
      const resultsContainer = $('#results');
      resultsContainer.empty();
  
      if (universities.length === 0) {
        resultsContainer.append('<p>No universities found.</p>');
        return;
      }
  
      const table = $('<table class="table"></table>');
      table.append('<thead><tr><th>Name</th><th>State/Province</th><th>Web Pages</th><th>Favourite</th></tr></thead>');
      const tbody = $('<tbody></tbody>');
  
      universities.forEach(function(university) {
        const row = $('<tr></tr>');
        row.append(`<td>${university.name}</td>`);
        row.append(`<td>${university.state || '-'}</td>`);
        row.append(`<td><a href="${university.web_pages}" target="_blank">${university.web_pages}</a></td>`);
        row.append('<td><button class="btn btn-outline-primary btn-sm">Add to Favourites</button></td>');
  
        tbody.append(row);
      });
  
      table.append(tbody);
      resultsContainer.append(table);
    }
  });



  
  
  