import React, { useState, useEffect, useContext } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
//import ShowImage from './ShowImage';
import moment from 'moment';
import comments from './comments'
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import CardM from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

import { getProductCategory } from '../apiCalls';
import { Category, ExpandMore } from '@material-ui/icons';

import { returnBook } from '../apiCalls';
import { AuthContext } from '../context/AuthContext';
import { Media } from 'reactstrap';
import CommentForm from './commentForm';

//import { addItem, updateItem, removeItem } from './cartHelpers';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '5px 4px #b4b1b1',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  productDescription: {
    height: '100px',
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

function RenderComments({ comments,  productId }) {
  const comment_img = {
    height: 120,
    width: 120,
  };
  const comment_box = {
    height: 100,
    overflow: 'auto',
  };

  if (comments != null) {
    return (
      <div>
        <h4>Comments</h4>
        <div style={comment_box}>
            <Media list>
              {comments.map((comment) => {
                return (
                    <div className='shadow'>
                      <Media className='p-2'>
                    
                        <Media body>
                          <Media heading className={`ml-5 h5`}>
                            {comment.author}
                            {/* <small className='text-muted ml-4'>
                              <i>
                               comment date
                              </i>
                            </small> */}
                          </Media>
                          <p className={`ml-5`}>{comment.comment}</p>
                        </Media>
                      </Media>
                    </div>
                );
              })}
            </Media>
        </div>
        <hr />
        <CommentForm productId={productId} />
      </div>
    );
  } else return <div></div>;
}

const Card = ({
  product,
  showViewProductButton = true,
  showReadButton=false,
  showReturnButton=false,
  setRun = (f) => f, 
  run = undefined, 
}) => {
  const [redirect, setRedirect] = useState(false);
  const {user} = useContext(AuthContext);
  const history = useHistory();
  // const [count, setCount] = useState(product.count);



  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <Link href={`/products/${product._id}`} className='mr-2'>
          <Button variant='contained' color='primary' style={{ width: "100%" }}>
            View Details
          </Button>
        </Link>
      )
    );
  };

  const showReadBookButton = (showReadButton) => {
    return (
      showReadButton && (
        
        <Link href={"/pdfviewer"} onClick={() => localStorage.setItem('userBookOpen', JSON.stringify(product))}>
        <button type="submit" className="btn btn-success btn-sm btn-block" style={{ width: "100%" }} >Read Book</button>
      </Link>
      )
    );
  };

  const removeItem = () => {
    if (user) {
      const productId = product._id;
      console.log("us",user);
      console.log("ub", user.borrowedBooks)
      console.log("id", productId);

      
      if (user.borrowedBooks.indexOf(productId) == -1) {
        alert("You don't borrow this book!!")
      }
      else {
        returnBook(productId, user._id).then((data) => {
        });
        alert("Congratulations!! You returned book successfully...")
      }
      history.push('/myBooks');
      window.location.reload(false);
    }

    else history.push('/login');
  }

  const showReturnBookButton = (showReturnnButton) => {
    return (
      showReturnButton && (
        <button className="btn btn-success btn-sm btn-block" style={{ width: "100%" }} onClick={removeItem}>Return Book</button>
      )
    );
  };

  const [category, setCategory] = useState({});
  const getCategory = (categoryId) => {
    getProductCategory(categoryId).then((data) => {
      setCategory(data);
    });
  }

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to='/cart' />;
    }
  };

  const [showComment, setShowComment] = useState(false);

  const classes = useStyles();
  useEffect(() => {
    const categoryId = product.category;
    getCategory(categoryId);
  }, []);

  return (
    // <div className='card'>
    //   <div className='card-header name'>{product.name}</div>
    //   <div className='card-body'>
    //     {shouldRedirect(redirect)}
    //     <ShowImage item={product} url='product' />
    //     <p className='lead mt-2'>{product.description.substring(0, 100)}</p>
    //     <p className='black-10'>${product.price}</p>
    //     <p className='black-9'>
    //       Category: {product.category && product.category.name}
    //     </p>
    //     <p className='black-8'>
    //       Added on {moment(product.createdAt).fromNow()}
    //     </p>

    //     {showStock(product.quantity)}
    //     <br></br>

    //     {showViewButton(showViewProductButton)}

    //     {showAddToCartBtn(showAddToCartButton)}

    //     {showRemoveButton(showRemoveProductButton)}

    //     {showCartUpdateOptions(cartUpdate)}
    //   </div>
    // </div>

    <Container className={classes.cardGrid} maxWidth='md'>
      <CssBaseline />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12}>
          <CardM className={classes.card}>
            {shouldRedirect(redirect)}
            {/* <ShowImage item={product} url='product' /> */}
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant='h5' component='h2'>
                {product.name}
              </Typography>
              <Typography className={classes.productDescription}>{product.description.substring(0, 100)}...</Typography>
              <p className='black-10'>Author: {product.author}</p>
              <p className='black-10'>Price: ${product.price}</p>
              <p className='black-10'>Rating: {product.rating}</p>
              <p className='black-9'>
                Category: {category.name}{' '}
              </p>{' '}
              {/* <p className='black-8'>
                Added on {moment(product.createdAt).fromNow()}{' '}
              </p> */}
              {/* {showStock(product.quantity)}
              <br></br> */}
             
                <div style={{display:"block"}}>{showViewButton(showViewProductButton)}</div>
                <div style={{display:"block"}, {paddingTop:"10px"}}>{showReadBookButton(showReadButton)}</div>
                <div style={{display:"block"}, {paddingTop:"10px"}}>{showReturnBookButton(showReturnButton)}</div>
                {/* {showAddToCartBtn(showAddToCartButton)} */}
                {/* {showRemoveButton(showRemoveProductButton)} */}
                
              
              {/* {showCartUpdateOptions(cartUpdate)} */}
              {console.log(product.comments)}
              {showComment ? <RenderComments
              comments={product.comments}
              productId={product._id}
            />:<></>}
            </CardContent>
            <CardActions disableSpacing>
              <ExpandMore  onClick={()=>{setShowComment(!showComment)}}/>
            </CardActions>
          </CardM>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Card;
