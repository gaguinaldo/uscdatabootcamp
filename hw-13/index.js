let dropdown = $('#locality-dropdown');

dropdown.empty();

dropdown.append('<option selected="true" disabled>Choose State/Province</option>');
dropdown.prop('selectedIndex', 0);

const url = './api/v1/names';

// Populate dropdown with list of provinces
$.getJSON(url, function (data) {
dropdown.append($('<option></option>').attr('value', data.abbreviation).text(entry.name));
  })
});
