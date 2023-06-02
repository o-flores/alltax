import React, { useCallback, useEffect, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import Select from "./Select";
import { Divider, Stack } from "@mui/material";
import data from "@/src/data";

const categoriesOptions = data.categories.map((category) => category.name);

const Chart = () => {
	const [selectedCategory, setSelectedCategory] = useState("");
	const [selectedProduct, setSelectedProduct] = useState("");
	const [selectedBrand, setSelectedBrand] = useState("");
	const [productsOptions, setProductsOptions] = useState([]);
	const [brandsOptions, setBrandsOptions] = useState([]);
	const [chartValues, setChartValues] = useState([]);
	const [xAxisCategories, setXAxisCategories] = useState([]);
	const chartOptions = {
		title: {
			text: "Sales Report",
		},
		yAxis: {
			title: {
				align: "high",
				text: "Valores em BRL",
				rotation: 0,
				y: -10,
			},
		},
		xAxis: {
			categories: xAxisCategories,
			title: {
				text: "Meses",
			},
		},
		legend: {
			layout: "vertical",
			align: "right",
			verticalAlign: "middle",
		},
		series: [{ data: chartValues, name: "Vendas" }],
		responsive: {
			rules: [
				{
					condition: {
						maxWidth: 500,
					},
					chartOptions: {
						legend: {
							layout: "horizontal",
							align: "center",
							verticalAlign: "bottom",
						},
						yAxis: {
							title: {
								align: "middle",
								rotation: 270,
							},
						},
					},
				},
			],
		},
	};

	const handleCategoriesChange = useCallback((event) => {
		setSelectedCategory(event.target.value);
		setSelectedProduct("");
		setSelectedBrand("");
		setChartValues([]);
	}, []);

	const handleProductsChange = useCallback((event) => {
		setSelectedProduct(event.target.value);
		setSelectedBrand("");
		setChartValues([]);
	}, []);

	const handleBrandsChange = useCallback((event) => {
		setSelectedBrand(event.target.value);
	}, []);

	useEffect(() => {
		if (selectedCategory.length > 0) {
			const newProductsOptions = data.categories
				.find((category) => category.name === selectedCategory)
				.products.map((product) => product.name);
			setProductsOptions(newProductsOptions);
		}
	}, [selectedCategory]);

	useEffect(() => {
		if (selectedProduct.length > 0 && selectedCategory.length > 0) {
			const newBrandsOptions = data.categories
				.find((category) => category.name === selectedCategory)
				.products.find((product) => product.name === selectedProduct)
				.brands.map((brand) => brand.name);
			setBrandsOptions(newBrandsOptions);
		}
	}, [selectedCategory, selectedProduct]);

	useEffect(() => {
		if (
			selectedBrand.length > 0 &&
			selectedProduct.length > 0 &&
			selectedCategory.length > 0
		) {
			const brands = data.categories
				.find((category) => category.name === selectedCategory)
				.products.find((product) => product.name === selectedProduct)
				.brands.find((brand) => brand.name === selectedBrand);
			const newChartValues = brands.sales.map((sale) => sale.value);
			const newXAxisCategories = brands.sales.map((sale) => sale.month);
			setChartValues(newChartValues);
			setXAxisCategories(newXAxisCategories);
		}
	}, [selectedBrand, selectedCategory, selectedProduct]);

	return (
		<Stack spacing={4} margin={2}>
			<Stack
				direction={{ xs: "column", sm: "row" }}
				spacing={{ xs: 1, sm: 2, md: 4 }}
				divider={<Divider orientation="vertical" flexItem />}
				justifyContent="center"
			>
				<Select
					options={categoriesOptions}
					handleChange={handleCategoriesChange}
					label="Categorias"
					selectedOption={selectedCategory}
				/>
				<Select
					options={productsOptions}
					handleChange={handleProductsChange}
					label="Produtos"
					selectedOption={selectedProduct}
					disabled={!(productsOptions.length > 0)}
				/>
				<Select
					options={brandsOptions}
					handleChange={handleBrandsChange}
					label="Marcas"
					selectedOption={selectedBrand}
					disabled={
						!(productsOptions.length > 0) || !(brandsOptions.length > 0)
					}
				/>
			</Stack>
			<HighchartsReact highcharts={Highcharts} options={chartOptions} />
		</Stack>
	);
};

export default Chart;
