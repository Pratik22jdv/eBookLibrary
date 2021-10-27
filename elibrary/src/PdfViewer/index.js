import React, { useState, useContext } from 'react'
import { useLocation } from "react-router-dom"
import { Worker, Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core';
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import { AuthContext } from '../context/AuthContext';
import pdf_file from "./Book_PDF/Harry Potter and the Philosopher's Stone.pdf";
import pdf_file2 from "./Book_PDF/Harry Potter and Chamber of Secrets.pdf"
import pdf_file3 from './Book_PDF/Core Python Programming.pdf'
import pdf_file4 from './Book_PDF/JavaScript and HTML5 Now.pdf'
const PdfViewer = () => {

	const BookOpen = JSON.parse(localStorage.getItem('userBookOpen'))
	console.log(BookOpen);

	const BookName = BookOpen.name;
	let BookLink;
	switch (BookName) {
		case "Harry Potter and the Philosopher's Stone":
			BookLink = pdf_file;
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
		default:
			console.log('book name incorrect');
			break;
	}

	return (<>
		{pdf_file && <><Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
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
