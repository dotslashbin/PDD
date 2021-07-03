import React from 'react'
import { makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
	tableContainer: {
		marginTop: '100px', 
		width: '100%'
	},
	table: {
		minWidth: 650,
	},
	valueDisplay: {
		overflow: 'hidden', 
		textOverflow: 'ellipsis',
		fontWeight: 'bold'
	}
}))

const columns = [
	{ field: 'id', headerName: 'ID', width: 70 },
	{ field: 'data', headerName: 'Data', width: 130 },
	{ field: 'value', headerName: 'Value', width: 400 },
]

const truncate = (str: string) => {
	return str.length > 50 ? str.substring(0, 50) + '...' : str	
}



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
								<span>{row.name}</span>
							</TableCell>
							<TableCell align="center">
								<span className={classes.valueDisplay}>{truncate(row.value)}</span>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}