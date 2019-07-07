const functions = require('firebase-functions')
const admin     = require('firebase-admin')


admin.initializeApp(functions.config().firebase)

exports.pushOnCreate = functions.database.ref('/eventos/{key}').onCreate(event => {
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

exports.pushOnDelete = functions.database.ref('/eventos/{key}').onDelete(event => {
  const dados = event._data.key.toString()
  var lista = []
  const payload = {
          notification: {
            title: "Bora?",
            body: 'Um evento em que você estava confirmado foi cancelado :('
          }
        }

  return admin.database().ref('/usuarios/').once('value',function(snapshot1){
          snapshot1.forEach(function(childSnapshot1){
            admin.database().ref('/usuarios/' + childSnapshot1.key + '/eventos/').once('value', function(snapshot2){
              snapshot2.forEach(function(childSnapshot2){
                if(childSnapshot2.key == dados && childSnapshot2.val() == true){
                  var teste = childSnapshot1.val().token;
                  admin.messaging().sendToDevice(teste, payload)
                        .then(function(response) {
                            console.log("Mensagem enviada com sucesso:");
                          })
                          .catch(function(error) {
                            console.log("Erro ao enviar mensagem:");
                          });
                  admin.database().ref('/usuarios/' + childSnapshot1.key + '/eventos/' + childSnapshot2.key).remove();
                }
              });
            });
          });
        });

});