const functions = require('firebase-functions')
const admin     = require('firebase-admin')


admin.initializeApp(functions.config().firebase)

exports.sendPushNotification = functions.database.ref('/eventos/{key}').onCreate(event => {
  const dados = event._path.toString()
  var lista = []
  const payload = {
          notification: {
            title: "Bora?",
            body: 'Novo evento do seu interesse disponivel!'
          }
        }

  return admin.database().ref(dados + '/categorias/').once('value', function(snapshot1){
      snapshot1.forEach(function(childSnapshot1){
        if(childSnapshot1.val() == true){
          admin.database().ref('/usuarios/').once('value', function(snapshot2){
            snapshot2.forEach(function(childSnapshot2){
              admin.database().ref('/usuarios/' + childSnapshot2.key + '/interesses/').once('value', function(snapshot3){
                snapshot3.forEach(function(childSnapshot3){
                  if(childSnapshot3.key == childSnapshot1.key && childSnapshot3.val() == true){
                    var i;
                    var aux = false;
                    var teste = null;
                    for(i = 0; i < lista.length; i++){
                      if(lista[i] == childSnapshot2.val().token){
                        aux = true;
                        break;
                      }
                    }
                    if(aux == false){
                      lista.push(childSnapshot2.val().token);
                      teste = childSnapshot2.val().token;
                      admin.messaging().sendToDevice(teste, payload)
                        .then(function(response) {
                            console.log("Mensagem enviada com sucesso:");
                          })
                          .catch(function(error) {
                            console.log("Erro ao enviar mensagem:");
                          });
                    }
                  }
                });
              });
            });
            });
        }
      })
    })

});