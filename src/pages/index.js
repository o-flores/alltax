import Head from "next/head";
import Header from "@/components/Header";
import Chart from "@/components/Chart";

export default function Home() {
	return (
		<>
			<Head>
				<title>Sales Report</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<main>
				<Header />
				<Chart />
			</main>
		</>
	);
}
