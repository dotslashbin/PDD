import React from 'react'
import { makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
	tableContainer: {
		marginTop: '50px', 
		width: '100%'
	},
	table: {
		minWidth: 650,
	},
}))

const columns = [
	{ field: 'id', headerName: 'ID', width: 70 },
	{ field: 'data', headerName: 'Data', width: 130 },
	{ field: 'value', headerName: 'Value', width: 400 },
]



export default function SavedRecord(props: any): any {

	const classes = useStyles()

	const rows = [
		{ name: 'Token', value: props.token }, 
		{ name: 'Secret Key', value: props.secretKey }
	]

	return(
		<TableContainer component={Paper}>
			<Table className={classes.table} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell align="center">Data</TableCell>
						<TableCell align="center">Value</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<TableRow key={row.name}>
							<TableCell component="th" scope="row">
								{row.name}
							</TableCell>
							<TableCell align="center">{row.value}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}