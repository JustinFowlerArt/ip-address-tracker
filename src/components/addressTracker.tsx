import { useEffect, useState } from 'react';
import { iError, iIpAddress } from './interfaces';
import { IpLookup } from './ipLookup';
import { Results } from './results';
import L from 'leaflet';

const apiKey = process.env.REACT_APP_IPIFY_GEO_API_KEY;

export const AddressTracker = () => {
	const [search, setSearch] = useState('');
	const [data, setData] = useState<iIpAddress>();
	const [error, setError] = useState<iError>();

	useEffect(() => {
		async function init() {
			try {
				const ipResponse = await getIp();
				setSearch(ipResponse.ip);
				const dataResponse = await getData();
				setData(dataResponse);
			} catch (error: unknown) {
				setError(error as iError);
			}
		}
		init();
	}, []);

	const getIp = async () => {
		const response = await fetch('https://api.ipify.org?format=json');
		return response.json();
	};

	const getData = async () => {
		const response = await fetch(
			`https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${search}`
		);
		return response.json();
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const response = await getData();
			setData(response);
		} catch (error: unknown) {
			setError(error as iError);
		}
	};

	const handleChange = (ipAddress: string) => {
		setSearch(ipAddress);
	};

	// const map = L.map('map').setView([51.505, -0.09], 13);
	// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	// 	maxZoom: 19,
	// 	attribution: '© OpenStreetMap',
	// }).addTo(map);

	return (
		<>
			<header
				className='h-1/3 text-center p-6 space-y-6 flex flex-col items-center bg-no-repeat xl:bg-cover  lg:space-y-10'
				style={{ backgroundImage: 'url(/images/pattern-bg.png)' }}
			>
				<h1 className='text-2xl font-medium text-white lg:-mb-5'>
					IP Address Tracker
				</h1>
				<IpLookup
					search={search}
					handleChange={handleChange}
					handleSubmit={handleSubmit}
				/>
				{error && <h2 className='text-red-500 font-bold'>error.messages</h2>}
				<Results data={data} />
			</header>
			<main className=''>
				<div id='map' className='h-32'></div>
			</main>
			<img className='mx-auto' src='/images/icon-location.svg'></img>
		</>
	);
};
