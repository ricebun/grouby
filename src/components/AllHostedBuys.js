import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { makeStyles, IconButton } from '@material-ui/core';
import PageviewIcon from '@material-ui/icons/Pageview';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        minWidth: 500,
        maxWidth: 700,
        alignItems: 'center',
    },
});

const AllHostedBuys = () => {
    const classes = useStyles()
    const [rows, setRows] = useState([])
    const [viewMoreClicked, setViewMoreClicked] = useState()

    useEffect(() => {
        axios.get('/data/hostedbuys', {
            headers: {
                Authorization: `Token ${sessionStorage.getItem('token')}`
            }
        })
            .then(response => {
                console.log(response)
                setRows(response.data)
            })
    }, [])

    if (viewMoreClicked) {
        return <Redirect to={`/hostedbuys/${viewMoreClicked}`} />
    }

    const populatedRows = (rows.map((row) => (
        <TableRow key={row.id}>
            <TableCell align="center">
                {row.id}
            </TableCell>
            <TableCell align="center">
                {row.title}
            </TableCell>
            <TableCell align="center">{row.description}</TableCell>
            <TableCell align="center">{row.closing_date}</TableCell>
            <TableCell align="center">{row.collection_date}</TableCell>
            <TableCell align="center">
                <IconButton variant="contained" color="primary" onClick={() => { setViewMoreClicked(row.id) }}>
                    <PageviewIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    ))
    )

    // const noItems = (
    //     <TableRow key='no items'>
    //         <TableCell align="center">
    //         </TableCell>
    //         <TableCell align="center">
    //             No Items
    //         </TableCell>
    //     </TableRow>
    // )
    return (
        <>
            <h1>All Hosted Buys</h1>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="items table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Buy ID</TableCell>
                            <TableCell align="center">Title</TableCell>
                            <TableCell align="center">Description</TableCell>
                            <TableCell align="center">Closing Date</TableCell>
                            <TableCell align="center">Collection Date</TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows ? populatedRows : ''}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default AllHostedBuys