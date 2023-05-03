function copyImageAndEMailLinkToClipboard() {
  imageUrl = "";
  viewUrl = "https://aravindiaars.github.io/t1.html";

  console.log("In");
  var img1 = convertURIToImageData(imageUrl).then(function (imageData) {
    // Here you can use imageData
    console.log(imageData);
    var img = imagedata_to_image(imageData);

    console.log(img);
    var anchor = document.createElement("a");
    anchor.href = viewUrl;
    anchor.target = "_blank";
    anchor.appendChild(img);
    var div = document.createElement("div");
    div.tabIndex = -1;
    div.appendChild(anchor);
    document.body.appendChild(div);
    console.log(div);
    setTimeout(async function () {
      await copyToClipboard(anchor.href);
      document.body.removeChild(div);
    }, 0);
  });
}

function convertURIToImageData(URI) {
  return new Promise(function (resolve, reject) {
    if (URI == null) return reject();
    var canvas = document.createElement("canvas"),
      context = canvas.getContext("2d"),
      image = new Image();
    image.addEventListener("load", function () {
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      resolve(context.getImageData(0, 0, canvas.width, canvas.height));
    }, false);
    image.src = URI;
  });
}

function imagedata_to_image(imagedata) {
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  canvas.width = imagedata.width;
  canvas.height = imagedata.height;
  ctx.putImageData(imagedata, 0, 0);

  var image = new Image();
  image.src = canvas.toDataURL();
  return image;
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    console.log("Text copied to clipboard");
  } catch (err) {
    console.error("Failed to copy text: ", err);
  }
}
