export function getFileName(name, whatsapp) {
  var filename;
  if (name) {
    filename = name;
    if (whatsapp) {
      filename += whatsapp;
    } else {
      filename += new Date().getTime();
    }
  } else {
    filename = new Date().getTime();
  }
  return filename;
}

export function simplifiedDate(date) {
  var dd = date.getUTCDate();
  var mm = date.getUTCMonth() + 1;
  var yyyy = date.getUTCFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  date = dd + '-' + mm + '-' + yyyy;
  return date.toString();
}
