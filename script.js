function DownloadTiktok() {
  document.getElementById('result').classList.add("d-none");
      clear()
      var linkUrl = document.getElementById('urlinput').value
      validURL(linkUrl)
      if (!validURL(linkUrl)) {
        alert("enter correct url")
  
      } else {
        var timeleft = 2;
    var downloadTimer = setInterval(function(){
    timeleft--;
    document.getElementById("waiting").textContent =  "Please wait a moment";
    document.getElementById('waitinglogo').classList.remove("d-none");
    if(timeleft <= 0)
        clearInterval(downloadTimer);
    },500);
        

        setTimeout(
          function() 
          {
              
        
        
      
      axios({
        method: 'Get',
        url: 'download.php',
        params: { url: linkUrl } 
        
      })
        .then(function (response) {
          var data = JSON.parse(response.data)
          console.log(data);
          if (data['error']) {
            var author = document.getElementById('author')
            author.innerHTML = 'Error'
            var divVedio = document.getElementById('vedio')
            const div = document.createElement("div");
            div.setAttribute("class","alert alert-danger");
            div.innerHTML = data.error
            divVedio.appendChild(div);
            
            
          } else {
            
         
           // show vedio 
          var divVedio = document.getElementById('vedio')
          const vdo = document.createElement("img");
          //const source = document.createElement("source");
        
          
          vdo.setAttribute("class","bg-info lazy");
          vdo.setAttribute("height",200);
          vdo.setAttribute("width",300);
          vdo.setAttribute("src",data.data.cover);
         
    
          divVedio.appendChild(vdo);
           
          // show information
          var music = document.getElementById('music')
          var watermark = document.getElementById('watermark')
          var orginal = document.getElementById('original')

          music.setAttribute('onclick',"downloadfile('"+data.data.music+"', 'arraybuffer' , 'audio/mp3' , '"+data.data.author.nickname+".mp3')")
          watermark.setAttribute('onclick',"downloadfile('"+data.data.play+"', 'arraybuffer' , 'video/mp4' , '"+data.data.author.nickname+".mp4')")
          orginal.setAttribute('onclick',"downloadfile('"+data.data.wmplay+"', 'arraybuffer' , 'video/mp4' , 'Original"+data.data.author.nickname+".mp4')")
         
         // music.setAttribute('href',data.music)
          //watermark.setAttribute('href',data.video)
          //orginal.setAttribute('href',data.OriginalWatermarkedVideo)

          
          var author = document.getElementById('author')
          author.innerHTML = data.data.author.nickname
         
        }
        });
        document.getElementById('search').classList.add("d-none");
        document.getElementById('text').classList.add("d-none");
        document.getElementById('result').classList.remove("d-none");
      }, 5000);

      }

      
}

function downloadfile (urlfile, responseType, headers, filename){
  

  var newp = document.getElementById('newp')
  newp.classList.remove("d-none");
 
  var progress = document.getElementById('progress')
  progress.classList.remove("d-none");
  progress.setAttribute("style", "width:"+0+"%;");
  progress.innerHTML = 0+"%"
 



    document.getElementById("newwaiting").textContent = ''
    document.getElementById('newwaitingPr').classList.add("d-none");


 

  axios({
    url: urlfile, //your url
    method: 'GET',
    responseType: responseType, //'arraybuffer', // important
    onDownloadProgress: (progressEvent) => {
      let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total); // you can use this to show user percentage of file downloaded
      progress.setAttribute("style", "width:"+percentCompleted+"%;");
      progress.innerHTML = percentCompleted+"%"
      //console.log("onDownloadProgress", percentCompleted);
    },
    headers: {
      'Content-Type':   headers //'audio/mp3'
  }
}).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename); //or any other extension
    document.body.appendChild(link);
    link.click();
});

}

function clear() {
  document.getElementById('waitinglogo').classList.add("d-none");

  document.getElementById('search').classList.remove("d-none");
  document.getElementById('result').classList.add("d-none");
  document.getElementById('text').classList.remove("d-none");

  document.getElementById("vedio").innerHTML = ""
   document.getElementById('music').removeAttribute("onclick")
   document.getElementById('watermark').removeAttribute("onclick")
   document.getElementById('original').removeAttribute("onclick")
   document.getElementById("waiting").textContent = ''

   var progress = document.getElementById('progress')
   progress.classList.add("d-none");
   progress.setAttribute("style", "width:"+0+"%;");
   progress.innerHTML = 0+"%"
}
function validURL(string) {
  var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  return (res !== null)
}

function clearsection() {

  document.getElementById('waitinglogo').classList.add("d-none");

  document.getElementById('search').classList.remove("d-none");
  document.getElementById('result').classList.add("d-none");
  document.getElementById('text').classList.remove("d-none");

  document.getElementById("vedio").innerHTML = ""
   document.getElementById('music').removeAttribute("onclick")
   document.getElementById('watermark').removeAttribute("onclick")
   document.getElementById('original').removeAttribute("onclick")
   document.getElementById('urlinput').value = ''
   document.getElementById("waiting").textContent = ''

   var progress = document.getElementById('progress')
   progress.classList.add("d-none");
   progress.setAttribute("style", "width:"+0+"%;");
   progress.innerHTML = 0+"%"

   var newp = document.getElementById('newp')
  newp.classList.add("d-none");

  
}