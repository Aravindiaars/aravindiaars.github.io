async function copyImage() {
  let input = document.getElementById("file");
  if (!input.files?.length) {
    alert("Select files before copy");
  }
  const blob = new Blob(["sample 2"], { type: "text/plain" });
  let clipboardItem = new ClipboardItem({
    ["text/plain"]: blob,
    ["image/png"]: input.files[0]
  });
  let response = await navigator.clipboard.write([clipboardItem]);
  console.log(response);
}
async function paste() {
 const data = await navigator.clipboard.read();
  console.log(data);
}