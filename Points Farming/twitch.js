let clinetId = "hettvucc1zz50ra4jztvgx6dpjof4j";
let clinetSecret = "jgogbcveyncsz08eu95ufnbd11ilvz";



function getTwitchAuthorization() {
    let url = `https://id.twitch.tv/oauth2/token?client_id=${clinetId}&client_secret=${clinetSecret}&grant_type=client_credentials`;

    return fetch(url, {
    method: "POST",
    })
    .then((res) => res.json())
    .then((data) => {
        return data;
    });
}

async function getStreams() {
    const endpoint = "https://api.twitch.tv/helix/streams/?user_login=JUJALAG&user_login=elxokas&user_login=alexelcapo&user_login=alfreditogames&user_login=briiendirecto&user_login=navajacrimen&user_login=elvirayuki&user_login=illojuan&user_login=yointerneto&user_login=jugandoconnatalia&user_login=el_yuste&user_login=ibai&user_login=soyfelipez360&user_login=slakun10&user_login=dinossindgeil&user_login=BarbaKahn&user_login=resenascortas";

    let authorizationObject = await getTwitchAuthorization();
    let { access_token, expires_in, token_type } = authorizationObject;

    token_type =
    token_type.substring(0, 1).toUpperCase() +
    token_type.substring(1, token_type.length);

    let authorization = `${token_type} ${access_token}`;

    let headers = {
    authorization,
    "Client-Id": clinetId,
    };
    fetch(endpoint, {
    headers,
    })
    .then((res) => res.json())
    .then((data) => renderStreams(data));
}

let ventana =  {}

function renderStreams(data) {

    for (let index = 0; index < data.data.length; index++) {
        console.log(data.data[index]['user_name']);
        let usuario = data.data[index]['user_name'];
        if (!ventana.hasOwnProperty(usuario)){
            ventana[data.data[index]['user_name']] = window.open('https://www.twitch.tv/'+usuario, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
        }
    }
    console.log(ventana);

}


setInterval(myTimer, 180000);

function myTimer() {
    getStreams();
}

document.addEventListener("DOMContentLoaded", function(event) {
    getStreams();
});