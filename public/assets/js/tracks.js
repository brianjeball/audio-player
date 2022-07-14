
import deep from '../../../pages//assets/deep.mp3';
import war from '../../../pages/assets/war.mp3';
import imgSrc from '../../../pages/assets/bigwin-logo.png'
import toliver from '../../../pages/assets/toliver.jpeg'
import mindsetCover from '../../../pages/assets/mindset.png'
import mindset from '../../../pages/assets/mindset1.mp3';

const tracks = [
  {
    title: "Mindset",
    artist: "Carol Dweck",
    audioSrc: mindset,
    chapter: 'Chapter 1',
    coverArt: mindsetCover,
  },
  {
    title: "War",
    artist: "Jarrell Brain",
    audioSrc: war,
    coverArt: imgSrc,
  },
  {
    title: "50",
    artist: "Don Toliver",
    audioSrc: deep,
    coverArt: toliver,
  },
  {
    title: "50",
    artist: "Something",
    audioSrc: 'https://mailboxdrive.com/mp3s/20339/#:~:text=Direct%20Link%3A-,here,-Play%20Time%3A%201',
    coverArt: deep,
  },
];
// All of these artists are at https://pixabay.com/music/search/mood/laid%20back/

export default tracks;