function showCookiesForTab(tabs) {
  //get the first tab object in the array
  let tab = tabs.pop();

  //get all cookies in the domain
  var gettingAllCookies = browser.cookies.getAll({url: tab.url});
  gettingAllCookies.then((cookies) => {

    //set the header of the panel
    var activeTabUrl = document.getElementById('header-title');
    var text = document.createTextNode("Cookies OWASP Test For: "+tab.title);
    var cookieList = document.getElementById('cookie-list');
    activeTabUrl.appendChild(text);

    if (cookies.length > 0) {
      //loop starts here 
      for (let cookie of cookies) {
        //creating a row
           var y = document.createElement("TR");
           var name = cookie.name
           y.setAttribute("id", name);
           document.getElementById("ctab").appendChild(y);
           var z = document.createElement("TD");
           var t = document.createTextNode(name);
           z.appendChild(t);
           document.getElementById(name).appendChild(z);      
       //checking httponly attribute
	         if(cookie.httpOnly == true){
                 //adding td to the row
                  var a = cookie.httpOnly
                  var z = document.createElement("TD");
                  var t = document.createTextNode(cookie.httpOnly);
                  z.setAttribute("class","green")
                  z.appendChild(t);
                  document.getElementById(name).appendChild(z);
                  
           }else{
                  var z = document.createElement("TD");
                  var t = document.createTextNode(cookie.httpOnly);
                  z.setAttribute("class","red")
                  z.appendChild(t);
                  document.getElementById(name).appendChild(z);

          }
          //to check secure flag attribute
          if(cookie.secure == true){
                  var z = document.createElement("TD");
                  var t = document.createTextNode(cookie.secure);
                  z.setAttribute("class","green")
                  z.appendChild(t);
                  document.getElementById(name).appendChild(z);
                  
           }else{
                  var z = document.createElement("TD");
                  var t = document.createTextNode(cookie.secure);
                  z.setAttribute("class","red")
                  z.appendChild(t);
                  document.getElementById(name).appendChild(z);
            }
            // checking path attribute
            if(cookie.path != null){
              var z = document.createElement("TD");
                  var t = document.createTextNode(cookie.path);
                  
                  z.appendChild(t);
                  document.getElementById(name).appendChild(z);
             }
             //checking exipration date
             if(cookie.expirationDate != null){
              var z = document.createElement("TD");
                  var t = document.createTextNode(cookie.expirationDate);
                  
                  z.appendChild(t);
                  document.getElementById(name).appendChild(z);
             }else{
              var z = document.createElement("TD");
              var t = document.createTextNode(cookie.expirationDate);
              
              z.appendChild(t);
              document.getElementById(name).appendChild(z);
             }
      }
    } else {
      let p = document.createElement("p");
      let content = document.createTextNode("No cookies in this tab.");
      let parent = cookieList.parentNode;

      p.appendChild(content);
      parent.appendChild(p);
    }
  });
}

//get active tab to run an callback function.
//it sends to our callback an array of tab objects
function getActiveTab() {
  return browser.tabs.query({currentWindow: true, active: true});
}
getActiveTab().then(showCookiesForTab);




