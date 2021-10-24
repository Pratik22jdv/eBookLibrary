

import React, { useState, useEffect, useContext } from 'react';
import { getProducts } from '../apiCalls';
import Card from './Card';
import { AuthContext } from '../context/AuthContext';
import { read } from '../apiCalls';

const MyBooks = () => {
	const myBooks = [];
	//const [productsByArrival, setProductsByArrival] = useState([]);
	const [error, setError] = useState([]);
	const { user } = useContext(AuthContext);

	const userBooks = user.borrowedBooks;
	const loadProductsBySell = async () => {
		for (let i = 0; i < userBooks.length; i++) {
			await read(userBooks[i]).then((data) => {
				myBooks.push(data);
				// return data;
			});
		}
		// console.log('1', myBooks);
		// console.log('2', myBooks.length);
	};
	// console.log("userBooks", userBooks);

	useEffect(() => {
		loadProductsBySell();
		// console.log(productsBySell);
	});

	const someFunction = () => {
		userBooks.map((bookID, index) => {
			read(userBooks[index])
				.then((bookData) => {
					const { name } = bookData;
					return (
						<div key={bookID}>
							what the heck is wrong with you!!!!   print something
							{console.log('book, index=', bookData, index)}
							{console.log('book name=>', name)}
							hii
							fucking print something
							<Card product={bookData} />
							<h1>{name}</h1><br />
						</div>
					)
				})
		})
	}

	return (
		<div>
			the hell print somthing
			<div className='row'>
				<div className='col-md-1'></div>
				<div className='col-md-10'>

					<div className='mb-2 mt-4'>Borrowed Books</div>

					<div className='row'>
						{/* {console.log("myBooks", myBooks)} */}
						{/* {myBooks.map((book) => {
							const { id } = book;
							console.log("book", book)
							return (
								<div key={id} className='col-xl-4 col-lg-6 col-md-6 col-sm-12'>
									hii
									<Card product={book} />
								</div>
							)
						})} */}
						{
							someFunction()
						}
					</div>
				</div>
				<div className='col-md-1'></div>
			</div>
		</div >
	);
};

export default MyBooks;
