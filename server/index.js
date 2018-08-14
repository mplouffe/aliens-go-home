const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const client = jwksClient({
    jwksUri: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/.well-known/jwks.json`
});

const players = [
    {id: 'd4', maxScore: 82, name: 'Charles Babbage', picture: 'http://www.timelineindex.com/imagesThumb/255_1584.png'},
    {id: 'a1', maxScore: 235, name: 'Konrad Zuse', picture: 'https://3.bp.blogspot.com/-new25rlWNwo/U8MSEr_ZXhI/AAAAAAAAGRE/raJqSeYpYnU/s60-c/Heinrich+Focke.png'},
    {id: 'c3', maxScore: 99, name: 'Kurt Godel', picture: 'https://www.computerhope.com/cdn/people/kurt_godel.jpg'},
    {id: 'b2', maxScore: 129, name: 'J. Presper Eckert', picture: 'https://www.computerhope.com/cdn/people/allen_dumont.jpg'},
    {id: 'e5', maxScore:34, name: 'Robert Noyce', picture: 'https://dgalywyr863hv.cloudfront.net/pictures/clubs/21145/453306/2/medium.jpg'},
    {id: 'f6', maxScore: 153, name: 'Alan Turing', picture: 'https://cbsnews3.cbsistatic.com/hub/i/r/2011/02/19/33f579f5-a644-11e2-a3f0-029118418759/thumbnail/60x60/33b306e9baafb6ee4fdad431577cfca4/turing.jpg'},
    {id: 'g7', maxScore: 55, name: 'Steve Jobs', picture: 'https://cbsnews2.cbsistatic.com/hub/i/r/2011/10/06/957adcbf-a644-11e2-a3f0-029118418759/thumbnail/60x60/88a90eba2169e457b525af9efcda9fb0/frontstevejobs_1.jpg'},
    {id: 'h8', maxScore: 146, name: 'Bill Gates', picture: 'https://lh3.googleusercontent.com/-29JO1Z-O2RA/AAAAAAAAAAI/AAAAAAAAABg/AGwh8f0ULIg/s60-p-no-il/photo.jpg'}
];

const verifyPlayer = (token, cb) => {
    const uncheckedToken = jwt.decode(token, {complete: true});
    const kid = uncheckedToken.header.kid;

    client.getSigningKey(kid, (err, key) => {
        const signingKey = key.publicKey || key.rsaPublicKey;
        jwt.verify(token, signingKey, cb);
    });
};

const newMaxScoreHandler = payload => {
    let foundPlayer = false;
    players.forEach(player => {
        if (player.id === payload.id) {
            foundPlayer = true;
            player.maxScore = Math.max(palyer.maxScore, payload.maxScore);
        }
    });

    if (!foundPlayer) {
        players.push(payload);
    }

    io.emit('players', players);
};

io.on('connection', socket => {
    const { token } = socket.handshake.query;

    verifyPlayer(token, err => {
        if (err) {
            socket.disconnect();
        }

        io.emit('players', players);
    });

    socket.on('new-max-score', newMaxScoreHandler);
});

const PORT = process.env.PORT || 3001;
http.listen(PORT, () => {
    console.log(`listening on port {PORT}`);
});