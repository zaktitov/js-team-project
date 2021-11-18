import teamCardsTpl from '../templates/team-template.hbs';
import students from '../team.json';
import { refs } from './refs.js';
const { teamList } = refs;

import zakhar from '../images/team/zakhar.jpg';
import dimaL from '../images/team/dima-l.jpg';
import sasha from '../images/team/sasha.jpg';
import lena from '../images/team/lena.jpg';
import pasha from '../images/team/pavlo.jpg';
import dimaS from '../images/team/dima-sh.jpg';
import yulia from '../images/team/yulia-n.jpg';

const teamArrImg = [zakhar, dimaL, sasha, lena, pasha, dimaS, yulia];

import zak from '../images/team/zak.svg';
import dimali from '../images/team/dimali.svg';
import sawa from '../images/team/sawa.svg';
import lenax from '../images/team/lenax.svg';
import pol from '../images/team/pol.svg';
import dimaso from '../images/team/dimaso.svg';
import jula from '../images/team/jula.svg';

const gitHubIconCat = [zak, dimali, sawa, lenax, pol, dimaso, jula];

students.forEach(student => {
  teamArrImg.forEach((el, idx) => {
    if (student.id === idx) {
      student.image = el;
    }
  });
  gitHubIconCat.forEach((el, idx) => {
    if (student.id === idx) {
      student.icon = el;
    }
  });
});

export default function appendTeamCardsMarkup(students) {
  teamList.innerHTML = teamCardsTpl(students);
}
