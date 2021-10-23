import React, { useState } from 'react'
import { useLocation } from "react-router-dom"
import { Worker, Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core';
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';

import pdf_file from './Book_PDF/Girl in Room 105.pdf';
import pdf_file2 from './Book_PDF/One Arranged Murder by Chetan Bhagat-X.pdf'

// import { Document, Page, pdfjs } from 'react-pdf';
// import pdfjsWorker from "react-pdf/node_modules/pdfjs-dist/build/pdf.worker.entry";
// pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const PdfViewer = () => {
	// /*
	const location = useLocation()
	let book_link = location.state
	console.log(book_link)
	// book_link = require(book_link);
	// ये साला काम नहीं कर रहा है
	// */
	/*
	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);
	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
	}
	*/

	return (<>

		{pdf_file && <><Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
			<div className="mx-auto d-block"
				style={{
					border: '1px solid rgba(0, 0, 0, 0.3)',
					height: '70vh',
					width: '70%'
				}}
			>
				<Viewer fileUrl={pdf_file} />
				{/* <Viewer fileUrl={'http://www.africau.edu/images/default/sample.pdf'} /> */}
				{/* defaultScale={SpecialZoomLevel.PageFit} */}
			</div>
		</Worker></>}

	</>)
}

export default PdfViewer;
