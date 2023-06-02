import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import MuiSelect from "@mui/material/Select";

const Select = ({
	options,
	label,
	selectedOption,
	handleChange,
	disabled = false,
}) => {
	return (
		<Box sx={{ minWidth: 150 }}>
			<FormControl fullWidth disabled={disabled}>
				<InputLabel>{label}</InputLabel>
				<MuiSelect value={selectedOption} label={label} onChange={handleChange}>
					{options.map((option) => (
						<MenuItem key={option} value={option}>
							{option}
						</MenuItem>
					))}
				</MuiSelect>
			</FormControl>
		</Box>
	);
};

export default Select;
