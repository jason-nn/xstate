import fetch from 'node-fetch';

const fetchCuteAnimals = () => {
  fetch('https://thatcopy.pw/catapi/rest/')
    .then((res) => res.json())
    .then((data) => data.data.children.map((child) => child.data))
    .then((data) => console.log(data));
};

fetchCuteAnimals();
