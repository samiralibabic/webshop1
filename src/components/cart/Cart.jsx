import React from 'react'
import { Container, Typography, Button, Grid, Box } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import CartItem from './cartItem/CartItem';
import { Link } from 'react-router-dom';

const Cart = ({ cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart }) => {
    const theme = useTheme();

    const styles = {
        toolbar: theme.mixins.toolbar,
        title: {
            marginTop: '5%',
        },
        emptyButton: {
            minWidth: '150px',
            [theme.breakpoints.down('xs')]: {
                marginBottom: '5px',
            },
            [theme.breakpoints.up('xs')]: {
                marginRight: '20px',
            },
        },
        checkoutButton: {
            minWidth: '150px',
        },
        link: {
            textDecoration: 'none',
        },
        cardDetails: {
            display: 'flex',
            marginTop: '10%',
            width: '100%',
            justifyContent: 'space-between',
        },
    }

    const EmptyCart = () => (
        <Typography variant='subtitle1'>You have no items in your cart.</Typography>
    );

    const FilledCart = () => (
        <>
            <Grid container spacing={3}>
                {
                    cart.line_items.map((item) => (
                        <Grid item xs={12} sm={4} key={item.id}>
                            <CartItem item={item} 
                            handleUpdateCartQty={handleUpdateCartQty}
                            handleRemoveFromCart={handleRemoveFromCart} />
                        </Grid>
                    ))
                }
            </Grid>
            <Box sx={styles.cardDetails}>
                <Typography variant='h4'>Subtotal: { cart.subtotal.formatted_with_symbol }</Typography>
                <Box>
                    <Button sx={styles.emptyButton} size='large' type='button' variant='contained' color='secondary' onClick={handleEmptyCart}>Empty cart</Button>
                    <Button component={Link} to='/checkout' sx={styles.checkoutButton} size='large' type='button' variant='contained' color='primary'>Checkout</Button>
                </Box>
            </Box>
        </>
    );

    return (
        <Container>
            <Box sx={styles.toolbar} />
            <Typography sx={styles.title} variant='h3' gutterBottom>
                Your shopping cart
            </Typography>
            {!cart?.line_items?.length ? <EmptyCart /> : <FilledCart />}
        </Container>
    )
}

export default Cart