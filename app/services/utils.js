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
