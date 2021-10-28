import React, { useState, useContext } from 'react'
import { useLocation } from "react-router-dom"
import { Worker, Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core';
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
// import { AuthContext } from '../context/AuthContext';
import Card from '../components/Card';
import pdf_file1 from "./Book_PDF/Harry Potter and the Philosophers Stone.pdf";
import pdf_file2 from "./Book_PDF/Harry Potter and Chamber of Secrets.pdf"
import pdf_file3 from './Book_PDF/Core Python Programming.pdf'
import pdf_file4 from './Book_PDF/JavaScript and HTML5 Now.pdf'
import pdf_file5 from './Book_PDF/PYTHON PROGRAMMING.pdf'
import pdf_file6 from './Book_PDF/CPP PROGRAMMING.pdf'
import pdf_file7 from './Book_PDF/Thomas Calculus 14th Edition.pdf'
import pdf_file8 from './Book_PDF/Basic Probability What Every Math Student Should Know Kindle.pdf'
import pdf_file9 from './Book_PDF/Shivaji- The Great Maratha.pdf'
import pdf_file10 from './Book_PDF/The Art of War.pdf'

const PdfViewer = () => {

	const BookOpen = JSON.parse(localStorage.getItem('userBookOpen'))
	console.log(BookOpen);

	const BookName = BookOpen.name;
	let BookLink;
	switch (BookName) {
		case "Harry Potter and the Philosophers Stone":
			BookLink = pdf_file1;
			break;
		case "Harry Potter and Chamber of Secrets":
			BookLink = pdf_file2;
			break;
		case "Core Python Programming":
			BookLink = pdf_file3;
			break;
		case "JavaScript and HTML5 Now":
			BookLink = pdf_file4;
			break;
		case "PYTHON PROGRAMMING":
			BookLink = pdf_file5;
			break;
		case "C++ PROGRAMMING and STL":
			BookLink = pdf_file6;
			break;
		case "Thomas' Calculus 14th Edition":
			BookLink = pdf_file7;
			break;
		case "Basic Probability: What Every Math Student Should Know Kindle":
			BookLink = pdf_file8;
			break;
		case "Shivaji- The Great Maratha":
			BookLink = pdf_file9;
			break;
		case "The Art of War":
			BookLink = pdf_file10;
			break;
		default:
			console.log('book name incorrect');
			break;
	}

	return (<>
		<Card product={BookOpen} showViewProductButton={false} />
		<div></div>
		{BookLink && <><Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
			<div className="mx-auto d-block"
				style={{
					border: '1px solid rgba(0, 0, 0, 0.3)',
					height: '70vh',
					width: '70%'
				}}
			>
				<Viewer fileUrl={BookLink} />
			</div>
		</Worker></>}

	</>)
}

export default PdfViewer;
