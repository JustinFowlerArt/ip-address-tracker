import { useState } from 'react';
import { iError, iIpAddress } from './interfaces';
import { IpLookup } from './ipLookup';
import { Results } from './results';
import { Map } from './map';
import mockData from '../api/mockData.json';

const apiKey = process.env.REACT_APP_IPIFY_GEO_API_KEY;

export const AddressTracker = () => {
	const [search, setSearch] = useState('');
	const [data, setData] = useState<iIpAddress>();
	const [error, setError] = useState<iError | null>();
	const [firstRender, setFirstRender] = useState(true);

	const getCurrentIp = 'https://api.ipify.org?format=json';
	const getIpInfo = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${search}`;

	const getData = async (url: string) => {
		try {
			const response = await fetch(url);
			if (response.ok) {
				const json = await response.json();
				return json;
			} else {
				throw response;
			}
		} catch (error) {
			setError(error as iError);
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError(null);
		const response = await getData(getIpInfo);
		if (response) setData(response);
	};

	const handleChange = (ipAddress: string) => {
		setSearch(ipAddress);
	};

	const init = async () => {
		const ipResponse = await getData(getCurrentIp);
		if (ipResponse) setSearch(ipResponse.ip);
		const dataResponse = await getData(getIpInfo);
		if (dataResponse) setData(dataResponse);
	};

	if (firstRender) {
		init();
		setFirstRender(false);
	}

	return (
		<>
			<header
				className='h-1/3 text-center p-6 space-y-6 flex flex-col items-center bg-no-repeat xl:bg-cover lg:space-y-10 overflow-visible'
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
				{error && (
					<h2 className='text-red-500 font-bold'>
						Your entry was not properly formed or the server did not respond.
						Please try again.
					</h2>
				)}
				{data ? <Results data={data} /> : <Results data={mockData} />}
			</header>
			<main className='w-full h-2/3'>
				{data ? <Map data={data} /> : <Map data={mockData} />}
			</main>
		</>
	);
};
