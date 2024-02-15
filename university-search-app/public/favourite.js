$(document).ready(function(){
    fetchFavourites();
    function fetchFavourites(){
      $.ajax({
        url:'/get-favourites',
        method:'GET',
        success:function(data){
          displayFavourites(data);
        },
        error:function(err){
          console.error('Error fetching favourites:',err);
          alert('Error fetching favourites. Please try again.');
        }
      });
    }
  
    function displayFavourites(favourites){
      const favouritesContainer=$('#favourites');
      favouritesContainer.empty();
  
      if(favourites.length===0){
        favouritesContainer.append('<p>No favourites found.</p>');
        return;
      }
      const table=$('<table class="table"></table>');
      table.append('<thead><tr><th>Name</th><th>State/Province</th><th>Web Pages</th></tr></thead>');
      const tbody=$('<tbody></tbody>');
      favourites.forEach(function(favourite){
        const row=$('<tr></tr>');
        row.append(`<td>${favourite.name}</td>`);
        row.append(`<td>${favourite.state || '-'}</td>`);
        row.append(`<td><a href="${favourite.web_pages}" target="_blank">${favourite.web_pages}</a></td>`);
        tbody.append(row);
      });
      table.append(tbody);
      favouritesContainer.append(table);
    }
  });
  