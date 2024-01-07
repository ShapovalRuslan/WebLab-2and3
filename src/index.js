import './index.html';
import './job.html';
import './contact.html';
import './zvo.html';
import './aboutme.html';
import './index.scss';


var Mobile = require('./modules/menu');

const menuBtn = document.querySelector('#menu-btn');
const navbar = document.querySelector('.header .navbar');

Mobile(menuBtn, navbar);