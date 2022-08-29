import {
	Box,
	Grid,
	Button,
	TextField,
	ButtonGroup
} from '@mui/material';
import { useState } from "react";
import authState from "../recoil/atoms/authData";
import { useRecoilValue } from "recoil";
import axios from "axios";
import MovieCard from "./movieCart";
import { useQuery } from 'react-query';
import { Search } from '@mui/icons-material';
import { useForm } from 'react-hook-form';

const List = () => {
	const { account_id, session_id, api_key } = useRecoilValue(authState);
	const [movies, setMovies] = useState([]);
	let keyword = '';
	const [btnState, setBtnState] = useState({
		all: true,
		favorite: false,
		watchList: false,
	});


	const { refetch: getMovieList } = useQuery(
		'movieList',
		() => axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1`),
		{
			onSuccess: (response) => {
				console.log(response);
				setMovies(response.data.results)
			},

		},

	);

	const { refetch: getFavorite } = useQuery(
		'getFavoriteList',
		() => axios.get(`https://api.themoviedb.org/3/account/${account_id}/favorite/movies?api_key=${api_key}&session_id=${session_id}&language=en-US&sort_by=created_at.asc&page=1`),
		{
			onSuccess: (response) => {
				console.log(response);
				setMovies(response.data.results)
			},
			enabled: false,
		},
	);


	const { refetch: getWatchList } = useQuery(
		'getWatchList',
		() => axios.get(`https://api.themoviedb.org/3/account/${account_id}/watchlist/movies?api_key=${api_key}&session_id=${session_id}&language=en-US&sort_by=created_at.asc&page=1`),
		{
			onSuccess: (response) => {
				console.log(response);
				setMovies(response.data.results)
			},
			enabled: false,
		},
	);



	const changeBtnAndMovieList = function (btnType) {
		switch (btnType) {
			case 'favorite':
				setBtnState({
					all: false,
					favorite: true,
					watchList: false,
				});
				getFavorite();
				break;
			case 'watchList':
				setBtnState({
					all: false,
					favorite: false,
					watchList: true,
				});
				getWatchList();
				break;
			default:
				setBtnState({
					all: true,
					favorite: false,
					watchList: false,
				});
				getMovieList();
		}
	}

	const {
		register,
		getValues,
		formState: { errors },
	} = useForm();


	const { refetch } = useQuery(
		'searchList',
		() => axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${keyword}`),
		{
			onSuccess: (response) => {
				console.log(response);
				setMovies(response?.data?.results)
			},
			enabled: false,
		},
	);

	const handelSearch = function () {
		const data = getValues();
		keyword = data.search
		console.log(keyword);
		refetch();
	}



	return (
		<Box component={'section'} className={'containerFluid'} sx={{ flexGrow: 1, height: '100%' }}>
			<Grid component={'div'} container sx={{ height: '100%', marginTop: 5 }}>
				<Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginBottom: 5 }}>
					<Box component={'form'} onSubmit={e => { e.preventDefault(); }} sx={{ display: 'flex', justifyContent: 'center' }}>
						<Box
							sx={{
								width: 500,
								maxWidth: '100%',
								marginRight: 3
							}}
						>
							<TextField fullWidth label="search" {...register('search')} />
						</Box>
						<Button type={'button'} variant="contained" color="primary" onClick={handelSearch} >
							{'search'}
							<Search />
						</Button>
					</Box>
				</Grid>
				<Grid item xs={12} mb={6}>
					<ButtonGroup size="large" color={'primary'} variant="contained" aria-label="outlined button group">
						<Button type={'button'} onClick={() => changeBtnAndMovieList('all')} variant={btnState.all === true ? 'contained' : 'outlined '} >all</Button>
						<Button type={'button'} onClick={() => changeBtnAndMovieList('favorite')} variant={btnState.favorite === true ? 'contained' : 'outlined '}>favorite</Button>
						<Button type={'button'} onClick={() => changeBtnAndMovieList('watchList')} variant={btnState.watchList === true ? 'contained' : 'outlined '}>watch list</Button>
					</ButtonGroup>

				</Grid>

				{movies?.map((item) => <Grid key={item.id} item xs={3} sx={{ marginBottom: 4 }}>
					<MovieCard movieData={item} />
				</Grid>)}
			</Grid>
		</Box>
	);
}

export default List;