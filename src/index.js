let c = document.querySelector('canvas');
let ctx = c.getContext('2d');
let R, G, B;
let database, authPromise;

function random_rgba() {
  var o = Math.round,
    r = Math.random,
    s = 255;
  return [o(r() * s), o(r() * s), o(r() * s)];
}

function pickColor() {
  [R, G, B] = random_rgba();
  ctx.fillStyle = `rgb(${R}, ${G}, ${B})`;
  ctx.fillRect(0, 0, c.width, c.height);
}

async function handleButtonClick(e) {
  const label = e.target.innerHTML;
  console.log(e.target.innerHTML);

  let { user } = await authPromise;
  let colorDB = database.ref('colors');

  let data = {
    uid: user.uid,
    r: R,
    g: G,
    b: B,
    label,
  };

  let color = colorDB.push(data, err => {
    if (err) {
      console.error(err);
    } else {
      console.log('color saved');
    }
  });

  console.log(`firebase generated key: ${color.key}`);
  pickColor();
}
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBHoRZ4bEWuK01X5dk2clicBH272FFhynM',
  authDomain: 'color-classfication-7f743.firebaseapp.com',
  databaseURL: 'https://color-classfication-7f743.firebaseio.com',
  projectId: 'color-classfication-7f743',
  storageBucket: 'color-classfication-7f743.appspot.com',
  messagingSenderId: '809556360024',
  appId: '1:809556360024:web:f0f2f7fa1e0e962e',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
database = firebase.database();
authPromise = firebase.auth().signInAnonymously();

pickColor();
const buttons = document.querySelectorAll('button');

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', handleButtonClick);
}
