import React, { useState, useEffect, useContext } from 'react';
//import Layout from './Layout';
import { userBooks } from '../apiCalls';
import Card from './Card';
import { AuthContext } from '../context/AuthContext';
import Menu from './Menu';
import { Button } from '@material-ui/core';
// import { Link } from '@material-ui/core';
import { Link } from 'react-router-dom';
//import Search from './Search';
//import 'fontsource-roboto';
//import Copyright from './Copyright';

const Books = () => {
	const [myBooks, setMyBooks] = useState([]);
	const { user } = useContext(AuthContext);
	const [BookOpen, setBookOpen] = useState({})


	//const [productsByArrival, setProductsByArrival] = useState([]);
	//const [error, setError] = useState([]);

	const loadMyBooks = () => {
		userBooks(user._id).then((data) => {
			setMyBooks(data);
			console.log(user);

		});
	};

	useEffect(() => {
		loadMyBooks();
	}, []);
	const saveBookOpenToLocal = () => {

	}
	return (
		<div>
			<Menu />
			<div className='row' style={{ paddingTop: "20px" }}>
				<div className='col-md-1'></div>
				<div className='col-md-10'>
					<h2 className='mb-2 mt-4'>Purchased Books</h2>
					<div className='row'>
						{myBooks.map((product, i) => (
							<div key={i} className='col-xl-4 col-lg-6 col-md-6 col-sm-12'>
								{/* <Button onClick={setBookOpen("xyz")}> */}
								<Card product={product} showReadButton={true} showViewProductButton={false} showReturnButton={true}/>

								
							</div>
						))}
					</div>
				</div>
				<div className='col-md-1'></div>
			</div>
		</div >
	);
};

export default Books;
