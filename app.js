
//  Definir le pseudo  //
let User = {
    set_pseudo: function(value){
        var champ = document.getElementById('input--pseudo');
        
        document.getElementById('display-pseudo').innerHTML = "Bonjour " + value + " !"
        champ.style.backgroundColor = "transparent";


        }
}

document.getElementById('button--submit-pseudo-connected').addEventListener('click', function(){
    User.set_pseudo(document.getElementById('input--pseudo').value)
})

//  Envoyer un message  //
let Message = {
    create_message: function(name){
        let item = document.createElement('li');
        let date = document.createElement('p');
       // let insultes = "merde|enculé|fils de pute|connard|conard|batard|putin|pute|enfoiré|enfoire|connasse|salope|salaud|couilles|couille|bite|chier|con|conne|crevure|du con|garce|cul"

        // Contenu du message
        item.textContent = name;
        item.className = 'item-message'
        document.getElementById('step-message-list').appendChild(item)
        document.getElementById('input--message').value = ''

        item.scrollIntoView({
            block: 'start',
            behavior: 'smooth'
        });



        //  Remplacer les insultes par des caractères spéciaux de façon aléatoire //
        if(name == "merde" | name == "enculé" | name == "fdp" | name == "connard" | name == "batard" | name == "pute" | name == "enfoiré" | name == "connasse" | name == "salope" | name == "con"){
            var text = "";
            var possible = "!§:/.,?&'({[-|`_ç^@=}+*";

            for (var i = 0; i < 5; i++){
                item.textContent = text += possible.charAt(Math.floor(Math.random() * possible.length));;
            }

        } else {
            item.textContent = name;
        }

        // Afficher l'heure du message
        var chatGetDate = new Date();
        var chatGetHour = chatGetDate.getHours();
        var chatGetMinutes = chatGetDate.getMinutes();

        date.textContent = "Envoyé à " + chatGetHour + ":" + chatGetMinutes,
        date.className = 'message-hour'
        item.appendChild(date)

        
    }
}
document.getElementById('button--submit-message').addEventListener('click', function(){
    Message.create_message(document.getElementById('input--message').value)
})


//  Permettre à l'utilisateur de changer la couleur et la taille de ses messages  //
let Properties = {
    change_color: function(color){
        var message = document.getElementsByClassName('item-message');

        for (var i = 0; i < message.length; i++) {
            message[i].style.backgroundColor = color;
        }

    },
    change_size: function(size){
        var myMessage = document.getElementsByClassName('item-message');

        for (var i = 0; i < myMessage.length; i++) {
            myMessage[i].style.fontSize = size;
        }
    }
}
document.getElementById('button--change-color').addEventListener('click',function(){
    Properties.change_color(document.getElementById('input--change-color').value)
})
document.getElementById('button--change-size').addEventListener('click',function(){
    Properties.change_size(document.getElementById('select--change-size').value)
})

let Helpers = {
    //  Pouvoir quitter le chat en se deconnectant sans quitter la page  //
    connect: function(status){
        var area = document.getElementById('chat-area')

        area.classList.remove(status)
        area.classList.add('connected')
    },

    deconnect: function(status){
        var area = document.getElementById('chat-area')
        area.classList.remove(status)
        area.classList.add('disconnected')
    }

}
document.getElementById('button--submit-pseudo-connected').addEventListener('click', function(){
    Helpers.connect('disconnected')
})
document.getElementById('button--chat-disconnect').addEventListener('click', function(){
    Helpers.deconnect('connected')
})


//  Affichage de la date et de l'heure actuelles  //
function displayDate(){
    var tempsCourant = document.getElementById('display-date');
    var d = new Date();
    tempsCourant.innerHTML = 'Nous sommes le ' + d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear() + ' et il est ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
}
displayDate();
setInterval(displayDate, 1000);


// Pouvoir recevoir des messages
var url = "https://todo.ezze-indev.com/"
var xhttp = new XMLHttpRequest();


// recuperer contenu
xhttp.onreadystatechange = function() {
      // lire contenu
    if (this.readyState == 4 && this.status == 200) {
        //console.log(xhttp.responseText);
        var data = JSON.parse(xhttp.responseText);

        var content = "";

        // Afficher l'heure du message
        var chatGetDate = new Date();
        var chatGetHour = chatGetDate.getHours();
        var chatGetMinutes = chatGetDate.getMinutes();


        // boucle
        for (const key of Object.keys(data)) {
            content += "<li class='first-message'>" + "<i class='user-message'> Par "+ data[key].user +"</i>" + data[key].name + "<p class='message-hour'>" + "Reçu à " + chatGetHour + ":" + chatGetMinutes + "</p>" + "</li>"
        }

        document.getElementById("step-message-list").innerHTML = content;
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();


function verifierCaracteres(event) {
	 		
	var keyCode = event.which ? event.which : event.keyCode;
	var touche = String.fromCharCode(keyCode);
			
	var champ = document.getElementById('input--pseudo');
			
	var caracteres = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
			
	if(caracteres.indexOf(touche) >= 0) {
        champ.value += touche;
        champ.style.backgroundColor = "transparent";
	} else {
        champ.style.backgroundColor = "red";
    }
			
}