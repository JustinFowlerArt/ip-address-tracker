import { useEffect, useState } from 'react';
import { iError, iIpAddress } from './interfaces';
import { IpLookup } from './ipLookup';
import { Results } from './results';
import { Map } from './map';
import mockData from '../api/mockData.json';
import { useFetch } from '../hooks/useFetch';

const apiKey = process.env.REACT_APP_IPIFY_GEO_API_KEY ?? '' ;

export const AddressTracker = () => {
	const [search, setSearch] = useState('');

	const endpoint = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&domain=${search}`;

    const { data, error, loading, getData } = useFetch<iIpAddress, iError>(
		endpoint,
		{
			immediate: false,
		}
	);

    useEffect(() => {
		getData();
	}, []);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
        await getData();
	};

	const handleChange = (ipAddress: string) => {
		setSearch(ipAddress);
	};

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
                {loading && (
					<h2 className='text-white'>
						Loading...
					</h2>
				)}
				{error && (
					<h2 className='text-red-500 font-bold'>
						Error processing request. Please try again.
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
