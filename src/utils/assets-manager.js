import Movie from "../models/Movie";
//
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

// icons
export const iconBrokenImage = '/images/icons/broken_image_black_24dp.svg';
// export const iconNotificationNone = '/images/icons/notifications_none_white_24dp.svg';
// export const iconHome = '/images/icons/home_white_24dp.svg';
// export const iconMovie = '/images/icons/theaters_white_24dp.svg';
// export const iconSearch = '/images/icons/search_white_24dp.svg';
// material ui icons
export const IconBrokenImage = BrokenImageIcon;
export const IconNotificationNone = NotificationsNoneIcon;
export const IconBack = ArrowBackIcon;
export const IconHome = HomeIcon;
export const IconMovie = LocalMoviesIcon;
export const IconSearch = SearchIcon;
export const IconClear = ClearIcon;
export const IconPerson = PersonIcon;
export const IconLogout = LogoutIcon;


// colors
export const colorPrimaryBlue = '#015896';
export const colorPrimaryDarkBlue = '#004678';
export const colorPrimaryLightBlue = '#B2CCDF';
export const colorPrimaryYellow= '#fed23f';


// strings
export const stringAppName = 'Cinemates';
export const stringTitleMissing = '(no title)';
export const stringTitleUpcoming = 'Upcoming';
export const stringTitleNowPlaying = 'Now playing';
export const stringTitlePopular = 'Popular';
export const stringLabelSeeAll = 'See all';
export const stringMovieDuration = 'Duration';
export const stringMovieGenres = 'Genres';
export const stringMovieStatus = 'Status';
export const stringLabelSearch = 'results for:  ';
export const stringLabelSearchNoResults = 'no results for:  ';
export const stringPlaceholderSearch = 'search...';
export const stringLabelLoading = 'loading...';


// paths
export const pathRoot = '/';
export const pathFeedsPage = '/feeds';
export const pathExplorePage = '/explore';
export const pathSearchPage = '/search';
export const pathSinUpPage = '/signup';
export const pathLoginPage = '/login';
export const pathProfilePage = '/profile';
export const pathNotificationPage = '/notification';
export const pathMovieInfoPageWithId = '/movie/:id';
export const pathMovieInfoPage = '/movie';
export const pathExploreList = '/explore-list';
export const pathTest = '/test';
export const pathAny = '*';
export const pathPlayground = '/playground';


// images
export const imageExtendedLogoNoLights = '/images/cinemates_logo_extended_nolights_2.png';
export const imageProfilePictureTest = '/images/profile-picture.jpg';




// icons as react components
// import { ReactComponent as MovieIcon } from '../../reusable/Icons/theaters_white_24dp.svg';
// import { ReactComponent as HomeIcon } from '../../reusable/Icons/home_white_24dp.svg';
// import { ReactComponent as SearchIcon } from '../../reusable/Icons/search_white_24dp.svg';
// export const ComponentIconHome = HomeIcon;


// test movie poster images
export const moviePoster_1 = 'https://www.themoviedb.org/t/p/w1280/bcCBq9N1EMo3daNIjWJ8kYvrQm6.jpg';
export const moviePoster_2 = 'https://www.themoviedb.org/t/p/w1280/bQnnKBe3VsvXKMoNCaYmRzs1Dup.jpg';
export const moviePoster_3 = 'https://www.themoviedb.org/t/p/w1280/jzpvh0Ic7jL9GX4NLE1Tx2GUCrN.jpg';
export const moviePoster_4 = 'https://www.themoviedb.org/t/p/w1280/z42kyMizgDKetejusZgucSQsQ4l.jpg';
export const moviePoster_5 = 'https://www.themoviedb.org/t/p/w1280/pWHf4khOloNVfCxscsXFj3jj6gP.jpg';
export const moviePoster_6 = 'https://www.themoviedb.org/t/p/w1280/odVv1sqVs0KxBXiA8bhIBlPgalx.jpg';
export const moviePoster_7 = 'https://www.themoviedb.org/t/p/w1280/ugIdyvtAzHWOguD91UjHKoAvfum.jpg';
export const moviePoster_8 = 'https://www.themoviedb.org/t/p/w1280/8c4a8kE7PizaGQQnditMmI1xbRp.jpg';
export const moviePoster_9 = 'https://www.themoviedb.org/t/p/w1280/lAXONuqg41NwUMuzMiFvicDET9Y.jpg';
export const moviePoster_10 = 'https://www.themoviedb.org/t/p/w1280/qAZ0pzat24kLdO3o8ejmbLxyOac.jpg';
export const moviePoster_11 = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/11keFudto4QrgrXChukexJwdHPe.jpg';

//
export const testMovie = new Movie(
    414906,
    'The Batman'
    ,'https://www.themoviedb.org/t/p/w1280/5P8SmMzSNYikXpxil6BYzJ16611.jpg',
    'In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing a serial killer known as the Riddler.',
    '2022-03-03'
)