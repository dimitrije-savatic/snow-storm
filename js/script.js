// Navbar animation
window.addEventListener('scroll', () => {
  document
    .querySelector('.navbar')
    .classList.toggle('scrolled', window.scrollY > 5);
});

// Burger
// function() === () =>
const burger = document.querySelector('.navbar__burger');
const alterNav = document.querySelector('.alter-nav');

burger.addEventListener('click', () => {
  alterNav.classList.toggle('clicked');
});

burger.addEventListener('click', function () {
  this.classList.toggle('clicked');
});

alterNav.addEventListener('click', () => {
  alterNav.classList.remove('clicked');
  burger.classList.remove('clicked');
});

// Navbar progress bar
window.onscroll = () => {
  progressBar();
};

const progressBar = () => {
  const winScroll = document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const pageScrolled = (winScroll / height) * 100;
  document.querySelector('.navbar__progress').style.width = pageScrolled + '%';
};

// Mousey
window.addEventListener('scroll', () => {
  document
    .querySelector('.hero__scroll-downs')
    .classList.toggle('scrolled', window.scrollY > 5);
});

// Product items
const jackets = [
  {
    id: 1,
    title: 'Dark Blue Jacket',
    price: 1350,
    img: './images/about.jpg',
    inCart: 0,
  },
  {
    id: 2,
    title: 'Orange Jacket',
    price: 720,
    img: './images/orange-jacket.jpg',
    inCart: 0,
  },
  {
    id: 3,
    title: 'Brown Jacket',
    price: 2120,
    img: './images/brown-jacket.jpg',
    inCart: 0,
  },
  {
    id: 4,
    title: 'White Jacket',
    price: 970,
    img: './images/white-jacket.jpg',
    inCart: 0,
  },
  {
    id: 5,
    title: 'Red Jacket',
    price: 250,
    img: './images/red-jacket.jpg',
    inCart: 0,
  },
  {
    id: 6,
    title: 'Gray Jacket',
    price: 600,
    img: './images/gray-jacket.jpg',
    inCart: 0,
  },
];


const container = document.getElementById('productsContainer');

jackets.forEach((jacket, id) => {
  // Construct card content
  const card = `
    <div :key="${id}" class="products__card">
        <img class="products__card-image" src="${jacket.img}" alt="our product">
        <h3 class="products__card-title">${jacket.title}</h3>
        <p class="products__card-desc">$ ${jacket.price}</p>
        <a class="products__card-btn">Add to cart &#10596;</a>
    </div>
  `;

  // Append newyly created card element to the container
  container != null ? container.innerHTML += card : null
});

// Back to top arrow
window.addEventListener('scroll', () => {
  document
    .querySelector('.back-arrow')
    .classList.toggle('show', window.scrollY > 600);
});

const toTop = () => {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
};

// Contact Check

function contactCheck(){
  var objName, objEmail, objMessage, objPhone;

  objName = document.querySelector('#name');
  objEmail = document.querySelector('#email');
  objMessage = document.querySelector('#message');
  objPhone = document.querySelector('#phone');
  var brojGresaka = 0;

  // Name check

  if(objName.value.length < 3){
    objName.nextElementSibling.classList.add("success");
    brojGresaka++;
    ResetForm();
    document.querySelector("#success").innerHTML = "";
}
else{
    objName.nextElementSibling.classList.remove("success");
}


  //  Email check

  var emailValue = objEmail.value;
  if(emailValue.indexOf('@') == -1){
    objEmail.nextElementSibling.classList.add("success");
    brojGresaka++;
    ResetForm();
    document.querySelector("#success").innerHTML = "";
}
  else{
    objEmail.nextElementSibling.classList.remove("success");
}

  // Message check

if(objMessage.value.length < 5){
    objMessage.nextElementSibling.classList.add("success");
    brojGresaka++;
    ResetForm();
    document.querySelector("#success").innerHTML = "";
}
else{
    objMessage.nextElementSibling.classList.remove("success");
}
if(brojGresaka == 0){
  document.querySelector("#success").innerHTML = "<p>Message has been successfuly sent.</p>";
}
ResetForm();
}

function ResetForm(){
  document.getElementById("form").reset();
}