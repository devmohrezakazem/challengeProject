import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { List, Favorite } from '@mui/icons-material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Tooltip } from "@mui/material";
import { useMutation } from "react-query";
import axios from "axios";
import { useRecoilValue } from "recoil";
import authState from "../recoil/atoms/authData";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useState, forwardRef } from "react";



const ExpandMore = styled((props) => {
	const { expand, ...other } = props;
	return <IconButton {...other} />;
})(({ theme, expand }) => ({
	transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
	marginLeft: 'auto',
	transition: theme.transitions.create('transform', {
		duration: theme.transitions.duration.shortest,
	}),
}));

const MovieCard = function (props) {
	const { movieData } = props
	console.log(movieData)
	const { account_id, api_key, session_id } = useRecoilValue(authState);
	console.log({ account_id })

	function title(titleArg) {
		return (
			<Tooltip title={titleArg}>
				<Typography variant="body2">
					{`${titleArg.substring(0, 30)}...`}
				</Typography>
			</Tooltip>
		);
	}


	const Alert = forwardRef(function Alert(props, ref) {
		return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
	});

	const [open, setOpen] = useState(false);

	const handleClick = () => {
		setOpen(true);
	};

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	}

	const mutationWatchList = useMutation(
		(command) => axios.post(`https://api.themoviedb.org/3/account/${account_id}/watchlist?api_key=${api_key}&session_id=${session_id}`, command), {
		onSuccess: (response) => {
			console.log({ response });
			handleClick();
		},
	});


	const setWatchListMovie = function (dataArgument) {
		const { id: media_id } = dataArgument
		console.log({ media_id })
		const command = {
			media_type: "movie",
			media_id: media_id,
			watchlist: true
		};
		mutationWatchList.mutate(command);

	}


	const mutationFavorite = useMutation(
		(command) => axios.post(`https://api.themoviedb.org/3/account/${account_id}/favorite?api_key=${api_key}&session_id=${session_id}`, command), {
		onSuccess: (response) => {
			console.log({ response });
			handleClick();
		},
	});


	const setFavoriteMovie = function (dataArgument) {
		const { id: media_id } = dataArgument
		console.log({ media_id })
		const command = {
			media_type: "movie",
			media_id: media_id,
			favorite: true
		};
		mutationFavorite.mutate(command);

	}

	return (
		<>
			<Card sx={{ maxWidth: 345 }}>
				<CardHeader
					avatar={
						<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
							R
						</Avatar>
					}
					action={
						<IconButton aria-label="settings">
							<MoreVertIcon />
						</IconButton>
					}
					title={title(movieData.original_title)}

					subheader={movieData.release_date}
				/>
				<CardMedia
					component="img"
					height="194"
					image={`https://image.tmdb.org/t/p/original${movieData.poster_path}`}
					alt="Paella dish"
				/>
				<CardContent>
					<Typography variant="body2" color="text.secondary">
						{`${movieData.overview.substring(0, 220)}...`}
					</Typography>
				</CardContent>
				<CardActions disableSpacing>
					<Tooltip title={'add to favorites'}>
						<IconButton aria-label="add to favorites" onClick={() => setFavoriteMovie(movieData)}>
							<Favorite />
						</IconButton>
					</Tooltip>
					<Tooltip title={'add to Watch list'}>
						<IconButton aria-label="add to Watch list" onClick={() => setWatchListMovie(movieData)}>
							<List />
						</IconButton>
					</Tooltip>
				</CardActions>
			</Card>
			<Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
				<Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
					Action is a successfull!
				</Alert>
			</Snackbar>
		</>
	);
}
export default MovieCard;