// BLP 2021-03-10 -- As far as I can tell this is no longer used.
/* For the image slideshow at the top of index.php and altoroute.php
 * homepage, index and root. It gets the images from
 * ../bartonlp/Pictures which has only a few of the photoes that
 * are on my Rpi.
 *  glob.proxy.php returns a list of files in the 'path' of dobanner()
 *  The bannershow() function uses the 'bannerImages' array created by
 *  dobanner().
 *  'bannershow() displayes the images in "#show"
 */

var bannerImages = new Array, binx = 0;

/* Called from 'index.php' */

// dobanner()
// path is a pattern to glob on.
// obj: {size: size, recursive: yes|no, mode: seq|rand}

function dobanner(path, obj) {
  // obj has three members: size, recursive, mode.
  
  let recursive = obj.recursive;
  let size = obj.size;
  let mode = obj.mode;
  
  $.ajax({
    url: '../bartonlp/proxy-glob.php',
    type: 'get',
    data: {path: path, recursive: recursive, size: size, mode: mode},
    success: function(data) {
      //console.log("data", data);
      bannerImages = data.split("\n");
      $("#show").html("<h3 class='center'>" + path + "</h3><img>");
      bannershow(obj.mode); // pass mode to bannershow()
    },
    error: function(err) {
      console.log("Error: ", err);
    }
  });
}

// Called from above. It displayes the image in "#show" and then sets a
// timer and does it again and again.

function bannershow() {
  if(binx > (bannerImages.length - 1)) {
    binx = 0;
  }
    
  var image = new Image;
  image.src = "../bartonlp/" +bannerImages[binx++];
  $(image).load(function() {
    console.log(image.src);
    $("#show img").attr('src', image.src);
    setTimeout(function() { bannershow(); }, 5000);
  });

  $(image).error(function(err) {
    console.log(err);
    setTimeout(function() { bannershow(); }, 5000);
  });
}
