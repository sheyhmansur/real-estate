import favouritesCards from './../favouritesCard/favouritesCardsController';

export default function() {
    document.querySelector('#app').innerHTML = '';
    favouritesCards(state);
}